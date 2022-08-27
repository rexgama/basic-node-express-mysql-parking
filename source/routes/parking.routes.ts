import { Router } from 'express';
import ParkingController from '../controllers/ParkingController';

const router = Router();

router.get('/', ParkingController.index);

export default router;
