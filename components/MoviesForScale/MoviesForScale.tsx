/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./MoviesForScale.module.css";
import useFetch from "../../utils/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import { Movie } from "../../types/Movie.interface";
import AddMedia from "../_ui/AddMedia/AddMedia";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import MovieToDrag from "../MovieToDrag/MovieToDrag";
import Level from "../Level/Level";

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
    peripheralPosition = useMemo(
      () => ({
        first: levels[0] ? levels[0].position + 1 : 1,
        last: levels[levels.length - 1]
          ? levels[levels.length - 1].position - 1
          : -1,
      }),
      [levels]
    ),
    isMyScale = useMemo(
      () => session && session.user.id === ownerId,
      [session, ownerId]
    ),
    { loading, data } = useFetch("/scale/movies/", { id: scaleId });

  useEffect(() => {
    if (data) createLevel(data);
  }, [data]);
  return (
    <div className={classes.container}>
      <ToastLoading loading={loading} text={"chargement de l'echelle"} />
      {isMyScale && levels.length === 0 && "Ajoute ton premier film"}
      {!isMyScale && levels.length === 0 && "Aucun film sur cette échelle"}
      <div className={classes.container}>
        {levels.map((level) => (
          <Level
            key={level.position}
            level={level}
            addMovie={addMovie}
            scaleId={scaleId}
            ownerId={ownerId}
          >
            {level.movies.map((movie: Movie) => (
              <MovieToDrag movie={movie} key={movie.id} levels={levels}/>
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
