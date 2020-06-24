import express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
const port = process.env.SERVERPORT || 3000;
app.set("port", port);

let http = require("http").Server(app);
export const io = require("socket.io")(http);

http.listen(port);
console.log(`SocketIO and HTTP listening on ${port}`);


