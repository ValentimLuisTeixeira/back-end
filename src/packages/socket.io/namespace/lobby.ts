import { JsonWebToken } from '../../jwt/JsonWebToken.class';
import { UniqueIdentifierV4 } from '../../uuid/UniqueIdentifier.class';
import { namespace_lobby as space } from '../socket-io';

const spaceName = 'LOBBY';

const jwt = new JsonWebToken();
  
const uuid = new UniqueIdentifierV4;

interface User {

    uuid:string;

}

const memory:Array<User> = [];



space.on('connection', (socket) => {
    console.log(spaceName,'Connected', socket.id);

    socket.broadcast.emit('new-join', socket.id);
    /**
     * Client request to join a specific room
     */
    socket.on('join', (data: { room: string }) => {
        socket.join(data.room);
        console.log('Client id', socket.id,'has joined room name',data.room);
        // This emits data to everyone exluding socket it self
        socket.broadcast.emit('new-join', socket.id);
    });

    socket.on('socket-list', (data: { room: string }) => {
        console.log(space.adapter.rooms.get(data.room)?.values());
        socket.emit(
            'socket-list', 
                [ 
                    ... new Set(space.adapter.rooms.get(data.room)?.values())
                ]
            );
    });


    socket.on('disconnect', (reason) => {
        console.log(spaceName,'Disconnected', socket.id, reason);
        //space.emit('user-bazou', socket.data);
        socket.broadcast.emit('new-join', socket.id);
    });

});
