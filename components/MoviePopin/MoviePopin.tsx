import { Movie } from "../../types/Movie.interface";
import classes from "./MoviePopin.module.css";
import FullScreenModale from "../_ui/FullScreenModale/FullScreenModale";
import Image from "next/image";

interface props {
  readonly movie: Movie;
  readonly onClose: Function;
}
export default function MoviePopin({ movie, onClose }: props) {
  return (
    <FullScreenModale onClose={onClose}>
      <div className={classes.container}>
        <div className="title">{movie.title}</div>
        <div className={classes.poster}>
          <Image
            className={classes.img}
            layout="responsive"
            sizes="100vw"
            src={movie.poster}
            alt={movie.title}
            width={80}
            height={114}
          />
        </div>
      </div>
    </FullScreenModale>
  );
}
