/* eslint-disable unicorn/number-literal-case -- oxfmt/pnpm fix lowercases a-f in hex; values follow ISO/IEC 18004 */
/* oxlint-disable unicorn/number-literal-case */

import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface QRCodeProps {
  value: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
}

// ---------------------------------------------------------------------------
// Minimal QR Code encoder — Version 1 (21×21), Error Correction Level M
// Supports: Numeric, Alphanumeric, and Byte (Latin-1) modes.
// Reference: ISO/IEC 18004:2015
// ---------------------------------------------------------------------------

// GF(256) arithmetic for Reed-Solomon
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x1_00) {
      x ^= 0x1_1d;
    }
  }
  for (let i = 255; i < 512; i += 1) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

const gfMul = function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }
  return GF_EXP[(GF_LOG[a] + GF_LOG[b]) % 255]!;
};

const gfPoly = function gfPoly(degree: number): Uint8Array {
  let p = new Uint8Array([1]);
  for (let i = 0; i < degree; i += 1) {
    const q = new Uint8Array(p.length + 1);
    const alpha = GF_EXP[i];
    for (let j = 0; j < p.length; j += 1) {
      q[j] ^= p[j];
      q[j + 1] ^= gfMul(p[j], alpha);
    }
    p = q;
  }
  return p;
};

const rsEncode = function rsEncode(
  data: Uint8Array,
  ecCount: number
): Uint8Array {
  const gen = gfPoly(ecCount);
  const msg = new Uint8Array(data.length + ecCount);
  msg.set(data);
  for (let i = 0; i < data.length; i += 1) {
    const coef = msg[i];
    if (coef !== 0) {
      for (let j = 1; j <= ecCount; j += 1) {
        msg[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return msg.slice(data.length);
};

// Version 1 QR constants (21×21 matrix)
const VERSION = 1;
// 21
const SIZE = 17 + VERSION * 4;

// Data capacity: V1-M (Error Correction M) = 14 data codewords, 10 EC codewords
const DATA_CODEWORDS = 14;
const EC_CODEWORDS = 10;

const encodeData = function encodeData(text: string): Uint8Array {
  // Try Numeric mode first, then Alphanumeric, then Byte
  const ALNUM_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

  const isNumeric = /^[0-9]*$/.test(text);
  const isAlphanumeric = [...text].every((c) => ALNUM_CHARS.includes(c));

  const bits: number[] = [];

  function pushBits(value: number, count: number) {
    for (let i = count - 1; i >= 0; i -= 1) {
      bits.push((value >> i) & 1);
    }
  }

  if (isNumeric) {
    // mode indicator
    pushBits(0b0001, 4);
    // char count (V1 numeric = 10 bits)
    pushBits(text.length, 10);
    for (let i = 0; i < text.length; i += 3) {
      const group = text.slice(i, i + 3);
      const val = Number.parseInt(group, 10);
      pushBits(val, group.length === 3 ? 10 : group.length === 2 ? 7 : 4);
    }
  } else if (isAlphanumeric) {
    pushBits(0b0010, 4);
    // V1 alphanumeric = 9 bits
    pushBits(text.length, 9);
    for (let i = 0; i < text.length; i += 2) {
      if (i + 1 < text.length) {
        const v =
          ALNUM_CHARS.indexOf(text[i]) * 45 + ALNUM_CHARS.indexOf(text[i + 1]!);
        pushBits(v, 11);
      } else {
        pushBits(ALNUM_CHARS.indexOf(text[i]), 6);
      }
    }
  } else {
    // Byte mode (UTF-8 subset — Latin-1 safe)
    const bytes = [...text].map((c) => (c.codePointAt(0) ?? 0) & 0xff);
    pushBits(0b0100, 4);
    // V1 byte = 8 bits
    pushBits(bytes.length, 8);
    for (const b of bytes) {
      pushBits(b, 8);
    }
  }

  // Terminator
  for (let i = 0; i < 4 && bits.length < DATA_CODEWORDS * 8; i += 1) {
    bits.push(0);
  }

  // Pad to byte boundary
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // Pad codewords
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < DATA_CODEWORDS * 8) {
    const b = padBytes[(padIdx += 1 % 2)]!;
    pushBits(b, 8);
  }

  // Pack bits into bytes
  const codewords = new Uint8Array(DATA_CODEWORDS);
  for (let i = 0; i < DATA_CODEWORDS; i += 1) {
    let byte = 0;
    for (let j = 0; j < 8; j += 1) {
      byte = (byte << 1) | (bits[i * 8 + j] ?? 0);
    }
    codewords[i] = byte;
  }
  return codewords;
};

type Matrix = boolean[][];

const makeMatrix = function makeMatrix(): Matrix {
  return Array.from({ length: SIZE }, () =>
    Array.from<boolean>({ length: SIZE }).fill(false)
  );
};

// Finder pattern (7×7 + separator)
const placeFinderPattern = function placeFinderPattern(
  matrix: Matrix,
  row: number,
  col: number
) {
  const finder = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  for (let r = 0; r < 7; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      const mr = row + r;
      const mc = col + c;
      if (mr >= 0 && mr < SIZE && mc >= 0 && mc < SIZE) {
        matrix[mr][mc] = finder[r][c] === 1;
      }
    }
  }
};

// Timing patterns
const placeTimingPatterns = function placeTimingPatterns(matrix: Matrix) {
  for (let i = 8; i < SIZE - 8; i += 1) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }
};

// Dark module
const placeDarkModule = function placeDarkModule(matrix: Matrix) {
  matrix[SIZE - 8]![8] = true;
};

// Track which modules are "function" (reserved/fixed)
const buildFunctionMask = function buildFunctionMask(
  _matrix: Matrix
): boolean[][] {
  const mask = makeMatrix();

  // Finder patterns + separators
  const setRegion = (r: number, c: number, h: number, w: number) => {
    for (let dr = 0; dr < h; dr += 1) {
      for (let dc = 0; dc < w; dc += 1) {
        if (r + dr >= 0 && r + dr < SIZE && c + dc >= 0 && c + dc < SIZE) {
          mask[r + dr]![c + dc] = true;
        }
      }
    }
  };

  // Top-left finder + separator
  setRegion(0, 0, 8, 8);
  // Top-right finder + separator
  setRegion(0, SIZE - 8, 8, 8);
  // Bottom-left finder + separator
  setRegion(SIZE - 8, 0, 8, 8);

  // Timing patterns
  for (let i = 0; i < SIZE; i += 1) {
    mask[6][i] = true;
    mask[i][6] = true;
  }

  // Format information areas
  for (let i = 0; i < 9; i += 1) {
    mask[i][8] = true;
    mask[8][i] = true;
  }
  for (let i = SIZE - 8; i < SIZE; i += 1) {
    mask[8][i] = true;
    mask[i][8] = true;
  }

  return mask;
};

// Format string for Mask 0 (M level)
// EC level M = 00, mask pattern 0 = 000 → format bits before masking = 000000000
// Format: 5-bit data (ec<<3|mask) + 10-bit EC from BCH + XOR 101010000010010
const FORMAT_STRINGS: Record<number, number> = {
  // EC level M (00), mask patterns 0-7
  // M, mask 0
  0: 0b101_0100_0001_0010,
  // M, mask 1
  1: 0b101_0001_0010_0101,
  // M, mask 2
  2: 0b101_1110_0111_1100,
  // M, mask 3
  3: 0b101_1011_0100_1011,
  // M, mask 4
  4: 0b100_0101_1111_1001,
  // M, mask 5
  5: 0b100_0000_1100_1110,
  // M, mask 6
  6: 0b100_1111_1001_0111,
  // M, mask 7
  7: 0b100_1010_1010_0000,
};

const placeFormatInfo = function placeFormatInfo(
  matrix: Matrix,
  maskPattern: number
) {
  const fmt = FORMAT_STRINGS[maskPattern] ?? FORMAT_STRINGS[0];

  // Place around top-left finder
  const bits15 = Array.from({ length: 15 }, (_, i) => (fmt >> (14 - i)) & 1);
  const positions = [
    [0, 8],
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],
    [7, 8],
    [8, 8],
    [8, 7],
    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [8, 0],
  ];
  positions.forEach(([r, c], i) => {
    matrix[r!]![c!] = bits15[i] === 1;
  });

  // Place around top-right and bottom-left finders
  const positions2 = [
    [8, SIZE - 1],
    [8, SIZE - 2],
    [8, SIZE - 3],
    [8, SIZE - 4],
    [8, SIZE - 5],
    [8, SIZE - 6],
    [8, SIZE - 7],
    [8, SIZE - 8],
  ];
  positions2.forEach(([r, c], i) => {
    matrix[r!]![c!] = bits15[i] === 1;
  });

  const positions3 = [
    [SIZE - 7, 8],
    [SIZE - 6, 8],
    [SIZE - 5, 8],
    [SIZE - 4, 8],
    [SIZE - 3, 8],
    [SIZE - 2, 8],
    [SIZE - 1, 8],
  ];
  positions3.forEach(([r, c], i) => {
    matrix[r!]![c!] = bits15[8 + i] === 1;
  });
};

// Data placement (zigzag)
const placeData = function placeData(
  matrix: Matrix,
  funcMask: boolean[][],
  bits: number[]
) {
  let idx = 0;
  let goingUp = true;
  // Right column of current 2-wide strip
  for (let col = SIZE - 1; col >= 1; col -= 2) {
    if (col === 6) {
      col = 5;
      // skip timing column
    }
    for (let rowStep = 0; rowStep < SIZE; rowStep += 1) {
      const row = goingUp ? SIZE - 1 - rowStep : rowStep;
      for (let dc = 0; dc <= 1; dc += 1) {
        const c = col - dc;
        if (funcMask[row][c]) {
          continue;
        }
        matrix[row][c] = (bits[idx] ?? 0) === 1;
        idx += 1;
      }
    }
    goingUp = !goingUp;
  }
};

// Apply mask pattern
const applyMask = function applyMask(
  matrix: Matrix,
  funcMask: boolean[][],
  pattern: number
) {
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (funcMask[r][c]) {
        continue;
      }
      let invert = false;
      switch (pattern) {
        case 0: {
          invert = (r + c) % 2 === 0;
          break;
        }
        case 1: {
          invert = r % 2 === 0;
          break;
        }
        case 2: {
          invert = c % 3 === 0;
          break;
        }
        case 3: {
          invert = (r + c) % 3 === 0;
          break;
        }
        case 4: {
          invert = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
          break;
        }
        case 5: {
          invert = ((r * c) % 2) + ((r * c) % 3) === 0;
          break;
        }
        case 6: {
          invert = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
          break;
        }
        case 7: {
          invert = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
          break;
        }
      }
      if (invert) {
        matrix[r][c] = !matrix[r][c];
      }
    }
  }
};

// Penalty scoring — choose best mask
const scorePenalty = function scorePenalty(matrix: Matrix): number {
  let penalty = 0;

  // Rule 1: runs of 5+ same-color in row/col
  for (let r = 0; r < SIZE; r += 1) {
    for (const isRow of [true, false]) {
      let run = 1;
      for (let i = 1; i < SIZE; i += 1) {
        const prev = isRow ? matrix[r][i - 1] : matrix[i - 1]![r];
        const cur = isRow ? matrix[r][i] : matrix[i][r];
        if (cur === prev) {
          run += 1;
          if (run === 5) {
            penalty += 3;
          } else if (run > 5) {
            penalty += 1;
          }
        } else {
          run = 1;
        }
      }
    }
  }

  // Rule 2: 2×2 blocks
  for (let r = 0; r < SIZE - 1; r += 1) {
    for (let c = 0; c < SIZE - 1; c += 1) {
      const v = matrix[r][c];
      if (
        v === matrix[r][c + 1] &&
        v === matrix[r + 1]![c] &&
        v === matrix[r + 1]![c + 1]
      ) {
        penalty += 3;
      }
    }
  }

  return penalty;
};

const generateQR = function generateQR(text: string): Matrix {
  // Clamp to what V1 can hold (max ~17 bytes in byte mode)
  const capped = text.slice(0, 17);

  const dataBytes = encodeData(capped);
  const ecBytes = rsEncode(dataBytes, EC_CODEWORDS);

  // Build the full bitstream
  const allBytes = new Uint8Array([...dataBytes, ...ecBytes]);
  const bits: number[] = [];
  for (const b of allBytes) {
    for (let i = 7; i >= 0; i -= 1) {
      bits.push((b >> i) & 1);
    }
  }

  // Try all 8 mask patterns, pick lowest penalty
  let bestMatrix: Matrix | null = null;
  let bestPenalty = Infinity;

  for (let maskPattern = 0; maskPattern < 8; maskPattern += 1) {
    const matrix = makeMatrix();
    placeFinderPattern(matrix, 0, 0);
    placeFinderPattern(matrix, 0, SIZE - 7);
    placeFinderPattern(matrix, SIZE - 7, 0);
    placeTimingPatterns(matrix);
    placeDarkModule(matrix);

    const funcMask = buildFunctionMask(matrix);
    placeData(matrix, funcMask, bits);
    applyMask(matrix, funcMask, maskPattern);
    placeFormatInfo(matrix, maskPattern);

    const p = scorePenalty(matrix);
    if (p < bestPenalty) {
      bestPenalty = p;
      bestMatrix = matrix;
    }
  }

  return bestMatrix!;
};

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

// modules of white border
const QUIET_ZONE = 2;

export const QRCode = function QRCode({
  value,
  size = "md",
  color,
  label,
}: QRCodeProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.foreground;

  let matrix: Matrix;
  try {
    matrix = generateQR(value);
  } catch {
    return (
      <Box flexDirection="column" gap={0}>
        <Text color="red">QR Error: value too long or unsupported</Text>
        {label && <Text color={theme.colors.mutedForeground}>{label}</Text>}
      </Box>
    );
  }

  // Add quiet zone
  const qzMatrix: Matrix = [];
  const totalSize = SIZE + QUIET_ZONE * 2;
  for (let r = 0; r < totalSize; r += 1) {
    const row: boolean[] = Array.from<boolean>({ length: totalSize }).fill(
      false
    );
    if (r >= QUIET_ZONE && r < SIZE + QUIET_ZONE) {
      for (let c = 0; c < SIZE; c += 1) {
        row[c + QUIET_ZONE] = matrix[r - QUIET_ZONE]![c] ?? false;
      }
    }
    qzMatrix.push(row);
  }

  // Render modes
  // sm: half-block (2 rows → 1 terminal line using ▀▄)
  // md/lg: full block █ / space per module (scale factor)
  const scale = size === "lg" ? 2 : 1;

  if (size === "sm") {
    // Pair rows: top half ▀ (upper), bottom half ▄ (lower)
    const lines: React.ReactElement[] = [];
    for (let r = 0; r < totalSize; r += 2) {
      const chars: string[] = [];
      for (let c = 0; c < totalSize; c += 1) {
        const top = qzMatrix[r][c] ?? false;
        const bottom = qzMatrix[r + 1]?.[c] ?? false;
        if (top && bottom) {
          chars.push("█");
        } else if (top) {
          chars.push("▀");
        } else if (bottom) {
          chars.push("▄");
        } else {
          chars.push(" ");
        }
      }
      lines.push(
        <Text key={r} color={resolvedColor}>
          {chars.join("")}
        </Text>
      );
    }
    return (
      <Box flexDirection="column" gap={0}>
        {lines}
        {label && <Text color={theme.colors.mutedForeground}>{label}</Text>}
      </Box>
    );
  }

  // md / lg: each module is scale×scale characters
  const lines: React.ReactElement[] = [];
  for (let r = 0; r < totalSize; r += 1) {
    const chars: string[] = [];
    for (let c = 0; c < totalSize; c += 1) {
      const on = qzMatrix[r][c] ?? false;
      chars.push((on ? "█" : " ").repeat(scale));
    }
    for (let s = 0; s < scale; s += 1) {
      lines.push(
        <Text key={`${r}-${s}`} color={resolvedColor}>
          {chars.join("")}
        </Text>
      );
    }
  }

  return (
    <Box flexDirection="column" gap={0}>
      {lines}
      {label && <Text color={theme.colors.mutedForeground}>{label}</Text>}
    </Box>
  );
};
