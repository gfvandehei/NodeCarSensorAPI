import * as struct from 'python-struct';
import {Sensor} from "./Sensor";
import {ClimateSensor} from "./types/ClimateSensor"
import {CameraSensor} from "./types/CameraSensor";

class SensorManager{
    
    private sensorMap: Map<number, Sensor>;
    private sensorTypeMap = [
        Sensor,
        ClimateSensor,
        CameraSensor
    ]
    
    constructor(){
        this.sensorMap = new Map<number, Sensor>();
    }

    addSensor(sensorMessage: Buffer, address: any){
        try{
            const sensorId: number = sensorMessage.readUInt32BE();
            const sensorType = sensorMessage.readUInt16BE(4);
            console.log(`${sensorId} ${sensorType}`);
            let sensor = this.sensorMap.get(sensorId);
            if(sensor != null){
                sensor.parseMessageData(sensorMessage.slice(6));
            } else{
                // create a new sensor
                if(sensorType > this.sensorTypeMap.length){
                    console.log(`Sensor type ${sensorType} has not yet been implemented`);
                    return;
                }
                let sensorClass = this.sensorTypeMap[sensorType];
                console.log(sensorClass);
                let newSensor = new sensorClass(sensorId);
                this.sensorMap.set(sensorId, newSensor);
                console.log(`Created new sensor id:${sensorId} of type:${sensorType}`);
            }
        }
        catch(err){
            console.log(err);
            return;
        }

    }
}

export const SensorsManager = new SensorManager();