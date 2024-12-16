"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_js_1 = require("./config/cors.js");
const server_js_1 = require("./config/server.js");
const GameManager_js_1 = require("./managers/GameManager.js");
const handlers_js_1 = require("./socket/handlers.js");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', cors_js_1.corsConfig.origin);
    res.header('Access-Control-Allow-Methods', cors_js_1.corsConfig.methods.join(','));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
const io = new socket_io_1.Server(httpServer, {
    cors: cors_js_1.corsConfig
});
app.get('/', (req, res) => {
    res.send('Server is running on node.js');
});
const gameManager = new GameManager_js_1.GameManager();
(0, handlers_js_1.setupSocketHandlers)(io, gameManager);
httpServer.listen(server_js_1.PORT, () => {
    console.log(`Server is running on ${server_js_1.PORT}`);
});
