import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
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
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "You are not authenticated",
        },
        { status: 401 },
      );
    }

    if (!checkUserPermission(currentUser, Role.ADMIN)) {
      return NextResponse.json(
        {
          error: "You are not authorized to change roles",
        },
        { status: 403 },
      );
    }

    //prevent user from changing their own role
    if (userId === currentUser.id) {
      return NextResponse.json(
        {
          error: "You cannot change your own role",
        },
        { status: 403 },
      );
    }

    const { role } = (await request.json()) as { role: Role };

    //validate role
    const validRoles = [Role.USER, Role.MANAGER];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        {
          error: "Invalid Role, cannot have more than one ADMIN",
        },
        { status: 400 },
      );
    }

    //updated user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
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
      message: "User role updated successfully",
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
    console.error("Role assignment error", error);
    return NextResponse.json(
      {
        error: "An error occured",
      },
      { status: 500 },
    );
  }
}
