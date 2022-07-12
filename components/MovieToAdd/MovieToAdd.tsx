/* eslint-disable react-hooks/exhaustive-deps */
import useLazyFetch from "../../hooks/useLazyFetch";
import { Movie } from "../../types/Movie.interface";
import Poster from "../Poster/Poster";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import { useEffect } from "react";

interface props {
  readonly movie: Movie;
  readonly position: number;
  readonly scaleId: string;
  readonly onClose: Function;
  readonly addMovie: Function;
}
export default function MovieToAdd({
  movie,
  position,
  scaleId,
  onClose,
  addMovie
}: props) {
  const { loading, data, api } = useLazyFetch("/scale/addMovie");

  useEffect(() => {
    if (data){
        onClose();
        addMovie(data)
    }
  }, [data]);

  return (
    <>
      <Poster onClick={() => api({ movie, position, scaleId })} movie={movie} />
      <ToastLoading loading={loading} text={"Ajout du film à votre échelle"} />
    </>
  );
}
