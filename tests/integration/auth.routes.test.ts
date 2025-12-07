import request from "supertest";
import app from "../../src/app";

describe("AUTH API", () => {

  it("should register a university", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register/university")
      .send({ name:"Uni-auth", email:"auth1@test.com", password:"123456" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login university", async () => {
    await request(app)
      .post("/api/v1/auth/register/university")
      .send({ name:"U2", email:"auth2@test.com", password:"123456" });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email:"auth2@test.com", password:"123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

describe("AUTH NEGATIVE CASES", () => {

  it("should fail login with wrong password", async () => {
    await request(app).post("/api/v1/auth/register/university")
      .send({ name:"X", email:"wrong@t.com", password:"123" });

    const res = await request(app).post("/api/v1/auth/login")
      .send({ email:"wrong@t.com", password:"incorrect" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("should reject registration when required fields missing", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register/university")
      .send({ name:"NoEmail" });

    expect(res.status).toBe(400);
  });

  it("should reject without token on protected route", async ()=>{
    const res = await request(app).get("/api/v1/courses");
    expect(res.status).toBe(401);
  });

});
});
