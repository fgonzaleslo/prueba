const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')

const app = express()
//const alfa = express()

app.use('/', serverStatic(path.join(__dirname, '/dist')))
//app.use('/', serverStatic(path.join(__dirname, '/public')))

//app.alfa('/', serverStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8088
app.listen(port)
//alfa.listen(port)

console.log('Listenin on port: '+port)

const { response } = require('express');
//const { ServerResponse } = require('http')
/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3035;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    response.end('Nuevo servidor');
});

server.listen(port, hostname, () =>{
    console.lng(`Servidor corriendo en http://${hostname}:${port}/`);
});*/