import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET: Secret = env.JWT_SECRET as Secret;

export function signToken(payload: object): string {
    const options: SignOptions = {};

    // env.JWT_EXPIRES_IN is a normal string like "7d", we know it's valid for jsonwebtoken,
    // so we just cast it to any to satisfy TypeScript's narrower union type.
    if (env.JWT_EXPIRES_IN) {
        (options as any).expiresIn = env.JWT_EXPIRES_IN;
    }

    return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken<T = any>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
}
