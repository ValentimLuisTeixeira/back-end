import fs from 'fs';
import https from 'https';
import express = require('express');
import http from 'http';

/**
 * Custom server instance creator.
 */
export class ServerCreator {

    constructor(private _application: express.Express){}

    /**
     * Without SSL
     */
    private http(): http.Server {
        return http.createServer(this._application);
    }

    /**
     * With SSL
     */
    private https(): https.Server {
        const privateKey = fs.readFileSync(String(process.env.SSL_privateKey), 'utf8') || '';
        const certificate = fs.readFileSync(String(process.env.SSL_certificate), 'utf8') || '';
        const ca = fs.readFileSync(String(process.env.SSL_ca), 'utf8') || '';
        const credentials = { key: privateKey, cert: certificate, ca: ca };
        return https.createServer(credentials, this._application);
    }

    /**
     * Creates server
     */
    createServer(): https.Server | http.Server {
        return process.env.RUN_HTTPS === 'true' ? this.https() : this.http();
    }

}