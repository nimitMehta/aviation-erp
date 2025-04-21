import { Router } from 'express';
import { getCrewMembers, addCrewMember } from '../controllers/crewController';
import { verifyCookie } from '../middlewares/verifyCookie';

const router = Router();

// Protect the crew routes
router.use(verifyCookie);

// Fetch all crew members
router.get('/crew', getCrewMembers);

// Add a new crew member
router.post('/crew', addCrewMember);

export default router;
