import { ServerCreator } from './class/ServerCreator.class';

import express = require('express');
import helmet from "helmet";

export const application = express();
export const server = new ServerCreator(application).createServer().listen(process.env.SERVER_PORT, () => {
    console.log(`Listening server at port: ${process.env.SERVER_PORT}`);
});

require('./packages/socket.io/socket-io');

// Force to read json body type
application.use(express.json({ type: function() { return true; } }));
application.use(express.urlencoded({ extended: true }));

/**
 * @link https://www.npmjs.com/package/helmet
 * Premade security for backend
 */
application.use(helmet());

application.use((request, response, next) => {
    //response.header("Access-Control-Allow-Headers", ["Origin", "X-Requested-With", "Content-Type", "Accept"]);
    response.header("Access-Control-Allow-Headers", ["Authorization"]);
    response.header("Access-Control-Allow-Origin", ["http://localhost:4200"]); 
    response.header("Access-Control-Allow-Methods", ["POST", "GET"]);
    next();
});

/**
 * Handle wrong attempts by client
 */
application.use((error: { status?: number }, request: express.Request, response: express.Response, next: express.NextFunction)=> {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error)
        return response.status(404).json({status:'error',reason:'bad request'}) // Bad request
    next();
});

/**
 * Handle client on attempt to use a request that does not exists.
 */
application.use((request, response, next) => {
    let err = null;
    try { decodeURIComponent(request.path); }
    catch(e) { err = e; }
    err ? response.status(403).json({status:'error',reason:'request denied'}) : next();
});

application.get('/', (request, response) => {
    response.status(200).json({ ping:'pong' });
});


application.all(['*'],(request, response)=> {
    response.status(404).json({status:'error',reason:'method not found'});
});