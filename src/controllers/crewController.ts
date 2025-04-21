import { Request, Response } from 'express';
import { Crew } from '../models/crewModel';

// Get all crew members
export const getCrewMembers = async (req: any, res: Response) => {
  try {
    const crewMembers = await Crew.find();
    res.render('pages/crew', { title: 'Crew Management', crewMembers });
  } catch (error) {
    console.error('Error fetching crew members:', error);
    res.status(500).send('Error fetching crew members.');
  }
};

// Add a new crew member
export const addCrewMember = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, designation, licenseNumber, crewIdNumber, category } = req.body;
    await Crew.create({ firstName, lastName, designation, licenseNumber, crewIdNumber, category });
    res.redirect('/crew');
  } catch (error) {
    console.error('Error adding crew member:', error);
    res.status(500).send('Error adding crew member.');
  }
};
