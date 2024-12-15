import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';
import { GridCell, Player, GridUpdate } from '../types/game';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;
  private readonly serverUrl = 'https://unicode-grid-game.onrender.com';

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(playerName: string): Promise<Player> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(this.serverUrl, {
          withCredentials: true,
          transports: ['websocket'],
          timeout: 10000
        });

        this.socket.on('connect', () => {
          this.socket!.emit('player:join', { name: playerName }, (player: Player) => {
            resolve(player);
          });
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          reject(error);
        });

        this.setupListeners();
      } catch (error) {
        console.error('Socket initialization error:', error);
        reject(error);
      }
    });
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('grid:update', (grid: GridCell[][]) => {
      useGameStore.getState().setGrid(grid);
    });

    this.socket.on('players:update', (players: Player[]) => {
      useGameStore.getState().setPlayers(players);
    });

    this.socket.on('history:update', (update: GridUpdate) => {
      useGameStore.getState().addHistoryEntry(update);
    });

    this.socket.on('disconnect', () => {
      useGameStore.getState().setIsConnected(false);
    });

    this.socket.on('reconnect', () => {
      useGameStore.getState().setIsConnected(true);
    });
  }

  submitCharacter(position: [number, number], character: string) {
    if (!this.socket) return;
    this.socket.emit('grid:submit', { position, character });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = SocketService.getInstance();