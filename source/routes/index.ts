import express from 'express';
import parking from './parking.routes';
const router = express.Router();

router.use('/parking', parking);

export default router;
