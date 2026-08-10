import { checkUserPermission, currentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { Prisma } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params;
    const user = await currentUser();

    if (!user || !checkUserPermission(user, Role.ADMIN)) {
      return NextResponse.json(
        {
          error: "You are unauthorized to assign team",
        },
        { status: 401 },
      );
    }

    const { teamid } = await request.json();

    if (teamid) {
      const team = await prisma.team.findUnique({
        where: { id: teamid },
      });

      if (!team) {
        return NextResponse.json(
          {
            error: "No team found",
          },
          { status: 404 },
        );
      }
    }

    //update user's team assignment
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        teamid: teamid,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        teamid: true,
        team: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({
      user: updatedUser,
      message: teamid
        ? "User assigned to team successfully"
        : "User removed from team successfully",
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }
    console.error("Team assignment error", error);
    return NextResponse.json(
      {
        error: "An error occurred while assigning team",
      },
      { status: 500 },
    );
  }
}
