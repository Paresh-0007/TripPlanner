#!/bin/bash

# Start backend on port 8000
echo "Starting backend server..."
cd /home/runner/work/TripPlanner/TripPlanner
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend on port 3000
echo "Starting frontend server..."
cd /home/runner/work/TripPlanner/TripPlanner/frontend
npm run dev &
FRONTEND_PID=$!

echo "Backend running on http://localhost:8000"
echo "Frontend running on http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for either process to exit
wait $BACKEND_PID $FRONTEND_PID