import {sensorListener} from "./Sensor/SensorUDPDetector";
import { Sensor } from './Sensor/Sensor';
import * as sio from "./api/socketio/SocketIO";
import "./api/socketio/SocketIO";

const sensorNetComPort: number = parseInt(process.env.PORT) || 8888;
sensorListener.start(sensorNetComPort);




