import { Request, Response } from 'express';
import { Aircraft } from '../models/aircarftModel';

// Get all aircrafts
export const getAircrafts = async (req: Request, res: Response) => {
  try {
    const aircrafts = await Aircraft.find();
    res.render('pages/aircraft', { title: 'Aircraft Management', aircrafts });
  } catch (error) {
    console.error('Error fetching aircrafts:', error);
    res.status(500).send('Error fetching aircrafts.');
  }
};

// Add a new aircraft
export const addAircraft = async (req: Request, res: Response) => {
  try {
    const { manufacturer, aircraftModel, registrationNumber, type } = req.body;
    await Aircraft.create({ manufacturer, aircraftModel, registrationNumber, type });
    res.redirect('/aircraft');
  } catch (error) {
    console.error('Error adding aircraft:', error);
    res.status(500).send('Error adding aircraft.');
  }
};
