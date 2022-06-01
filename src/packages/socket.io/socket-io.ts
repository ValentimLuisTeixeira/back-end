import { Server } from "socket.io";
import { server } from '../../express';

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const namespace_lobby = io.of("/lobby");

export { namespace_lobby };

require('./namespace/lobby');