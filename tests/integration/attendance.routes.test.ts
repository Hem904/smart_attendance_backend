import request from "supertest";
import app from "../../src/app";
import axios from "axios";
jest.mock("axios");
const api = axios as jest.Mocked<typeof axios>;

let uniToken="", profToken="", professorId="", studentId="", courseId="", sessionId="";

describe("ATTENDANCE API", () => {

  beforeAll(async () => {
    const u = await request(app)
      .post("/api/v1/auth/register/university")
      .send({ name:"UniAtt", email:"att1@test.com", password:"123456" });

    uniToken = u.body.token;

    const p = await request(app)
      .post("/api/v1/auth/register/professor")
      .send({ name:"ProfAtt", email:"patt1@test.com", password:"123456" });

    profToken = p.body.token;
    professorId = p.body.user._id;

    api.post.mockResolvedValue({ data:{ message:"Face registered" }}); // 👈 important

    const s = await request(app)
      .post("/api/v1/auth/register/student")
      .send({ name:"S1", email:"satt@test.com", password:"123456", image:"b64" });

    studentId = s.body.user._id;

    const c = await request(app)
      .post("/api/v1/courses")
      .set("Authorization",`Bearer ${uniToken}`)
      .send({ name:"ML", code:"ML001", professorId });

    courseId = c.body._id;

    const ses = await request(app)
      .post("/api/v1/attendance/session")
      .set("Authorization",`Bearer ${profToken}`)
      .send({ courseId, topic:"Intro" });

    sessionId = ses.body._id;
  });

  it("marks attendance manually", async () => {
    const res = await request(app)
      .post("/api/v1/attendance/mark")
      .set("Authorization",`Bearer ${profToken}`)
      .send({ sessionId, studentIds:[studentId] });

    expect(res.status).toBe(200);
  });

  it("fetch sessions by course", async () => {
    const res = await request(app)
      .get(`/api/v1/attendance/course/${courseId}/sessions`)
      .set("Authorization",`Bearer ${profToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
describe("ATTENDANCE NEGATIVE CASES",()=>{

  it("should fail marking if sessionId invalid",async()=>{
    const res = await request(app)
      .post("/api/v1/attendance/mark")
      .set("Authorization",`Bearer ${profToken}`)
      .send({sessionId:"WRONG",studentIds:[studentId]});

    expect(res.status).toBe(400);
  });

  it("should block attendance marking without token",async()=>{
    const res = await request(app)
      .post("/api/v1/attendance/mark")
      .send({sessionId,studentIds:[studentId]});

    expect(res.status).toBe(401);
  });

});
  