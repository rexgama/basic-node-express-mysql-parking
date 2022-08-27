import ParkingSlot from './parking.slot';

class PaymentService {
    private static OVER_STAY_LIMIT = 24;
    private static OVER_STAY_LIMIT_PRICE = 5000;
    private static BASE_FARE = 40;
    private static BASE_HOUR = 3;
    private PARKING_FEE: Map<number, number>;

    constructor() {
        let parkingFees = new Map<number, number>();
        parkingFees.set(0, 20);
        parkingFees.set(1, 60);
        parkingFees.set(2, 100);
        this.PARKING_FEE = parkingFees;
    }

    public calculate(duration: number, size: number) {
        const fee = this.PARKING_FEE.get(size) ?? 0;
        const penalty = PaymentService.OVER_STAY_LIMIT <= duration ? Math.floor(duration / PaymentService.OVER_STAY_LIMIT) : 0;
        const penaltyFee = penalty * PaymentService.OVER_STAY_LIMIT_PRICE;
        const succedingHours = (penalty > 0 ? duration % PaymentService.OVER_STAY_LIMIT : duration) - PaymentService.BASE_HOUR;
        const succedingFee = fee * (succedingHours > 0 ? Math.round(succedingHours) : 0);
        console.info('Base Fee ===> ', PaymentService.BASE_FARE);
        console.info('Succeding Fee ===> ', succedingFee);
        console.info('Penalty Fee ===> ', penaltyFee);
        const total = PaymentService.BASE_FARE + succedingFee + penaltyFee;
        return total;
    }
}

export default PaymentService;
