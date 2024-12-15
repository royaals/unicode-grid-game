//@ts-nocheck
import { v4 as uuidv4 } from 'uuid';

export class GameManager {
  constructor() {
    this.grid = this.createEmptyGrid();
    this.players = new Map();
    this.history = [];
  }

  createEmptyGrid() {
    return Array(10).fill(null).map(() =>
      Array(10).fill(null).map(() => ({
        character: '',
        playerId: null,
        timestamp: null
      }))
    );
  }

  addPlayer(name) {
    const player = {
      id: uuidv4(),
      name,
      cooldown: null
    };
    this.players.set(player.id, player);
    return player;
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
  }

  getPlayers() {
    return Array.from(this.players.values());
  }

  updateGrid(playerId, position, character) {
    const [row, col] = position;
    const player = this.players.get(playerId);
    
    if (!player || player.cooldown) {
      return false;
    }

    this.grid[row][col] = {
      character,
      playerId,
      timestamp: Date.now()
    };

    
    const update = {
      playerId,
      playerName: player.name,
      character,
      position,
      timestamp: Date.now()
    };
    this.history.unshift(update);
    this.history = this.history.slice(0, 50);

   
    player.cooldown = Date.now() + 60000;
    setTimeout(() => {
      player.cooldown = null;
      this.players.set(playerId, player);
    }, 60000);

    return update;
  }

  getGrid() {
    return this.grid;
  }

  getHistory() {
    return this.history;
  }
}