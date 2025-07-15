export const CodeStatus = {
  SUCCESS: 200,
  NO_LOGIN: 401,
} as const;

export type CodeStatus = (typeof CodeStatus)[keyof typeof CodeStatus];
