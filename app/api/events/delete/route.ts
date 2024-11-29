import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const event = await prisma.events.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
