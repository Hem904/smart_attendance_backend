🚀 Smart Attendance System – Backend (Node.js + Express)

This backend powers the Smart Attendance System, enabling authentication, course management, session handling, face recognition integration, and attendance recording.
It communicates with both the React frontend and the Python Face Recognition microservice.

📂 Features
🔐 1. JWT Authentication

Secure login for students, professors, and university admins

Role-based access using middleware

Protected API routes

🎓 2. Course Management

Admin creates courses

Students enroll in courses

Professors manage their assigned courses

🎥 3. Face Recognition Integration

Backend communicates with a Python Flask service to:

Register student faces

Recognize faces in real-time

Mark attendance based on recognized IDs

📝 4. Attendance Management

Auto-marking of attendance when faces are recognized

Prevents duplicates

Stores records per session

🧱 5. Structured Modular Architecture

Controllers

Routes

Models

Services

Middlewares

Utils

Config

📁 Backend Folder Structure
backend/
│
├── src/
│   ├── controllers/       → Handles API logic
│   ├── routes/            → Defines REST endpoints
│   ├── models/            → Mongoose schemas (User, Course, Session, Attendance)
│   ├── middlewares/       → Auth + role-based access middleware
│   ├── services/          → Business logic (DB operations)
│   ├── utils/             → JWT helpers, Python API caller
│   ├── config/            → DB connection + env config
│   ├── app.ts             → Express app setup
│   └── server.ts          → App entry point
│
├── package.json
└── tsconfig.json

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

TypeScript

JWT Authentication

Morgan, CORS, Nodemon

Axios (to communicate with Python service)

🔌 API Endpoints Overview
🔐 Auth
POST /api/v1/auth/register
POST /api/v1/auth/login

🎓 Courses
GET    /api/v1/courses/me               → Get courses for user
POST   /api/v1/courses                  → Admin creates a course
POST   /api/v1/courses/:courseId/enroll → Student self-enrolls

📚 Sessions
POST /api/v1/sessions/start             → Professor starts a lecture session
GET  /api/v1/sessions/:id/attendance    → Get attendance for a session

🧠 Face Recognition
POST /api/v1/face/register              → Register face
POST /api/v1/face/recognize             → Recognize & mark attendance

🤖 Integration With Python Face Recognition API

The backend communicates with:

http://localhost:8001/register
http://localhost:8001/recognize

Example (Node → Python):
const response = await axios.post(`${PY_URL}/recognize`, {
  image: base64String
});


Python returns:

{ "recognized": ["656c49f82e0fb2ed31ba6abc"] }


Backend then maps these IDs to students and marks attendance.

⚙️ Setup & Installation
1️⃣ Clone repo
git clone https://github.com/yourname/attendance-backend.git
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PYTHON_SERVICE_URL=http://localhost:8001

4️⃣ Run development server
npm run dev

🔒 Authentication Workflow
Creating JWT:
jwt.sign({ _id, email, role }, process.env.JWT_SECRET);

Verifying JWT:
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;

🧪 Development Tools Used

Morgan – HTTP request logging

Nodemon – Auto server reload

CORS – Cross-origin access for frontend

TypeScript – Strict typing and cleaner code

🧱 Database Models
Example: User
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "professor", "university"] }
});

🧼 Coding Standards

Clean folder structure

Consistent naming

REST-structured routes

Proper HTTP status codes

Error handling in controllers

🧭 Future Enhancements

Real-time recognition stream

Push notifications

Admin dashboard analytics

Mobile app version
