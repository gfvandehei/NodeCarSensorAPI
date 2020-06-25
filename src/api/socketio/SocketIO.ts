import { io } from "../Server";
import * as sio from "socket.io";
import { SocketIOClient } from "./Client";

let clients = new Map<String, SocketIOClient>();

io.on("connection", (socket: sio.Socket) => {
  console.log(`Client connection established: SocketIO API ${socket.handshake.address}`);
  let newSocketIOClient = new SocketIOClient(socket);
  clients.set(socket.handshake.address, newSocketIOClient);
});
