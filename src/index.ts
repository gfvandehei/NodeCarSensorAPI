import {SensorUDPDetector} from "./Sensor/SensorUDPDetector"

let detector = new SensorUDPDetector(8080);
detector.start();