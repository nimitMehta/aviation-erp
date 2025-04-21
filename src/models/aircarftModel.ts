import mongoose, { Schema, Document } from 'mongoose';

export interface IAircraft extends Document {
  manufacturer: string;
  aircraftModel: string; // Renamed field
  registrationNumber: string;
  type: string;
}

const AircraftSchema: Schema = new Schema(
  {
    manufacturer: { type: String, required: true },
    aircraftModel: { type: String, required: true }, // Renamed field
    registrationNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const Aircraft = mongoose.model<IAircraft>('Aircraft', AircraftSchema);
