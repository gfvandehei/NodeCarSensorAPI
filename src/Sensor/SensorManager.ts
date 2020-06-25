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
            const sensorId: number = sensorMessage.readUInt32BE(0);
            const sensorType = sensorMessage.readUInt16BE(4);
            //console.log(`${sensorId} ${sensorType}`);
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
                //console.log(sensorClass);
                let newSensor = new sensorClass(sensorId);
                this.sensorMap.set(sensorId, newSensor);
                console.log(`A new sensor has been detected id:${sensorId} of type:${sensorClass.name}`);
            }
        }
        catch(err){
            console.log(err);
            return;
        }
  }

  getSensorList() {
    return [this.sensorMap.values];
  }

  getSensor(sensorId: number) {
    return this.sensorMap.get(sensorId);
  }
}

export const SensorsManager = new SensorManager();
