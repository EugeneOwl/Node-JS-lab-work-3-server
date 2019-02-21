import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import bodyParser from 'body-parser'
import {baseSocketRouter} from "./routes/base-socket-router"
import {connectToDatabase} from './database/connection'
import {BASE_URL} from "./routes/routes"
import {corsSettings} from "./services/security/server-cors";

const cookieParser = require('cookie-parser');

const app = express();

connectToDatabase();
app.use(cookieParser());
app.use(corsSettings);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(BASE_URL, baseSocketRouter);

const server = http.Server(app);
server.listen(8000, '127.0.0.1');

const io = socketIo(server);

io.on('connection', (socket) => {
    baseSocketRouter.setUpSocketRouting(socket);
    // socket.on('/login', (data) => {
    //     if (data.username === 'eugene') {
    //         socket.emit('/login', {
    //             authorized: true
    //         });
    //     } else {
    //         socket.emit('/login', {
    //             authorized: false
    //         });
    //     }
    // });
});
