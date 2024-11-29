import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { id, start, end, title } = await req.json();

    if (!id || !start || !end || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedEvent = await prisma.events.update({
      where: { id },
      data: {
        title,
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        updated_at: moment().toDate(),
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error: unknown) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.error("Error updating event:", message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
