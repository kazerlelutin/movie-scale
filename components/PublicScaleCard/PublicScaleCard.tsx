import Link from "next/link";
import { Scale } from "../../types/Scale.interface";
import Star from "../_ui/Star/Star";
import classes from "./PublicScaleCard.module.css";

interface props {
  readonly item: Scale;
}

export default function PublicScaleCard({ item }: props) {
  return (
    <Link href={`/scale/${item.id}`} passHref>
      <div className={classes.container}>
        <div className={classes.favorite}>
          <div className={classes.count}>{item._count.favorites}</div>
          <Star size={22}/>
        </div>

        <div className={classes.title}>{item.name}</div>

        <div className={classes.movies}>
          {item._count.movies} film{item._count.movies ? "s" : ""}
        </div>
      </div>
    </Link>
  );
}
