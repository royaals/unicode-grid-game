//@ts-nocheck
export function setupSocketHandlers(io:any, gameManager) {
    io.on('connection', (socket) => {
      let playerId = null;
  
      socket.on('player:join', ({ name }, callback) => {
        const player = gameManager.addPlayer(name);
        playerId = player.id;
  
        
        callback(player);
        socket.emit('grid:update', gameManager.getGrid());
        socket.emit('history:update', gameManager.getHistory());
  
        
        io.emit('players:update', gameManager.getPlayers());
      });
      
      socket.on('grid:submit', ({ position, character }) => {
        if (!playerId) return;
  
        const update = gameManager.updateGrid(playerId, position, character);
        if (update) {
          
          io.emit('grid:update', gameManager.getGrid());
          io.emit('history:update', update);
          io.emit('players:update', gameManager.getPlayers());
        }
      });
  
      socket.on('disconnect', () => {
        if (playerId) {
          gameManager.removePlayer(playerId);
          io.emit('players:update', gameManager.getPlayers());
        }
      });
    });
  }