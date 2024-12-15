export interface Player {
  id: string;
  name: string;
  cooldown: number | null;
}

export interface GridCell {
  character: string;
  playerId: string | null;
  timestamp: number | null;
}

export interface GridUpdate {
  playerId: string;
  playerName: string;
  character: string;
  position: [number, number];
  timestamp: number;
}