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

   
    

      

        socket.on('join', (reason) => {
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

            socket.emit('toma-la', token);

            space.emit('novo-user',socket.data)

        });


    socket.on('disconnect', (reason) => {
        console.log(spaceName,'Disconnected', socket.id, reason);
        socket.broadcast.emit('user_Saiu',socket.data);
    });
});
