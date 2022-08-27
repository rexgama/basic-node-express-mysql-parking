import ParkingSlot from './parking.slot';

class Vehicle {
    private _plate_number: string;
    private _size: number;
    private _slot: ParkingSlot = new ParkingSlot(0, new Map<string, number>());
    constructor(size: number,plate_number: string) {
        this._plate_number = plate_number;
        this._size = size;
    }

    public getSize() {
        return this._size;
    }

    public getPlateNumber() {
        return this._plate_number;
    }

    public getSlot() {
        return this._slot;
    }

    public park(slot: ParkingSlot) {
        this._slot = slot;
    }
}

export default Vehicle;
