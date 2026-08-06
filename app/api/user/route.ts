import { currentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { Prisma } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You are not authorized to access this resource.",
        },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get("teamId");
    const role = searchParams.get("role");

    //Build where clause based on user role
    const where: Prisma.UserWhereInput = {};

    if (user.role === "ADMIN") {
      //Admin can see all users
    } else if (user.role === "MANAGER") {
      //Manager can see all users in their team but or cross team users but not cross team managers
      where.OR = [{ teamid: user.teamid }, { role: "USER" }];
    } else {
      //Regular user can only see their own profile
      where.teamid = user.teamid;
      where.role = { not: Role.ADMIN };
    }

    //additional filters
    if (teamId) {
      where.teamid = teamId;
    }

    if (role) {
      where.role = role as Role;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching users.",
      },
      { status: 500 },
    );
  }
}
