/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import classes from "./TouchScaleToMove.module.css";
import { useEffect } from "react";
import { Movie } from "../../../types/Movie.interface";
import { Scale } from "../../../types/Scale.interface";
import ScaleCard from '../../ScaleCard/ScaleCard';

interface props {
  readonly scale: Scale;
  readonly touchPosition: {
    x: number;
    y: number;
  };
}

export default function TouchScaleToMove({ scale, touchPosition }: props) {
  useEffect(() => {
    //for scroll follow drag
    if (touchPosition) {
      const scale = document.getElementById("scales"),
        partOfScreen = (touchPosition.y / window.innerHeight) * 100;

      if (partOfScreen > 30 && partOfScreen < 70) {
        scale.scrollTo({
          top: partOfScreen < 50 ? scale.scrollTop - 40 : scale.scrollTop + 100,
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
      <div className={classes.title}>{scale.name}</div>
    </div>
  );
}
