import Image from "next/image";
import { Movie } from "../../types/Movie.interface";
import classes from "./Poster.module.css";

interface props {
  readonly onClick: Function;
  readonly movie: Movie;
}

export default function Poster({ onClick, movie }: props) {
  return (
    <div className={classes.container} onClick={() => onClick(movie)}>
      <Image
        className={classes.img}
        layout="responsive"
        sizes="100vw"
        src={movie.poster}
        alt={movie.title}
        width={80}
        height={114}
      />
      <div className={classes.title}>{movie.title}</div>
    </div>
  );
}
