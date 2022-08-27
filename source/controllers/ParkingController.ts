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
        let payment = 0;
        let vehiclesFees = [];

        let v1 = new Vehicle(0, 'XXX-123');
        parkingService.parkVehicle(v1, 'C');
        logging.debug(NAMESPACE, v1.getPlateNumber() + ' : Vehicle Type : SMALL , Entry Point: C. ==>', v1.getSlot());

        let v2 = new Vehicle(1, 'XXSD-123');
        parkingService.parkVehicle(v2, 'A');
        logging.debug(NAMESPACE, v2.getPlateNumber() + ' : Vehicle Type : MEDIUM , Entry Point: A. ==>', v2.getSlot());
        payment = parkingService.unpark(v2, addHours(6));
        logging.debug(NAMESPACE, 'Total Payment =>  ', payment);
        vehiclesFees.push([v2.getPlateNumber(), payment]);

        let v3 = new Vehicle(2, 'ABC-123');
        parkingService.parkVehicle(v3, 'B');
        logging.debug(NAMESPACE, v3.getPlateNumber() + ' : Vehicle Type : LARGE , Entry Point: B. ==> ', v3.getSlot());
        payment = parkingService.unpark(v3, addMinutes(30));
        logging.debug(NAMESPACE, 'Total Payment => ', payment);
        vehiclesFees.push([v3.getPlateNumber(), payment]);

        let v4 = new Vehicle(2, 'XYZ-123');
        parkingService.parkVehicle(v4, 'C');
        logging.debug(NAMESPACE, v4.getPlateNumber() + ': Vehicle Type : LARGE , Entry Point: C. ==> ', v4.getSlot());
        payment = parkingService.unpark(v4, addHours(1));
        logging.debug(NAMESPACE, 'Total Payment => ', payment);
        vehiclesFees.push([v4.getPlateNumber(), payment]);

        let v5 = new Vehicle(0, 'ZEC-123');
        parkingService.parkVehicle(v5, 'A');
        logging.debug(NAMESPACE, v5.getPlateNumber() + ' : Vehicle Type : SMALL , Entry Point: A. ==>', v5.getSlot());

        payment = parkingService.unpark(v1, addHours(6));
        logging.debug(NAMESPACE, v1.getPlateNumber() + ' : LEFT the area after 6hrs -> Total Payment =>  ', payment);
        vehiclesFees.push([v1.getPlateNumber(), payment]);

        payment = parkingService.unpark(v5, addHours(26));
        logging.debug(NAMESPACE, v5.getPlateNumber() + ': LEFT the area after 26hrs ->  Total Payment =>  ', payment);
        vehiclesFees.push([v5.getPlateNumber(), payment]);

        return res.status(200).json({
            vehicles: vehiclesFees
        });
    };
}

export default ParkingController;
