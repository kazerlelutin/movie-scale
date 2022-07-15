import { useDrop } from "react-dnd";
import useLazyFetch from "../../hooks/useLazyFetch";
import { Level as LevelInterface } from "../../types/Level.interface";
import { Movie } from "../../types/Movie.interface";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import classes from "./Level.module.css";

interface props {
  readonly scaleId: string;
  readonly level: LevelInterface;
  readonly addMovie: Function;
  readonly ownerId: string;
  readonly children: JSX.Element | JSX.Element[];
}

export default function Level({
  children,
  level,
  scaleId,
  addMovie,
  ownerId,
}: props) {
  const { loading, api } = useLazyFetch("/scale/addMovie"),
    [{ isOver }, drop] = useDrop(() => ({
      accept: "BOX",
      drop: (_e, item) => {
        const {movie}: {movie:Movie}= item.getItem();
        addMovie({ ...movie, position: level.position });
        api({ movie, position: level.position, scaleId });
        
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));
  return (
    <div
      key={level.position}
      ref={drop}
      role={"level"}
      data-drophover={isOver}
      className={classes.level}
    >
      {children}
      <ToastLoading loading={loading} text={"Déplacement du film"} />
    </div>
  );
}
