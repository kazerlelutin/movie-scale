import classes from "./TrashForMovie.module.css";
import { useDrop } from "react-dnd";
import { CSSTransition } from "react-transition-group";
import { Movie } from "../../types/Movie.interface";
import useLazyFetch from "../../hooks/useLazyFetch";
import { Level } from "../../types/Level.interface";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import Trash from "../_ui/Trash/Trash";

interface props {
  readonly scaleId: string;
  readonly removeMovie: Function;
}

export default function TrashForMovie({ removeMovie, scaleId }: props) {
  const { loading, api } = useLazyFetch("/scale/removeMovie"),
    [{ isOver, highlighted }, drop] = useDrop(() => ({
      accept: "BOX",
      drop: (_e, item) => {
        const { movie, levels }: { movie: Movie; levels: Array<Level> } =
          item.getItem();
        removeMovie(
          levels.map((o: Level) => {
            return {
              ...o,
              movies: o.movies.filter((it) => it.api_id !== movie.api_id),
            };
          })
        );
        api({ movie, scaleId });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        highlighted: monitor.canDrop(),
      }),
    }));
  return (
    <>
      <CSSTransition
        in={highlighted}
        timeout={300}
        classNames="toast"
        unmountOnExit
        mountOnEnter
      >
        <div ref={drop} className={classes.box}>
          <Trash isOver={isOver}  />
        </div>
      </CSSTransition>
      <ToastLoading loading={loading} text={"suppression du film"} />
    </>
  );
}
