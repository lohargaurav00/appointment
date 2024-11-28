import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const event = await prisma.events.delete({
      where: {
        id: parseInt(id, 10),
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
