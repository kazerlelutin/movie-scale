/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "../../utils/hooks/useFetch";
import FullScreenModale from "../_ui/FullScreenModale/FullScreenModale";
import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import classes from "./AddMovie.module.css";
import { Movie } from "../../types/Movie.interface";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import Pagination from "../_ui/Pagination/Pagination";
import MovieToAdd from "../MovieToAdd/MovieToAdd";

interface props {
  readonly onClose: Function;
  readonly addMovie: Function;
  readonly position: number;
  readonly scaleId: string;
}

export default function AddMovie({ onClose, position, scaleId,addMovie }: props) {
  const [search, setSearch] = useState(""),
    [movies, setMovies] = useState([]),
    [page, setPage] = useState(1),
    searchDebounce = useDebounce(search),
    {
      loading: searchLoading,
      data: tmdbData,
      refetch,
    } = useFetch("/search/movie", { search, page });

  useEffect(() => {
    setMovies([]);
    setPage(1);
    refetch();
  }, [searchDebounce]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (page > 1 && tmdbData?.results) {
      setMovies([...movies, ...tmdbData.results]);
    } else if (tmdbData && tmdbData.results) {
      setMovies(tmdbData.results);
    }
  }, [tmdbData]);

  return (
    <FullScreenModale onClose={() => onClose()}>
      <div className={classes.container}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un film"
        />
        <div className={classes.containerMovies}>
          <div className={classes.movies}>
            {movies.map((o: Movie) => (
              <MovieToAdd
                key={o.api_id}
                movie={o}
                scaleId={scaleId}
                position={position}
                addMovie={(movie:Movie)=>addMovie(movie)}
                onClose={() => onClose()}
              />
            ))}
            {!searchLoading &&
              tmdbData &&
              tmdbData.total_pages &&
              page < tmdbData?.total_pages &&
              movies.length > 0 && (
                <Pagination onTrigger={() => setPage(page + 1)} />
              )}
          </div>
        </div>
        <ToastLoading loading={searchLoading} text={"Recherche en cours"} />
      </div>
    </FullScreenModale>
  );
}
