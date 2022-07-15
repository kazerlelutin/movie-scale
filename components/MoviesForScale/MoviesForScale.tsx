/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./MoviesForScale.module.css";
import useFetch from "../../utils/hooks/useFetch";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Movie } from "../../types/Movie.interface";
import AddMedia from "../_ui/AddMedia/AddMedia";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import MovieToDrag from "../MovieToDrag/MovieToDrag";
import Level from "../Level/Level";
import MoviePopin from "../MoviePopin/MoviePopin";

interface props {
  readonly scaleId: string;
  readonly levels: Array<any>;
  readonly addMovie: Function;
  readonly ownerId: string;
  readonly openPopin: Function;
  readonly createLevel: Function;
}

export default function MoviesForScale({
  scaleId,
  levels,
  createLevel,
  ownerId,
  addMovie,
  openPopin,
}: props) {
  const { data: session } = useSession(),
    isMyScale = useMemo(
      () => session && session.user.id === ownerId,
      [session, ownerId]
    ),
    { loading, data } = useFetch("/scale/movies/", { id: scaleId }),
    [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
    
  useEffect(() => {
    if (data) createLevel(data);
  }, [data]);
  return (
    <div className={classes.container}>
      {currentMovie && (
        <MoviePopin
          movie={currentMovie}
          onClose={() => setCurrentMovie(null)}
        />
      )}
      <ToastLoading loading={loading} text={"chargement de l'echelle"} />
      {isMyScale && levels.length === 0 && "Ajoute ton premier film"}
      {!isMyScale && levels.length === 0 && "Aucun film sur cette échelle"}
      <div className={classes.container}>
        {levels
          .filter((o) => isMyScale || o.movies.length > 0)
          .map((level) => (
            <Level
              key={level.position}
              level={level}
              addMovie={addMovie}
              scaleId={scaleId}
              ownerId={ownerId}
            >
              {level.movies.map((movie: Movie) => (
                <div key={movie.id} onClick={() => setCurrentMovie(movie)}>
                  <MovieToDrag
                    movie={movie}
                    levels={levels}
                    isMyScale={isMyScale}
                  />
                </div>
              ))}
              {isMyScale && levels.length > 0 && (
                <AddMedia onClick={() => openPopin(level.position)} />
              )}
            </Level>
          ))}
      </div>
    </div>
  );
}
