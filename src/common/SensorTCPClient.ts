import * as net from "net";

export class SensorTCPClient{
    private socket: net.Socket;
    private data: Buffer;
    private observers: Array<any>;
    
    constructor(address: string, port: number){
        this.socket = net.createConnection(port, address);
        this.data = Buffer.from('');
        this.observers = [];
        this.addEventListeners();
    }

    addEventListeners(){
        this.socket.on("data", (data) => this.onMessage(data));
    }

    onMessage(data: Buffer){
        let index = data.indexOf("\n");
        if(index >= 0){
            this.data = Buffer.concat([this.data, data.slice(0,index)]);
            this.pushMessage(this.data);
            this.data = Buffer.from('');
            this.data = Buffer.concat([this.data, data.slice(index+1)])
        }
        else{
            this.data = Buffer.concat([this.data, data]);
        }
    }

    pushMessage(message: Buffer){
        this.observers.forEach((observer) => {
            observer.recvMessage(message);
        })
    }

    registerObserver(observer: any){
        this.observers.push(observer);
    }


}