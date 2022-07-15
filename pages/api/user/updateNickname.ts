import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/db";
import { getSession } from "next-auth/react";

export default async function updateName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session || req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  const { nickname } = req.body;

  const isExist = await prisma.user.count({ where: { nickname } });

  if (isExist) {
    return res.status(400).send("Déjà utilisé !");
  } else {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        nickname,
      },
    });
    res.send(nickname);
  }
}
