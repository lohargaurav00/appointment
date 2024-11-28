import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { start, end, title } = body;

    if (!start || !end || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.events.create({
      data: {
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        title,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
