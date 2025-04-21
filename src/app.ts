import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import homeRoutes from './routes/homeRoutes';
import authRoutes from './routes/authRoutes';
import aircraftRoutes from './routes/aircraftRoutes';
import crewRoutes from './routes/crewRoutes';
import crewRosteringRoutes from './routes/crewRosteringRoutes';
import { setUser } from './middlewares/setUser';
import { connectDB } from './utils/db';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts for layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Default layout for all pages

// Add user to res.locals for all views
app.use(setUser);

// Routes
app.use('/', authRoutes);
app.use('/', aircraftRoutes);
app.use('/', crewRosteringRoutes);
app.use('/', crewRoutes);
app.use('/', homeRoutes); // Home routes can stay at the root

export default app;
