import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db/db";

export default async function getScaleMovies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || req.method !== "POST")
    return res.status(403).send("Mauvaise méthode ou utilisateur inconnu");

  const { take, cursor } = req.body,
    options: {
      where: Object;
      take: number;
      cursor?: Object;
      skip?: number;
      select: object;
      orderBy: Object
    } = {
      where: { userId: session.user.id },
      select: {
        name: true,
        id: true,
        _count: {
          select: { movies: true, favorites: true },
        },
      },
      take: take || 25,
      orderBy:{
        name: 'asc'
      },
    };

  if (cursor) {
    options.skip = 1;
    options.cursor = {
      id: cursor,
    };
  }
  const scales = await prisma.scalemovie.findMany(options);
  res.json(scales);
}
