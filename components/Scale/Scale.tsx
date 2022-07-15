import classes from "./Scale.module.css";
import { useState } from "react";
import MoviesForScale from "../MoviesForScale/MoviesForScale";
import { Level } from "../../types/Level.interface";
import AddMovie from "../AddMovie/AddMovie";

interface props {
  readonly scaleId: string;
  readonly ownerId: string;
  readonly levels: Array<Level>;
  readonly addMovie: Function;
  readonly createLevel: Function;
}

export default function Scale({
  scaleId,
  ownerId,
  levels,
  addMovie,
  createLevel,
}: props) {
  const [isAdd, setIsAdd] = useState(false),
    [currentPosition, setCurrentPosition] = useState<number | null>(null);

  function openPopin(position: number) {
    setCurrentPosition(position);
    setIsAdd(true);
  }

  function closePopin() {
    setCurrentPosition(null);
    setIsAdd(false);
  }

  return (
    <>
      {isAdd && (
        <AddMovie
          onClose={() => closePopin()}
          position={currentPosition}
          scaleId={scaleId}
          addMovie={addMovie}
        />
      )}
      <div className={classes.container}>
        <div className={classes.scale}>
          <MoviesForScale
            scaleId={scaleId}
            levels={levels}
            ownerId={ownerId}
            openPopin={(position: number) => openPopin(position)}
            addMovie={addMovie}
            createLevel={createLevel}
          />
        </div>
      </div>
    </>
  );
}
