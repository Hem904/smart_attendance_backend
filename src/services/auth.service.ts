import { User, IUser, UserRole } from "../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";

export async function registerUser(
    name: string,
    email: string,
    password: string,
    role: UserRole
) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already in use");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
        role
    });

    const token = signToken({ id: user._id, role: user.role });
    return { user, token };
}

export async function loginUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = signToken({ id: user._id, role: user.role });
    return { user, token };
}
