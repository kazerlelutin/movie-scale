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

  const {name,scaleId} = req.body;

  await prisma.scalemovie.updateMany({
    where:{
        userId: session.user.id,
        id: scaleId
    },
    data:{
        name
    }
  })
  res.send(name);
}
