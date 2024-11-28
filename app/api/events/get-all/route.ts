import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.events.findMany();

    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching events:", error?.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
