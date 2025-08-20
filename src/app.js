import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/user.routes.js';
import placeRouter from './routes/place.routes.js';
import itineraryRouter from './routes/itinerary.routes.js'
import blogRouter from './routes/blog.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({
    limit: "16384kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(cookieParser()); 

// API Routes
app.use('/api/users', userRouter);
app.use('/api/places',placeRouter);
app.use('/api/generateItinerary',itineraryRouter)
app.use('/api/blogs',blogRouter)

// Serve Next.js static files
app.use(express.static(path.join(__dirname, '../frontend/.next/static')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Handle Next.js routes - serve the Next.js app for all non-API routes
app.get('*', (req, res) => {
    // For now, serve a simple message. In production, you'd use Next.js server
    res.json({ 
        message: 'Next.js frontend is available. Please run the frontend separately during development.',
        frontend_url: 'http://localhost:3000'
    });
});

export { app };
