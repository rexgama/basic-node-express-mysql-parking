import logging from '../config/logging';

const NAMESPACE = 'ParkingSlot';
class ParkingSlot {
    private _size: number;
    private _distanceEntryPoint: Map<string, number>;
    private _datetime: number = 0;
    private _isOccupied: boolean = false;
    constructor(size: number, distances: Map<string, number>) {
        this._size = size;
        this._distanceEntryPoint = distances;
    }

    getDistanceEntryPoint() {
        return this._distanceEntryPoint;
    }

    public occupy() {
        this._datetime = Date.now();
        this._isOccupied = true;
        logging.info(NAMESPACE, 'Exit =>  ', this._datetime);
    }

    public getDateTime() {
        return this._datetime;
    }

    public setDateTime(_time: number) {
        this._datetime = _time;
    }

    public getSize() {
        return this._size;
    }

    public unoccupy(exit: number) {
        const duration = Math.abs(exit - this._datetime) / (1000 * 60 * 60);
        this._isOccupied = false;
        return duration;
    }

    public isOccupied() {
        return this._isOccupied;
    }
}

export default ParkingSlot;
