import { registerUser, loginUser } from "../../src/services/auth.service";
import bcrypt from "bcryptjs";
import { signToken } from "../../src/utils/jwt";

// -------------- FIXED MODEL MOCK ------------------
jest.mock("../../src/models/User", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));
// --------------------------------------------------

import { User } from "../../src/models/User";

// Mock bcrypt & jwt
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock("../../src/utils/jwt", () => ({
  signToken: jest.fn()
}));

describe("Auth Service Unit Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Prevent cross-test pollution
  });

  it("register user", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpwd");
    (User.create as jest.Mock).mockResolvedValue({ _id: "1", email: "x@mail.com" });
    (signToken as jest.Mock).mockReturnValue("tok123");

    const res = await registerUser("A", "x@mail.com", "12345", "student");

    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(res.token).toBe("tok123");
  });

  it("reject duplicate email", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ email: "used@mail.com" });

    await expect(registerUser("A","used@mail.com","12345","student"))
      .rejects
      .toThrow("Email already in use");
  });

  it("login success", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ password:"hashed" });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (signToken as jest.Mock).mockReturnValue("logintok");

    const res = await loginUser("mail","pass");
    expect(res.token).toBe("logintok");
  });

  it("login fail wrong password", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ password:"hashed" });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(loginUser("mail","wrong"))
      .rejects.toThrow("Invalid credentials");
  });

});
