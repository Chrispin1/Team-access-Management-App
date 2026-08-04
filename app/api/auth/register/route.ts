import { generateToken, hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, teamCode } = await request.json();

    //validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    //find existing user by email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 409 },
      );
    }

    //find team by code
    let teamId: string | undefined;
    if (teamCode) {
      const team = await prisma.team.findUnique({
        where: { code: teamCode },
      });
      if (!team) {
        return NextResponse.json(
          {
            error: "Please provide a valid team code",
          },
          { status: 400 },
        );
      }
      teamId = team.id;
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    //first user is assigned as ADMIN, other users are assigned as USER
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER;

    //create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        teamid: teamId,
      },
      include: {
        team: true,
      },
    });

    //generate token
    const token = generateToken(user.id);

    //generate response
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        teamId: user.teamid,
        team: user.team,
        token,
      },
    });

    //set token in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
