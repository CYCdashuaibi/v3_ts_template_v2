export const CodeStatus = {
  SUCCESS: 'OK',
  NO_LOGIN: 401,
} as const;

export type CodeStatus = (typeof CodeStatus)[keyof typeof CodeStatus];
