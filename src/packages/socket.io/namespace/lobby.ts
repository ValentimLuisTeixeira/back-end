import { namespace_lobby as space } from '../socket-io';

const spaceName = 'LOBBY';

space.on('connection', (socket) => {
    console.log(spaceName,'Connected', socket.id);
    socket.on('disconnect', (reason) => {
        console.log(spaceName,'Disconnected', socket.id, reason);
    });
});
