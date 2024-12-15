import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsConfig } from './config/cors.js';
import { PORT} from './config/server.js';
import { GameManager } from './managers/GameManager.js';
import { setupSocketHandlers } from './socket/handlers.js';

const app = express();
const httpServer = createServer(app);


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsConfig.origin);
  res.header('Access-Control-Allow-Methods', corsConfig.methods.join(','));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const io = new Server(httpServer, {
  cors: corsConfig
});

const gameManager = new GameManager();
setupSocketHandlers(io, gameManager);

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`); 
});