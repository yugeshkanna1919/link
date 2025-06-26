# Food Delivery Full Stack Application

A complete food delivery application with React frontend and Node.js/Express backend with MongoDB.

## Quick Start

### Option 1: Start Everything at Once
Double-click `start-fullstack.bat` to start both backend and frontend servers simultaneously.

### Option 2: Start Servers Separately
- **Backend Only**: Double-click `start-backend.bat`
- **Frontend Only**: Double-click `start-frontend.bat`

### Option 3: Seed Database
Double-click `seed-database.bat` to populate the database with sample data.

## What Each Batch File Does

### `start-fullstack.bat`
- Starts both backend and frontend servers
- Opens separate command windows for each server
- Backend runs on port 5000
- Frontend runs on port 5173

### `start-backend.bat`
- Installs backend dependencies
- Starts the Express server on port 5000
- Connects to MongoDB
- API available at: http://localhost:5000/api

### `start-frontend.bat`
- Installs frontend dependencies
- Starts the React development server on port 5173
- Frontend available at: http://localhost:5173

### `seed-database.bat`
- Populates the database with sample data
- Creates sample users, restaurants, and foods
- Provides login credentials for testing

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** running locally on port 27017
3. **npm** or **yarn**

## Manual Commands

If you prefer to run commands manually:

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd "food delivery"
npm install
npm run dev
```

### Seed Database
```bash
cd backend
node seeder.js
```

## Sample Login Credentials

After running the seeder:
- **User**: john@example.com / password123
- **Restaurant Owner**: jane@example.com / password123

## API Endpoints

- **Health Check**: http://localhost:5000/api/health
- **Authentication**: http://localhost:5000/api/auth
- **Restaurants**: http://localhost:5000/api/restaurants
- **Foods**: http://localhost:5000/api/foods
- **Orders**: http://localhost:5000/api/orders

## Features

### Frontend
- React with Vite
- React Router for navigation
- Responsive design
- User authentication
- Restaurant browsing
- Food ordering system
- User profile management

### Backend
- Express.js REST API
- MongoDB with Mongoose
- JWT authentication
- Role-based access control
- Input validation
- Error handling
- File upload support

## Project Structure

```
fullstackproject/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication & error handling
│   ├── model/              # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── seeder.js           # Database seeder
├── food delivery/          # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── services/       # API services
│   └── package.json
├── start-backend.bat       # Start backend server
├── start-frontend.bat      # Start frontend server
├── start-fullstack.bat     # Start both servers
├── seed-database.bat       # Seed database
└── README.md
```

## Troubleshooting

### Port Already in Use
If you get "address already in use" error:
1. Close any existing terminal windows running the servers
2. Or change the port in the respective configuration files

### MongoDB Connection Issues
Make sure MongoDB is running:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Dependencies Issues
If you encounter dependency errors:
1. Delete `node_modules` folders
2. Run the batch files again (they will reinstall dependencies)

## Development

- Backend API documentation is in `backend/README.md`
- Frontend components are in `food delivery/src/`
- API endpoints are in `backend/routes/`

## License

This project is licensed under the ISC License. 