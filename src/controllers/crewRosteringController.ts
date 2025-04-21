import { Request, Response } from 'express';
import { CrewRostering } from '../models/crewRosteringModel';
import { Aircraft } from '../models/aircarftModel';
import { Crew } from '../models/crewModel';

// Get all crew rostering records
export const getCrewRostering = async (req: any, res: Response) => {
  try {
    const rostering = await CrewRostering.find();
    const aircrafts = await Aircraft.find(); // For Aircraft Name dropdown
    const crew = await Crew.find(); // For Captain and Co-Pilot Name dropdown
    const airports = ['JFK', 'LAX', 'ATL', 'ORD', 'DFW']; // Dummy airport values

    res.render('pages/crewRostering', {
      title: 'Crew Rostering',
      rostering,
      aircrafts,
      crew,
      airports,
    });
  } catch (error) {
    console.error('Error fetching crew rostering records:', error);
    res.status(500).send('Error fetching crew rostering records.');
  }
};

// Add a new crew rostering record
export const addCrewRostering = async (req: any, res: Response): Promise<void> => {
    try {
      const {
        aircraftName,
        flightNo,
        flightType,
        captainName,
        coPilotName,
        departureTime,
        arrivalTime,
        departureAirport,
        arrivalAirport,
      } = req.body;
  
      // Validation logic...
      // Example validation
      if (new Date(departureTime) >= new Date(arrivalTime)) {
        res.status(400).send('Departure time must be earlier than arrival time.');
        return;
      }
  
      // Save to database
      await CrewRostering.create({
        aircraftName,
        flightNo,
        flightType,
        captainName,
        coPilotName,
        departureTime,
        arrivalTime,
        departureAirport,
        arrivalAirport,
      });
  
      res.redirect('/crew-rostering');
    } catch (error) {
      console.error('Error adding crew rostering:', error);
      res.status(500).send('Error adding crew rostering.');
    }
};