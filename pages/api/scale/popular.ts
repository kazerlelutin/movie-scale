import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/db";

export default async function getPopularScales(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const scales = await prisma.scalemovie.findMany({
    select: {
      id: true,
      name: true,
      user: {
        select: { nickname: true, email: true },
      },
      _count: {
        select: { movies: true, favorites: true },
      },
    },
    orderBy: {
      favorites: {
        _count: "desc",
      },
      
    },
    take: 25,
  });
  console.log(scales);
  res.json(scales);
}
