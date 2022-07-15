import Link from "next/link";
import { Scale } from "../../types/Scale.interface";
import Star from "../_ui/Star/Star";
import classes from "./ScaleCard.module.css";
import { useDrag } from "react-dnd";
import TouchScaleToMove from "../_ui/TouchScaleToMove/TouchScaleToMove";
import { isMobile } from "react-device-detect";

interface props {
  readonly item: Scale;
  readonly state: any;
}

export default function ScaleCard({ item, state }: props) {
  const [{ isDragging, clientOffset }, drag] = useDrag(() => ({
    type: "BOX",
    item: { scale: item, state },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset() || undefined,
    }),
  }));

  return (
    <div className={classes.container} ref={drag} data-isdragging={isDragging}>
      <div className={classes.favorite}>
        <div className={classes.count}>{item._count.favorites}</div>
        <Star />
      </div>
      <Link href={`/scale/${item.id}`} passHref>
        <a className={classes.title}>{item.name}</a>
      </Link>
      <div className={classes.movies}>
        {item._count.movies} film{item._count.movies ? "s" : ""}
      </div>
      {isDragging && isMobile && clientOffset && (
        <TouchScaleToMove scale={item} touchPosition={clientOffset} />
      )}
    </div>
  );
}
