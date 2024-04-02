import http from 'node:http';
import { Database } from './database/database.js';

const database = new Database

const server = http.createServer((res, req) => {
    const { method, url } = res


})

server.listen(1167, () => {console.log('servidor funcionando')}) 