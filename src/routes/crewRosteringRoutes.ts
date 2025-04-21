import { Router } from 'express';
import { getCrewRostering, addCrewRostering } from '../controllers/crewRosteringController';
import { verifyCookie } from '../middlewares/verifyCookie';

const router = Router();

// Protect the crew rostering routes
router.use(verifyCookie);

// Fetch all crew rostering records
router.get('/crew-rostering', getCrewRostering);

// Add a new crew rostering record
router.post('/crew-rostering', addCrewRostering);

export default router;
