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

  const isOwner = await prisma.scalemovie.count({
    where: {
      userId: session.user.id,
      id: req.body.scale.id
    },
  });

  if (!isOwner)
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  await prisma.starOnScalemovie.deleteMany({
    where: {
      scalemovieId: req.body.scale.id,
    },
  });

  await prisma.movieOnScale.deleteMany({
    where: {
      scalemovieId: req.body.scale.id,
    },
  });

  await prisma.scalemovie.deleteMany({
    where: {
      id: req.body.scale.id,
      userId: session.user.id,
    },
  });

  res.send("done");
}
