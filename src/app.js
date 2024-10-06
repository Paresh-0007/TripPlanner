import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path'; // Import path module
import userRouter from './routes/user.routes.js';
import placeRouter from './routes/place.routes.js';
import itineraryRouter from './routes/itinerary.routes.js'
import blogRouter from './routes/blog.routes.js';


const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({
    limit: "16384kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(express.static('public')); 

app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); 
});
// Routes


app.use('/api/users', userRouter);
app.use('/api/places',placeRouter);
app.use('/api/generateItinerary',itineraryRouter)
app.use('/api/blogs',blogRouter)
export { app };
