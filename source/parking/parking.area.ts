import logging from '../config/logging';
import ParkingSlot from './parking.slot';

const NAMESPACE = 'Parking Area';

class ParkingArea {
    private _entry = ['A', 'B', 'C'];
    private _parkingSlots: Array<ParkingSlot> = [];

    constructor() {
        this._parkingSlots = Array.from({ length: 30 }, () => this.addParkingSlot(this.randNumFunction(3)));
        // logging.debug(NAMESPACE, 'Initialize Parking Slots', this._parkingSlots);
    }

    getParkingSlots() {
        return this._parkingSlots;
    }

    addEntrance(x: string) {
        this._entry.push(x);
        this._parkingSlots.forEach((element) => {
            element.getDistanceEntryPoint().set(x, this.randNumFunction(6));
        });
    }

    addParkingSlot(size: number): ParkingSlot {
        let entryDistance = new Map<string, number>();
        this._entry.forEach((entrance) => {
            entryDistance.set(entrance, this.randNumFunction(6));
        });
        return new ParkingSlot(size, entryDistance);
    }

    randNumFunction(x: number) {
        return Math.floor(Math.random() * x);
    }
}

export default ParkingArea;
