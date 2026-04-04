import { Text } from "ink";
import React, { useState, useEffect, useRef } from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface StreamingTextProps {
  /** Current accumulated string to display (controlled mode) */
  text?: string;
  /** AsyncIterable<string> source; manages state internally */
  stream?: AsyncIterable<string>;
  /** Show blinking ▌ cursor at end while streaming */
  cursor?: boolean;
  /** Simulate typing animation for pre-buffered text */
  animate?: boolean;
  /** Typing animation speed in ms per character (default 30) */
  speed?: number;
  /** Called with full text when streaming/animation completes */
  onComplete?: (fullText: string) => void;
  /** Color for the cursor */
  cursorColor?: string;
}

export const StreamingText = function StreamingText({
  text: controlledText,
  stream,
  cursor = true,
  animate = false,
  speed = 30,
  onComplete,
  cursorColor,
}: StreamingTextProps) {
  const theme = useTheme();
  const [internalText, setInternalText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!cursor) {
      return;
    }
    const id = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(id);
  }, [cursor]);

  useEffect(() => {
    if (!stream) {
      return;
    }
    let cancelled = false;
    setInternalText("");
    setIsStreaming(true);

    (async () => {
      let full = "";
      try {
        for await (const chunk of stream) {
          if (cancelled) {
            break;
          }
          full += chunk;
          setInternalText(full);
        }
      } catch {
        // stream ended or errored
      }
      if (!cancelled) {
        setIsStreaming(false);
        onCompleteRef.current?.(full);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stream]);

  useEffect(() => {
    if (!animate || !controlledText || stream) {
      return;
    }
    setAnimatedIndex(0);
    setIsStreaming(true);
    let idx = 0;
    const id = setInterval(() => {
      idx += 1;
      setAnimatedIndex(idx);
      if (idx >= controlledText.length) {
        clearInterval(id);
        setIsStreaming(false);
        onCompleteRef.current?.(controlledText);
      }
    }, speed);
    return () => clearInterval(id);
  }, [controlledText, animate, speed, stream]);

  const displayText = stream
    ? internalText
    : animate && controlledText
      ? controlledText.slice(0, animatedIndex)
      : (controlledText ?? "");

  const showCursor = cursor && isStreaming && cursorVisible;
  const resolvedCursorColor = cursorColor ?? theme.colors.primary;

  return (
    <Text>
      {displayText}
      {showCursor && <Text color={resolvedCursorColor}>▌</Text>}
    </Text>
  );
};
