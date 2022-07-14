import classes from "./Trash.module.css";
import { useDrop } from "react-dnd";
import useLazyFetch from "../../../hooks/useLazyFetch";
import { CSSTransition } from "react-transition-group";
import ToastLoading from "../ToastLoading/ToastLoading";
import { Level } from "../../../types/Level.interface";
import { Movie } from "../../../types/Movie.interface";

interface props {
  readonly scaleId: string;
  readonly removeMovie: Function;
}

export default function Trash({ removeMovie, scaleId }:props) {
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
        <div className={classes.box}>
          <div className={classes.container}>
            <div className={classes.mug}>
              <div
                className={classes.container}
                ref={drop}
                data-drag-hover={isOver}
              >
                <div className={classes.trash}>
                  <div className={classes.containerBar}>
                    {[1, 2, 3].map((bar) => (
                      <div className={classes.bar} key={bar} />
                    ))}
                  </div>
                </div>
                <div className={classes.wrist} />
                <div className={classes.lid} />
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <ToastLoading loading={loading} text={"suppression du film"} />
    </>
  );
}
