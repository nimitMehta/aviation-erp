import { Router } from 'express';
import { getAircrafts, addAircraft } from '../controllers/aircraftController';
import { verifyCookie } from '../middlewares/verifyCookie';

const router = Router();

// Protect the aircraft routes
router.use(verifyCookie);

// Fetch all aircrafts
router.get('/aircraft', getAircrafts);

// Add a new aircraft
router.post('/aircraft', addAircraft);

export default router;
