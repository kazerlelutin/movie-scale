import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/db";
import { getSession } from "next-auth/react";
import { Movie } from "../../../types/Movie.interface";

export default async function removeMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session || req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  const { movie, scaleId }: { movie: Movie; scaleId: string } = req.body;
  const scale = await prisma.scalemovie.findFirst({
    where: { id: scaleId, userId: session.user.id },
  });

  if (!scale)
    return res
      .status(403)
      .send("Vous n'avez pas le droit de modifier cette échelle");

  await prisma.movieOnScale.deleteMany({
    where: {
      scalemovieId: scale.id,
      movie:{
        api_id: movie.api_id
      }
    },
  });

  res.send("done");
}
