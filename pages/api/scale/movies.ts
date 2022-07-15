import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../../db/db';

export default async function getScaleMovies(  req: NextApiRequest,
  res: NextApiResponse){
    /**
     * //TODO
     * Mettre un cursor pour le film et prendre que X films
    */
    if(req?.body?.id){
      const 
      movies = await prisma.movieOnScale.findMany({where:{
        scalemovieId:req.body.id
      },
      select: {
        position:true,
        movie:true
      },
    }),
      positions = await prisma.movieOnScale.findMany({where:{
        scalemovieId:req.body.id
      },
      select: {
        position:true
      },
      orderBy:{
        position: 'desc'
      },
      distinct:['position']
    })

      //Avec le count, on prend au milieu
      // on par toujours du haut ? mais  double request si anchor pour prendre avant et après
      //on peut prendre un take -10 et un take 10, 2 requests.
      //Si pas, prend le count, divise par 2, prendre l'element en cursor et take

      res.json({movies: movies.map(o=>({
        ...o.movie,
        position:o.position
      })),positions: positions.map(o=>o.position)});
      
    }else {
     return  res.status(400).send("Aucun ID d'echelle");
    }

  }
