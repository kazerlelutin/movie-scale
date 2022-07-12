import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/db";
import { getSession } from "next-auth/react";

export default async function createScale(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session || req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");
  const count = await prisma.scalemovie.count({
      where: { userId: session.user.id },
    }),
    name = `mon echelle (${count + 1})`,
    newScale = await prisma.scalemovie.create({
      data: {
        name,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

  res.send(newScale.id);
}
