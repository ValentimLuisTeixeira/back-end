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

   
    

      

        socket.on('join', (data:{room: string}) => {
            socket.data = {
                idade: new Date(),
                indentification:uuid.createUUIDv4(),
            };

            const token = jwt.sign({
                payload: socket.data,
                 secretOrPrivateKey: 'gato',
                 options:{
                 algorithm:'HS512' ,
                 expiresIn:'1h'
                }});
            socket.join(data.room);
            socket.emit('toma-la', token);



       /**
         * Ao mesmo tempo, emitir ao cliente novo room-data a informaçao do proprio room
         */


       
        const listSockets = [ ...new Set(space.adapter.rooms.get(data.room)?.values()) ];
        const socketDatas: Array<any> = [];
        listSockets.forEach((socketId) => {
            const socket = space.sockets.get(socketId);
            socketDatas.push(socket?.data);
        });
        socket.emit('room-data', socketDatas);
            space.emit('novo-user',socket.data)

        });


    socket.on('disconnect', (reason) => {
        console.log(spaceName,'Disconnected', socket.id, reason);
        socket.broadcast.emit('user_Saiu',socket.data);
    });
});
