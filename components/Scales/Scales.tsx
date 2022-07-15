import { Scale } from '../../types/Scale.interface';
import ScaleCard from "../ScaleCard/ScaleCard";
import TrashForScale from "../TrashForScale/TrashForScale";
import classes from "./Scales.module.css";

interface props {
  readonly items?: Array<Scale>;
  readonly setState?:Function;
  readonly state?:any;
}
export default function Scales({ items = [],setState,state }: props) {
  return (
    <div className={classes.container} id="scales">
      {items.map((scale) => (
        <ScaleCard key={scale.id} item={scale} state={state} />
      ))}
      <TrashForScale removeScale={setState} />
    </div>
  );
}