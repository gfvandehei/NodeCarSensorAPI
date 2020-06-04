import {SensorSubscriber} from '../common/SensorSubscriber';
export class Sensor{
    private id: Number;
    private subscribers: Array<any>;

    constructor(id: Number){
        this.id = id;
        this.subscribers = Array<SensorSubscriber>();
    }

    async parseMessageData(data: Buffer){
        console.log(data);
    }

    async addDataPoint(data: Array<any>){
        this.subscribers.forEach((sub: SensorSubscriber) => {
            sub.pushSensorData(data);
        })
    }
}