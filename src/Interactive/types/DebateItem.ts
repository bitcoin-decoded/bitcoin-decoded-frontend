export type DebateItem = {
  topic: string;
  sides: [DebateSide, DebateSide];
};

export type DebateSide = {
  school: string;
  argument: string;
};
