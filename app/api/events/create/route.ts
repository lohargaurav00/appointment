import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { start, end, title } = req.body;
      const event = await prisma.events.create({
        data: {
          start,
          end,
          title,
        },
      });
      return res.status(200).json(event);
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
