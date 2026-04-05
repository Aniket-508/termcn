export const GITHUB = {
  branch: "main",
  repo: "termcn",
  user: "Aniket-508",
} as const;

const GITHUB_URL = `https://github.com/${GITHUB.user}/${GITHUB.repo}`;

export const LINK = {
  GITHUB: GITHUB_URL,
  LICENSE: `${GITHUB_URL}/blob/${GITHUB.branch}/LICENSE`,
  PORTFOLIO: "https://aniketpawar.com",
  X: "https://x.com/alaymanguy",
} as const;
