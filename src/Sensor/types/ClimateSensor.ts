import {Sensor} from "../Sensor";

export class ClimateSensor extends Sensor{
    private temperature = 0;
    private humidity = 0;
    private pressure = 0;

    async parseMessageData(data: Buffer){
        let datajson = JSON.parse(data.toString());
        console.log(datajson);
        this.temperature = datajson.data['temp'];
        this.humidity = datajson.data['humidity'];
        this.pressure = datajson.data['pressure'];
    }
}