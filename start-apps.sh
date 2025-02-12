#!/bin/bash

# Navigate to the frontend directory and start Angular
echo "Starting Angular frontend..."
cd frontend || exit
npm start &
FRONTEND_PID=$!

# Navigate to the backend directory and start Spring Boot
echo "Starting Spring Boot backend..."
cd ../backend || exit
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for both processes
echo "Frontend (PID: $FRONTEND_PID) and Backend (PID: $BACKEND_PID) are running."
wait
