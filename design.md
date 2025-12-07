# 📘 Project Design Documentation  
### Smart Attendance System using Face Recognition (Microservices + Node + Python)

---

## 1. 🎯 Overview

The Smart Attendance System automates classroom attendance using **face recognition**.  
The system consists of:

| Component | Tech | Purpose |
|----------|------|---------|
| Backend API | Node.js + Express + MongoDB | Auth, Courses, Attendance, Users |
| Face Service | Python + face_recognition | Face registration & recognition |
| Auth + RBAC | JWT | Student/Professor/University roles |
| Testing | Jest + Supertest | Unit + Integration test coverage |

Architecture is microservice-oriented — **Node handles business logic**, **Python handles ML/face detection**.

---

## 2. 🏗 High Level Architecture

Frontend (React App)
|
| REST API (JWT Auth)
v
Node/Express Backend -------- MongoDB
|
| HTTP Calls (Axios)
v
Python Face Recognition Service
|
Stores vectors in encodings.pkl

yaml
Copy code

The backend and Python service communicate over **HTTP**, maintaining loose coupling.

---

## 3. 📌 Key Features

- Role-based auth (Student / Professor / University)
- Student face registration on signup
- Live face recognition → auto attendance marking
- Courses + Sessions + Attendance tracking
- Fully tested API (Unit + Integration)

---

## 4. ⚙ Improvements in Design

| Improvement | Why it matters |
|------------|----------------|
| Split into microservices | Independent scaling & deployment |
| services/controllers separation | Cleaner testable logic |
| Central auth middleware | Reusable authentication flow |
| Face recognition isolated | ML component replaceable without changing backend |
| Added validation, error handling, unique indexes | Reliability & data integrity |
| Added Jest test suite | Deployment-ready quality assurance |

---

## 5. 🧠 Design Principles Applied

| Principle | Where applied |
|----------|---------------|
| **SRP (Single Responsibility)** | Auth, Course, Attendance, Face modules separate |
| **Separation of Concerns** | Routes → Controllers → Services → Models |
| **DRY** | Common middlewares for auth & role checking |
| **Dependency Inversion** | Python service external — Node doesn't handle ML internally |
| **Scalability-oriented** | Microservice design enables docker deployment |

---

## 6. 📂 Folder Structure

📦 Smart_Attendance_System
├── src
│ ├── controllers # Route handlers
│ ├── services # Business logic
│ ├── routes # API endpoints
│ ├── models # Mongoose schemas
│ ├── middlewares # Auth, role validation
│ ├── config # DB + Environment setup
│ ├── utils # JWT helpers
│ └── app.ts # Main express app
├── python-face-service # Face recognition microservice
├── tests
│ ├── unit
│ └── integration
└── design.md

yaml
Copy code

---

## 7. 🧪 Test Coverage Summary

✔ Integration tests cover:

- Auth: Register + login + role behaviors  
- Course: Creation + list + enrollment  
- Attendance: Mark + session fetch  
- Face recognition: Recognition flow with mock Python service  

✔ Unit tests cover:

- Auth Service
- Attendance Service (validation + marking)

📁 Path for each: `/tests/integration` & `/tests/unit`

---

## 8. 🚀 Deployment Approach

Recommended:

Backend → Docker container
Python Face Service → Docker container
MongoDB → Cloud (Atlas)
Reverse proxy → Nginx
Env via docker-compose

yaml
Copy code

Scales to production easily.

---

## 9. 🔚 Conclusion

This project is designed for **real-world deployability**, focusing on:

- Maintainable architecture
- Scalable microservice pattern
- Test-driven reliability
- Modular replaceable ML component

The system can be extended into:

✨ Student analytics dashboards  
✨ Proxy detection with liveness detection  
✨ Multi-classroom multi-camera support  