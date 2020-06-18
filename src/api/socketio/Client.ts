import * as sio from "socket.io";
import { SensorsManager } from "../../Sensor/SensorManager";
import { Observer } from "../../common/Observer";

class SensorObserver extends Observer{
  public update = (state: any) => { };
}

export class SocketIOClient{
  private socket: sio.Socket;

  constructor(socket: any) {
    this.socket = socket;
  }

  addEventListeners() {
    this.socket.on("message", (message: string) => this.handleMessage(message));
    this.socket.on("command", (sensorId: number, command: number, args: Array<any>) => this.onCommandSensor(sensorId, command, args));
    this.socket.on("request_sensor", (sensorId: number) => this.linkSensorStateData(sensorId));
  }

  /**
   * socketIO "message": string, handles recieving a generic message from the client
   * @param message | string | the message
   */
  handleMessage(message: string) {
    console.log("Received Message from client");
  }

  /**
   * socketIO "command": recieves a request from the client to send a command to a given sensor
   * @param sensor: number : the sensor to send a command to
   * @param command: number : the command opcode to be sent (sensor specific)
   * @param args: Array<any>: the arguments for the command to be sent
   * TODO: Implement the actual functionality here
   */
  onCommandSensor(sensor: number, command: number, args: Array<any>) {
    console.log(`Received command for id${sensor}: ${command}>${args}`);
  }

  /**
   * socketIO "request_sensor": allows a client to become an observer of any state changes in a given sensor
   * @param sensorId
   */
  linkSensorStateData(sensorId: number) {
    console.log(`Attempt to link sensor ${sensorId}`);
    let sensorObject = SensorsManager.getSensor(sensorId);
    if (sensorObject) {
      let newObserver = new SensorObserver();
      newObserver.update = (state: any) => {
        this.socket.emit(`sensor_state`, sensorId, state);
      }
      sensorObject.attach(newObserver);
    }
    else {
      this.socket.emit('warning', "The requested sensor does not exist");
    }
  }
}
