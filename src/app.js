import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path'; // Import path module

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({
    limit: "16384kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(express.static('public')); // serving static files from the public directory

app.use(cookieParser()); // middleware for parsing cookies

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); // Ensure the correct path to index.html
});

// Routes
import userRouter from './routes/user.routes.js';

app.use('/api/users', userRouter);

export { app };
