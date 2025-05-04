import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')))

const onConnect = (socket) =>
{
    console.log(socket.id , "Connected");

    socket.on("start" , (data)=>
    {
        console.log("Game started");
        socket.broadcast.emit("start" , data);
    })
    socket.on("smash" , (data) => 
    {
        console.log(`Smash! score: ${data.score}`);
    })

    socket.on('game over' , (data) =>
    {
        console.log(`Game over, score: ${data.score}`);
    })

    socket.on('disconnet' , () => {
        console.log(`${socket.id} Disconnected`);
    })

}

io.on('connection' , onConnect);
server.listen(process.env.PORT ?? 3000 , () =>
{
    console.log(`Server is running on port: ${process.env.PORT ?? 3000}`);
});