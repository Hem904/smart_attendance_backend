# 🧪 Smart Attendance System – Test Suite Summary

This project includes **Unit Tests + Integration Tests** to ensure that every core module of the microservice backend (Node + MongoDB) behaves reliably.

---

## ✔ Coverage Summary

| Layer Tested | Type | Status |
|---|---|---|
| Authentication (Register/Login) | Integration + Unit | **Passed** |
| Courses | Integration | **Passed** |
| Attendance | Integration + Unit | **Passed** |
| Face Recognition (Python microservice mocked) | Integration | **Passed** |
| Token + Role Middlewares | Through API flow | **Validated** |
| DB + Mongoose Handling | Test DB via `jest.setup.ts` | **Isolated & Clean** |

> All test suites passed successfully.

---

## Test Execution

Run all tests:

```bash
npm test
