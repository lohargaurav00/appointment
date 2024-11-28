import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { id, start, end, title } = req.body;
      const event = await prisma.events.update({
        where: {
          id,
        },
        data: {
          title,
          start,
          end,
          updated_at: moment().toDate(),
        },
      });
      return res.status(200).json(event);
    } else {
      res.setHeader("Allow", ["PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
