import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socketCb from './src/routers/index.socket.js';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import errorHandler from './src/middlewares/errorHandler.mid.js'
import pathHandler from './src/middlewares/pathHandler.mid.js'
import router from './src/routers/index.router.js';
import morgan from 'morgan';



//http server
const server = express()
const port = 8080
const ready = () => console.log("server ready on port" + port); // callback ready
const httpServer = createServer(server);// Definimos un servidor HTTP con todas las configuraciones del servidor de express.
httpServer.listen(port, ready); // levanto el server http pasando el puerto y la cb ready


//tcp server -- socket
const socketServer = new Server(httpServer);
socketServer.on("connection", socketCb)  //Inicializamos el socket del servidor con el método on() punto de coneccion a nivel backend

// templete engine -- motor de plantillas
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")

//middlewares
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(morgan("dev"))
server.use("public", express.static(__dirname + "/public"))

// endpoint -- routers
server.use(router)
server.use(errorHandler)
server.use(pathHandler)


