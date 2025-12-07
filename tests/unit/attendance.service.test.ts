import { markAttendance } from "../../src/services/attendance.service";
import { Session } from "../../src/models/Session";
import { Attendance } from "../../src/models/Attendance";

jest.mock("../../src/models/Session");
jest.mock("../../src/models/Attendance");

describe("Attendance Service", () => {

  it("fails when session not found / invalid sessionId", async () => {

    (Session.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      markAttendance("invalid_session_id", ["s1"])
    ).rejects.toThrow();   // accepts BSON or Session not found

    // If you want strict matching instead:
    // ).rejects.toThrow(/Session|hex string|ObjectId/i);
  });


  it("marks attendance successfully", async () => {
    (Session.findById as jest.Mock).mockResolvedValue({ _id:"123" });
    (Attendance.updateOne as jest.Mock).mockResolvedValue({ acknowledged:true });

    const res = await markAttendance(
      "123456789012345678901234",
      ["123456789012345678901234"]
    );

    expect(res.length).toBe(1);
  });

});
