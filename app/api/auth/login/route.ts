import { generateToken, verifyPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    //validation for required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const userFromDb = await prisma.user.findUnique({
      where: { email },
      include: { team: true },
    });

    if (!userFromDb) {
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    //validate password
    const isValidPassword = await verifyPassword(password, userFromDb.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid email or Password",
        },
        {
          status: 401,
        },
      );
    }

    //generate token
    const token = generateToken(userFromDb.id);

    //response
    const response = NextResponse.json({
      user: {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        role: userFromDb.role,
        teamId: userFromDb.teamid,
        team: userFromDb.team,
      },
    });

    //set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
