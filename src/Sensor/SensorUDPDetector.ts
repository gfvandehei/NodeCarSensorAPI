import * as dgram from "dgram";
import { AddressInfo } from "net";
import { SensorsManager } from './SensorManager';

class SensorUDPDetector{
    private listPort: number = 8888;
    private listener: dgram.Socket;
    private address: any;

    constructor(){
        this.listener = dgram.createSocket('udp4');
        this.addEventListeners();
    }

    addEventListeners(){
        this.listener.on("listening", () => this.handleListening());
        this.listener.on("error", (err) => this.handleError(err));
        this.listener.on("message", (msg, rinfo) => this.handleMessage(msg, rinfo));
    }

    handleListening(){
        this.address = this.listener.address();
        console.log(`Listening for sensors on ${this.address.address}:${this.address.port}`)
    }

    handleError(error: Error){
        console.log(error);
        this.listener.close();
    }

    handleMessage(msg: Buffer, rinfo: dgram.RemoteInfo){
        //console.log(`${rinfo.address}: ${msg}`);
        SensorsManager.addSensor(msg, rinfo);
    }

  public async start(port: number) {
    this.listPort = port;
    await this.listener.bind(port);
    this.listener.setBroadcast(true);
  }
}

export const sensorListener = new SensorUDPDetector();
