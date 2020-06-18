import { SensorSubscriber } from '../common/SensorSubscriber';
import { Observer } from "../common/Observer";

export class Sensor{
  private id: Number;
  private observers: Array<Observer>;
  private state: any;
  private statesLog: Array<any>;

  constructor(id: Number){
    this.id = id;
    this.observers = Array<Observer>();
    this.statesLog = Array<any>()
  }

  async parseMessageData(data: Buffer){
      console.log(data);
  }

  async updateState(newstate: any) {
    this.state = newstate;
    this.statesLog.push(newstate);
    this.propagate();
  }

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  propagate() {
    this.observers.forEach((observer: Observer) => {
      observer.update(this.state);
    })
  }
}
