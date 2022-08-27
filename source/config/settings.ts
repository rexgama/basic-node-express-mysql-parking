const OVER_STAY_LIMIT = 24; // hrs
const OVER_STAY_LIMIT_PRICE = 5000; // peso
const BASE_FARE = 40; // peso
const BASE_HOUR = 3;
const ENTRANCE_CODE = ['A', 'B', 'C'];
const VEHICLE_TYPE = ['S', 'M', 'L'];
const VEHICLE_PARKING_TYPE = [['SP', 'MP', 'LP'], ['MP', 'LP'], ['LP']];
const PARKING_TYPE = ['SP', 'MP', 'LP'];
const PARKING_FEE = [20, 60, 'LP'];
const SLOT_SIZE = Array.from({ length: 30 }, () => Math.floor(Math.random() * 3));
const SLOTS = SLOT_SIZE.map((size) => [PARKING_TYPE[size], [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)]]);

const settings = {
    entrance: {
        NODES: ENTRANCE_CODE
    },
    vehicle: {
        type: VEHICLE_TYPE,
        allowed_parking: VEHICLE_PARKING_TYPE
    },
    parking: {
        type: PARKING_TYPE,
        slot: SLOTS
    },
    limit: {
        stay: OVER_STAY_LIMIT,
        price: OVER_STAY_LIMIT_PRICE
    },
    fare: {
        amount: BASE_FARE,
        hour: BASE_HOUR
    }
};

export default settings;
