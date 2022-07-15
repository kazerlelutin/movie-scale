import Image from "next/image";
import { useDrag } from "react-dnd";
import classes from "./MovieToDrag.module.css";
import { isMobile } from "react-device-detect";
import TouchPosterToMove from "../_ui/TouchPosterToMove/TouchPosterToMove";
import { useSession } from 'next-auth/react';
import { Movie } from "../../types/Movie.interface";
import { Level } from "../../types/Level.interface";

interface props {
  readonly movie:Movie;
  readonly levels: Array<Level>;
  readonly isMyScale: boolean
}
export default function MovieToDrag({ movie,levels,isMyScale }:props) {
  const [{ isDragging, clientOffset }, drag] = useDrag(() => ({
    type: "BOX",
    item: {movie,levels},
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        clientOffset:monitor.getClientOffset() || undefined,
      }),
  }));
  return (
    <div className={classes.movie} title={movie.title} ref={(isMyScale) ? drag:null} data-isdragging={isDragging}>
      <Image
        className={classes.img}
        src={movie.poster}
        alt={movie.title}
        width={75}
        height={75 * 1.33}
      />
      {isDragging && isMobile && clientOffset && (
        <TouchPosterToMove movie={movie} touchPosition={clientOffset} />
      )}
    </div>
  );
}
