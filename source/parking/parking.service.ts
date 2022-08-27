import logging from '../config/logging';
import ParkingArea from './parking.area';
import ParkingSlot from './parking.slot';
import PaymentService from './payment.service';
import Vehicle from './vehicle';

const NAMESPACE = 'ParkingService';
class ParkingService {
    private _parkingArea: ParkingArea;
    private _vehicleHistory: Map<Vehicle, number[]> = new Map<Vehicle, number[]>();

    constructor(area: ParkingArea) {
        this._parkingArea = area;
    }

    public parkVehicle(vehicle: Vehicle, entrance: string) {
        const vsize = vehicle.getSize();
        const parkingSlots = this._parkingArea
            .getParkingSlots()
            .filter((e) => e.getSize() >= vsize)
            .filter((e) => !e.isOccupied());
        let lowestDistanceFromEntrance = 6;
        let destinationSlot: ParkingSlot = new ParkingSlot(-1, new Map<string, number>());
        if (parkingSlots.length > 0) {
            parkingSlots.forEach((element) => {
                const distance = element.getDistanceEntryPoint().get(entrance) ?? lowestDistanceFromEntrance;
                if (lowestDistanceFromEntrance > distance) {
                    destinationSlot = element;
                }
            });
            if (destinationSlot.getSize() === -1) {
                logging.info('PAYMENT SERVICE', 'No Slot.');
            } else {
                destinationSlot.occupy();
                vehicle.park(destinationSlot);
                if (this._vehicleHistory.has(vehicle)) {
                    const vHistory = this._vehicleHistory.get(vehicle) ?? [0, 0];
                    const hours = Math.abs(vHistory[1] - Date.now());
                    if (hours < 1) {
                        destinationSlot.setDateTime(vHistory[0]);
                    } else {
                        this._vehicleHistory.delete(vehicle);
                    }
                }
            }
        }
    }

    public unpark(vehicle: Vehicle, exit: Date): number {
        const slot = vehicle.getSlot();
        logging.info(NAMESPACE, 'Exit =>  ', exit.getTime());
        let duration = Math.round(slot.unoccupy(exit.getTime()));
        const size = slot.getSize();
        const service = new PaymentService();
        if (!this._vehicleHistory.has(vehicle)) {
            this._vehicleHistory.set(vehicle, [slot.getDateTime(), duration]);
        }
        return service.calculate(duration, size);
    }
}

export default ParkingService;
