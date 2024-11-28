import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.query;
      const event = await prisma.events.delete({
        where: {
          id: parseInt(id as string),
        },
      });
      return res.status(200).json(event);
    } else {
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
