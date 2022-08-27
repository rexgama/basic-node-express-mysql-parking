import { Request, Response } from 'express';
import ParkingArea from '../parking/parking.area';
import ParkingService from '../parking/parking.service';
import Vehicle from '../parking/vehicle';
import logging from '../config/logging';

const NAMESPACE = 'ParkingController';

function addHours(numOfHours: number, date = new Date()): Date {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
}

function addMinutes(numOfMinutes: number, date = new Date()): Date {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
}

class ParkingController {
    public static index = (req: Request, res: Response) => {
        logging.info(NAMESPACE, 'Getting all transactions.');
        let parkingArea = new ParkingArea();
        let parkingService = new ParkingService(parkingArea);

        let v1 = new Vehicle(0,"XXX-123");
        parkingService.parkVehicle(v1, 'C');
        logging.debug(NAMESPACE, v1.getPlateNumber()+' : Vehicle Type : SMALL , Entry Point: C. ==>', v1.getSlot());

        let v2 = new Vehicle(1,"XXSD-123");
        parkingService.parkVehicle(v2, 'A');
        logging.debug(NAMESPACE, v2.getPlateNumber()+' : Vehicle Type : MEDIUM , Entry Point: A. ==>', v2.getSlot());
        logging.debug(NAMESPACE, 'Total Payment =>  ', parkingService.unpark(v2, addHours(6)));

        let v3 = new Vehicle(2,"ABC-123");
        parkingService.parkVehicle(v3, 'B');
        logging.debug(NAMESPACE, v3.getPlateNumber()+' : Vehicle Type : LARGE , Entry Point: B. ==> ', v3.getSlot());
        logging.debug(NAMESPACE, 'Total Payment =>  ', parkingService.unpark(v3, addMinutes(30)));

        let v4 = new Vehicle(2,"XYZ-123");
        parkingService.parkVehicle(v4, 'C');
        logging.debug(NAMESPACE, v4.getPlateNumber()+': Vehicle Type : LARGE , Entry Point: C. ==> ', v4.getSlot());
        logging.debug(NAMESPACE, 'Total Payment =>  ', parkingService.unpark(v4, addHours(1)));

        let v5 = new Vehicle(0,"ZEC-123");
        parkingService.parkVehicle(v5, 'A');
        logging.debug(NAMESPACE, v5.getPlateNumber()+' : Vehicle Type : SMALL , Entry Point: A. ==>', v5.getSlot());

        logging.debug(NAMESPACE, v1.getPlateNumber()+ ' : LEFT the area after 6hrs -> Total Payment =>  ', parkingService.unpark(v1, addHours(6)));

        logging.debug(NAMESPACE, v5.getPlateNumber()+': LEFT the area after 26hrs ->  Total Payment =>  ', parkingService.unpark(v5, addHours(26)));
    };
}

export default ParkingController;
