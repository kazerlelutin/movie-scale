import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db/db";

export default async function getStars(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  const stars = await prisma.scalemovie.findFirst({
    where: {
      id: req.body.scaleId,
    },
    select: {
      _count: {
        select: { favorites: true },
      },
    },
  });
  if (session) {
    const iHaveStared = await prisma.starOnScalemovie.count({
      where: {
        userId: session.user.id,
        scalemovieId: req.body.scaleId,
      },
    });
    res.json({ stars, iHaveStared: !!iHaveStared });
  } else {
    res.json({ stars });
  }
}
