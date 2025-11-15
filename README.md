# Peer-Tutor Connect

A web-based peer tutoring platform designed for students to seek and provide academic help within their enrolled courses. Built as part of the CS545 Human-Computer Interaction course project.

## Project Description

Peer-Tutor Connect addresses a critical challenge in online education: students enrolled in online courses often face 24-48 hour delays when seeking help from instructors or teaching assistants. This delay disrupts study flow and creates frustration, especially during evening and weekend study sessions.

Our solution enables instant, course-specific peer-to-peer micro-tutoring. Students can:

- Post questions about course material and receive immediate responses from classmates
- Maintain anonymity when posting questions if desired
- Mark responses as helpful and resolve questions when satisfied
- Receive real-time notifications when questions are answered
- View all enrolled courses and course-specific question forums
- Edit or delete their own questions and responses

The primary usability focus is **Efficiency**, aiming to reduce wait times from 24-48 hours to under 15 minutes.

## Quick Start Guide

### Prerequisites

- Node.js (v24.11.1 or higher)
- MongoDB (v7.0 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kspriyanka14/CS545-Peer-Tutor-Connect.git
cd CS545-Peer-Tutor-Connect
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Configuration

1. Create backend environment file:

```bash
cd backend
cp .env.example .env
```

2. Update `.env` with your MongoDB connection:

```
MONGODB_URI=mongodb://localhost:27017
DB_NAME=peer-tutor-connect
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

### Database Seeding

Populate the database with sample data (100 students, 5 courses, 110 questions, and 516 responses):

```bash
cd backend
npm run seed
```

### Running the Application

1. Start the backend server (from backend directory):

```bash
npm start
```

Backend will run on http://localhost:3000

2. Start the frontend development server (from frontend directory):

```bash
npm run dev
```

Frontend will run on http://localhost:5173

3. Open your browser and navigate to http://localhost:5173

### Login Credentials

After seeding the database, you can log in with any of the 100 seeded student accounts. All accounts use the password: `password123`

**Demo Account:**

- Email: `aditi.sharma@stevens.edu`
- Password: `password123`

## Tech Stack

### Backend

- **Runtime**: Node.js v24.11.1
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB v7.0.0
- **Authentication**: express-session with bcrypt (10 rounds)
- **Validation**: express-validator + custom validation layer
- **Testing**: Jest v30.2.0 with Supertest v7.1.4
- **Security**: Helmet, CORS, input sanitization

### Frontend

- **Library**: React v19.0.0
- **Build Tool**: Vite v6.2.1
- **Styling**: Tailwind CSS v4.0.7 (utility-first)
- **HTTP Client**: Axios v1.7.9
- **Routing**: React Router v7.1.1
- **State Management**: React Context API

### Database

- **MongoDB**: NoSQL document database
- **Collections**: students, courses, questions, responses, notifications
- **Total Seeded Records**: 100 students, 5 courses, 110 questions, 516 responses

## Project Structure

```
CS545-Peer-Tutor-Connect/
├── README.md                   # This file
├── backend/                    # Express REST API
│   ├── README.md              # Backend-specific documentation
│   ├── app.js                 # Express application setup
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variable template
│   ├── data/                  # Data access layer (5 modules)
│   ├── routes/                # API route handlers (5 modules)
│   ├── middlewares.js         # Custom middleware (auth, logging, errors)
│   ├── validation.js          # Input validation utilities
│   ├── database_config/       # MongoDB connection management
│   ├── seed/                  # Database seeding scripts
│   └── tests/                 # Jest test suites (168 tests)
│       ├── data/              # Data layer unit tests
│       └── routes/            # Route integration tests
└── frontend/                  # React single-page application
    ├── README.md              # Frontend-specific documentation
    ├── package.json           # Frontend dependencies
    ├── vite.config.js         # Vite configuration with proxy
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── index.html             # HTML entry point
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Main app component with routing
        ├── index.css          # Global styles + Tailwind directives
        ├── components/        # React components (10 total)
        ├── context/           # React context providers
        │   └── AuthContext.jsx     # Global auth state
        └── api/               # API integration layer
            └── api.js         # Axios instance + all API calls
```

For detailed documentation on each part:

- **Backend API, database schema, and endpoints**: See [backend/README.md](backend/README.md)
- **Frontend components, routing, and development**: See [frontend/README.md](frontend/README.md)

## Key Features

### For Students

- Secure authentication using Stevens email addresses
- View all enrolled courses from personalized dashboard
- Post questions in course-specific forums
- Optional anonymous posting for sensitive topics
- Reply to classmates' questions
- Mark responses as helpful (question poster only)
- Resolve questions when satisfied with answers
- Edit or delete own content (authorization enforced)
- Real-time notification dropdown with unread count
- Sort and filter questions by newest, oldest, answered, or unanswered

### Technical Features

- Session-based authentication with secure httpOnly cookies
- RESTful API design with consistent JSON response format
- Input validation at three layers: client, route middleware, and data layer
- MongoDB with proper indexing and ObjectId relationships
- Responsive design supporting mobile (320px+), tablet (768px+), and desktop (1024px+)
- Accessibility considerations following WCAG AA guidelines
- Comprehensive test coverage: 168 passing tests (78% coverage)
- Security best practices: bcrypt password hashing, CSRF protection, input sanitization

## Testing

### Backend Tests

```bash
cd backend
npm test                    # Run all tests with coverage
npm run test:watch         # Run tests in watch mode
```

**Test Suite Summary:**

- Total Tests: 168 (all passing)
- Data Layer Unit Tests: 5 suites
- Route Integration Tests: 5 suites
- Coverage: 78% statements, 69% branches, 81% functions, 79% lines

### Frontend Development

```bash
cd frontend
npm run dev                 # Start development server with hot reload
npm run build              # Build for production
npm run preview            # Preview production build
```

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running. Start it with:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Port 3000 Already in Use**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: Either stop the process using port 3000 or change the PORT in `.env` file:

```bash
# Find and kill the process (macOS/Linux)
lsof -i :3000
kill -9 <PID>

# Or change port in .env
PORT=3001
```

**Session Issues / Login Not Persisting**

- Verify `SESSION_SECRET` is set in `.env`
- Clear browser cookies and try again
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL exactly (`http://localhost:5173`)
- Check that cookies are enabled in your browser

**Seed Script Fails**

- Ensure MongoDB is running before seeding
- Drop existing database if needed:
  ```bash
  mongosh
  use peer-tutor-connect
  db.dropDatabase()
  exit
  ```
- Run seed again: `npm run seed`

### Frontend Issues

**API Requests Failing with CORS Errors**

- Verify backend is running on port 3000
- Check Vite proxy configuration in `vite.config.js` points to `http://localhost:3000`
- Ensure backend `FRONTEND_URL` in `.env` is `http://localhost:5173`
- Restart both frontend and backend servers

**White Screen or Build Errors**

- Clear node_modules and reinstall:
  ```bash
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  ```
- Verify Node.js version: `node --version` (should be 24.11.1 or higher)
- Clear Vite cache: `rm -rf .vite`

**Styling Not Applying**

- Verify Tailwind is properly configured in `tailwind.config.js`
- Check that `src/index.css` imports Tailwind directives
- Restart Vite development server
- Clear browser cache

**Login Redirects Not Working**

- Check React Router configuration in `App.jsx`
- Verify `ProtectedRoute` component is wrapping protected routes
- Clear localStorage and sessionStorage in browser dev tools
- Check browser console for errors

### Database Issues

**Collections Are Empty After Seeding**

- Verify seed script completed without errors
- Check database name matches in `.env` and seed scripts
- Connect to MongoDB and verify:
  ```bash
  mongosh
  use peer-tutor-connect
  show collections
  db.students.countDocuments()
  ```

**Old Data Persisting**

- Drop the database and reseed:
  ```bash
  mongosh
  use peer-tutor-connect
  db.dropDatabase()
  exit
  cd backend
  npm run seed
  ```

## Development Guidelines

### Backend Development

- Follow RESTful API conventions (GET, POST, PATCH, DELETE)
- Validate all inputs at route middleware and data layer
- Write tests before implementing features (Test-Driven Development)
- Use meaningful, descriptive error messages
- Document complex business logic with comments
- Keep functions focused and single-purpose
- Use async/await for asynchronous operations

### Frontend Development

- Use functional components with React hooks
- Keep components focused and reusable
- Use Tailwind utility classes for styling (avoid custom CSS)
- Handle loading and error states gracefully
- Ensure keyboard navigation works for all interactive elements
- Test on multiple screen sizes (mobile, tablet, desktop)
- Use semantic HTML elements for accessibility

### Git Workflow

- Create feature branches from main
- Write descriptive commit messages (imperative mood)
- Test thoroughly before committing
- Keep commits atomic and focused on single changes
- Review your own code before pushing

## Team Members

This project was developed as part of CS545 Human-Computer Interaction at Stevens Institute of Technology, Fall 2025.

**Team Members:**

- Priyanka Kavali Subramanyam
- Vishnu Vardhan Putta
- Saylee Mangesh Waje

**Course Information:**

- Course: CS545 - Human Computer Interaction
- Institution: Stevens Institute of Technology
- Instructor: Dr. Gregg Vesonder
- Semester: Fall 2025

## Academic Context

This application demonstrates the principles and practices taught in CS545 Human-Computer Interaction:

- **User-Centered Design**: Requirements gathered through student interviews and surveys
- **Iterative Prototyping**: Low-fidelity wireframes, paper prototypes, and high-fidelity mockups
- **Usability Testing**: Multiple rounds of user testing with Stevens students
- **Accessibility**: WCAG AA compliance with keyboard navigation and screen reader support
- **Responsive Design**: Mobile-first approach supporting all device sizes
- **Efficiency Focus**: Primary usability goal of reducing help-seeking wait times

The project showcases the complete user-centered design lifecycle from initial user research and requirements gathering through low-fidelity wireframes, high-fidelity prototypes, user testing sessions, and final implementation with iterative refinements based on user feedback.

**Primary Usability Goal (E)**: Efficiency

- Reduce student wait time for academic help from 24-48 hours to under 15 minutes
- Enable instant peer-to-peer knowledge sharing within course contexts
- Minimize friction in posting questions and receiving responses
