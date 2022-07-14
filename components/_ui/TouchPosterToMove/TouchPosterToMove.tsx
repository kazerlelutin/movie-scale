/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import classes from "./TouchPosterToMove.module.css";
import { useEffect } from "react";
import { Movie } from "../../../types/Movie.interface";

interface props {
  readonly movie: Movie;
  readonly touchPosition: {
    x: number;
    y: number;
  };
}

export default function TouchPosterToMove({ movie, touchPosition }: props) {
  useEffect(() => {
    //for scroll follow drag
    if (touchPosition) {
      const scale = document.getElementById("scale"),
        partOfScreen = (touchPosition.y / window.innerHeight) * 100;
      if (partOfScreen < 30 && partOfScreen < 70) {
        scale.scrollTo({
          top: partOfScreen < 50 ? scale.scrollTop - 40 : scale.scrollTop + 40,
          behavior: "smooth",
        });
      }
    }
  }, [touchPosition]);

  return (
    <div
      className={classes.container}
      style={{
        top: touchPosition.y + 10 + "px",
        left: touchPosition.x + 10 + "px",
      }}
    >
      <Image
        src={movie.poster}
        width={60}
        height={60 * 1.33}
        alt="film déplacé"
      />
    </div>
  );
}
