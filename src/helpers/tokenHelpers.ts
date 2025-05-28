import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Token creation helper
export const createToken = (userId: string) => {
    try {        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
            expiresIn: "7d"
        });
        return token;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error("Error creating token: " + error.message);
        }
        throw new Error("Error creating token: Unknown error");
    }
};

// Token validation helper
export const validateToken = (token: string) => {
    try {        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch {
        throw new Error("Invalid token");
    }
};

// Set token in response cookie
export const setTokenCookie = (token: string) => {
    const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
    );

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
};

// Error response helper
export const errorResponse = (message: string, status: number = 400) => {
    return NextResponse.json(
        { error: message },
        { status }
    );
};
