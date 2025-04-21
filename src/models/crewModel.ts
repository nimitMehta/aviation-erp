import mongoose, { Schema, Document } from 'mongoose';

export interface ICrew extends Document {
  firstName: string;
  lastName: string;
  designation: string;
  licenseNumber: string;
  crewIdNumber: string;
  category: string;
}

const CrewSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    designation: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    crewIdNumber: { type: String, required: true, unique: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Crew = mongoose.model<ICrew>('Crew', CrewSchema);
