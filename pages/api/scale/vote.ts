import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db/db";

export default async function vote(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  const { scaleId }: { scaleId: string } = req.body;
  const iHaveStared = await prisma.starOnScalemovie.count({
    where: {
      userId: session.user.id,
      scalemovieId: scaleId,
    },
  });

  if (iHaveStared === 0) {
    await prisma.starOnScalemovie.create({
      data: {
        scalemovieId: scaleId,
        userId: session.user.id,
      },
    });
    res.send("done");
  } else {
    await prisma.starOnScalemovie.deleteMany({
      where: {
        scalemovieId: scaleId,
        userId: session.user.id,
      },
    });
    res.send("delete");
  }
}
