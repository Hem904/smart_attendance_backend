import request from "supertest";
import app from "../../src/app";

let uniToken = "";
let professorId = "";

describe("COURSE API", () => {

  beforeAll(async () => {
    const u = await request(app)
      .post("/api/v1/auth/register/university")
      .send({ name:"UniCourse", email:"courseuni@test.com", password:"pass123" });

    uniToken = u.body.token;

    const p = await request(app)
      .post("/api/v1/auth/register/professor")
      .send({ name:"Professor", email:"pcourse@test.com", password:"pass123" });

    professorId = p.body.user._id;
  });

  it("should create a course", async () => {
    const res = await request(app)
      .post("/api/v1/courses")
      .set("Authorization", `Bearer ${uniToken}`)
      .send({ name:"AI Course", code:"AI999", professorId });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should list all courses", async () => {
    const res = await request(app)
      .get("/api/v1/courses")
      .set("Authorization", `Bearer ${uniToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
describe("COURSE NEGATIVE CASES", ()=>{

  it("should block unauthorized course creation", async()=>{
    const res = await request(app)
      .post("/api/v1/courses")
      .send({name:"Test",code:"C1",professorId:"123"});

    expect(res.status).toBe(401);
  });

  it("should reject invalid professor ID", async()=>{
    const res = await request(app)
      .post("/api/v1/courses")
      .set("Authorization",`Bearer ${uniToken}`)
      .send({name:"Test2",code:"C2",professorId:"INVALID"});

    expect(res.status).toBe(400);
  });

});
