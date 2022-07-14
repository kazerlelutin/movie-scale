import Image from "next/image";
import { useDrag } from "react-dnd";
import classes from "./MovieToDrag.module.css";
import { isMobile } from "react-device-detect";
import TouchPosterToMove from "../_ui/TouchPosterToMove/TouchPosterToMove";

export default function MovieToDrag({ movie,levels }) {
  const [{ isDragging, clientOffset }, drag] = useDrag(() => ({
    type: "BOX",
    item: {movie,levels},
    
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        clientOffset:monitor.getClientOffset() || undefined,
      }),
  }));

  return (
    <div className={classes.movie} title={movie.title} ref={drag}>
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
