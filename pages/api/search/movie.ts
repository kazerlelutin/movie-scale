import { NextApiRequest, NextApiResponse } from "next";
import tmdb from "../../../datasources/tmdb";

export default async function getTmdbMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req?.body?.search
      ? `/search/movie?query=${req.body.search}`
      : `/movie/now_playing`,
    { data } = await tmdb.get(url, {
      params: {
        language: "fr-FR",
        region: "FR",
        page:req.body.page || 1,
      },
    });
  res.json({
    results: data?.results.map((o: any) => 
     ( {
        api_id: o.id,
        title: o.title,
        original_title: o.original_title,
        poster:
          o.poster_path ? "https://image.tmdb.org/t/p/w500" + o.poster_path :'/default-poster.webp',
      })
    ),
    total_pages: data.total_pages || 1,
    total_results: data.total_results,
  });
}
