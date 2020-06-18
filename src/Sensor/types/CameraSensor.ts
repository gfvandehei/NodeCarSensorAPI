import {Sensor} from "../Sensor";
import {TCPClientObserver} from "../../common/TCPClientObserver";
import { SensorTCPClient } from "../../common/SensorTCPClient";
import { Observer } from '../../common/Observer';
import * as net from 'net';


export class CameraSensor extends Sensor{
    private tcp_connection: SensorTCPClient | null = null;
    private connected: boolean = false;
    private currentImage: Buffer | null = null;

    constructor(id: number){
        super(id);
    }

    async parseMessageData(data: Buffer){
        let datajson = JSON.parse(data.toString());
        console.log(datajson);
        let port = datajson['data_port'];
        let address = datajson['data_addr'];
        if(!this.connected){
            // make a tcp connection
            this.tcp_connection = new SensorTCPClient(address, port);
            this.tcp_connection.registerObserver(this);
            this.connected = true;
        } else{
            return;
        }
    }

    recvMessage(message: Buffer){
      //should be a base64 encoded jpg
      console.log(message);
      let b64_decode = Buffer.from(message.toString(), 'base64');
      this.currentImage = b64_decode;
      this.updateState(this.currentImage);
    }
}
