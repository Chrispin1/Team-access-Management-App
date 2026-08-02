import { checkDatabaseConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

//shows the checkDatabase function status by the use of an endpoint
export async function GET() {
  const isConnected = await checkDatabaseConnection();

  if (!isConnected) {
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      status: "ok",
      message: "Database connected successfully!!",
    },
    { status: 200 },
  );
}
