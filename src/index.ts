import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer  = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});
io.on("connection", socket => {
    console.log('user is connected !')
    socket.on('message', (message)=>{
        console.log(`Message from ${socket.id} :  ${message}`);
        io.emit('message', `${socket.id.substring(0,2)} said ${message}`)
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
})

httpServer.listen(3000, ()=> console.log('server is runung'));
