import request from "supertest";
import mongoose from "mongoose";
import axios from "axios";
import app from "../../src/app";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let uni="", prof="", profId="", stuId="", course="", session="";

describe("FACE + ATTENDANCE API", () => {

  beforeAll(async () => {

    // UNIVERSITY REGISTER
    const u = await request(app)
      .post("/api/v1/auth/register/university")
      .send({name:"UniA", email:"uniA@test.com", password:"123456"});
    uni = u.body.token;

    // PROFESSOR REGISTER
    const p = await request(app)
      .post("/api/v1/auth/register/professor")
      .send({name:"Prof", email:"prof@test.com", password:"123456"});
    prof = p.body.token;
    profId = p.body.user._id;

    // STUDENT REGISTER (mock python face register)
    mockedAxios.post.mockResolvedValue({data:{message:"Face registered"}});
    const s = await request(app)
      .post("/api/v1/auth/register/student")
      .send({name:"Stu", email:"stu@test.com", password:"123456", image:"b64"});
    stuId = s.body.user._id;

    // CREATE COURSE
    const c = await request(app)
      .post("/api/v1/courses")
      .set("Authorization",`Bearer ${uni}`)
      .send({name:"Machine Vision", code:"MV101", professorId:profId});
    course = c.body._id;

    // CREATE SESSION
    const cs = await request(app)
      .post("/api/v1/attendance/session")
      .set("Authorization",`Bearer ${prof}`)
      .send({courseId:course, topic:"Day1"});
    session = cs.body._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // -------------------------------------------------------
  it("should recognize student & mark attendance", async () => {
    mockedAxios.post.mockResolvedValueOnce({data:{recognized:[stuId]}});

    const res = await request(app)
      .post("/api/v1/face/recognize")
      .set("Authorization",`Bearer ${prof}`)
      .send({image:"sample", sessionId:session});

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  // -------------------------------------------------------
  // **NEGATIVE CASE FIXED – Option A (corrected input -> sessionId)**
  it("should return 0 if mocked result is empty", async () => {
    mockedAxios.post.mockResolvedValueOnce({data:{recognized:[]}});

    const res = await request(app)
      .post("/api/v1/face/recognize")
      .set("Authorization",`Bearer ${prof}`)
      .send({image:"sample", sessionId:session}); // <--- FIXED HERE

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(0);
  });

});
