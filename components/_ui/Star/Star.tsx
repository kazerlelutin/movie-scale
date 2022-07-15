import Image from "next/image";
import StarGrey from "../../../public/star-trans.svg";
import StarColor from "../../../public/star.svg";
import classes from "./Star.module.css";

interface props {
  readonly isColor?: boolean;
  readonly size?:number
}

export default function Star({ isColor,size }: props) {
  return (
    <div className={classes.scontainer}>
      <Image
        src={isColor ? StarColor : StarGrey}
        alt={"étoile"}
        width={size ||30}
        height={size || 30}
      />
    </div>
  );
}