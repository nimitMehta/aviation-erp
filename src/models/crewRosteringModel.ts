import mongoose, { Schema, Document } from 'mongoose';

export interface ICrewRostering extends Document {
  aircraftName: string;
  flightNo: string;
  flightType: string;
  captainName: string;
  coPilotName: string;
  departureTime: Date;
  arrivalTime: Date;
  departureAirport: string;
  arrivalAirport: string;
}

const CrewRosteringSchema: Schema = new Schema(
  {
    aircraftName: { type: String, required: true },
    flightNo: { type: String, required: true },
    flightType: { type: String, required: true },
    captainName: { type: String, required: true },
    coPilotName: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
  },
  { timestamps: true }
);

export const CrewRostering = mongoose.model<ICrewRostering>('CrewRostering', CrewRosteringSchema);
