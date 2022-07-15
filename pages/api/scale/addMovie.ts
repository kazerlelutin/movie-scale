import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/db";
import { getSession } from "next-auth/react";
import { Movie } from "../../../types/Movie.interface";

export default async function addMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session || req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  const {
    movie,
    position,
    scaleId,
  }: { movie: Movie; position: number; scaleId: string } = req.body;
  const scale = await prisma.scalemovie.findFirst({
    where: { id: scaleId, userId: session.user.id },
  });

  if (!scale)
    return res
      .status(403)
      .send("Vous n'avez pas le droit de modifier cette échelle");

  const where = {
      scalemovie: {
        id: scaleId,
      },
      movie: {
        api_id: movie.api_id,
      },
    },
    existMovieOnScale = await prisma.movieOnScale.findFirst({ where });

  if (existMovieOnScale) {
    await prisma.movieOnScale.updateMany({
      where,
      data: {
        position,
      },
    });
  } else {
    await prisma.movieOnScale.create({
      data: {
        position,
        scalemovie: {
          connect: {
            id: scaleId,
          },
        },
        movie: {
          connectOrCreate: {
            create: movie,
            where: {
              api_id: movie.api_id,
            },
          },
        },
      },
    });
  }

  res.json({ ...movie, position });
}
