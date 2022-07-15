import classes from "./Trash.module.css";

interface props {
  readonly isOver?: boolean;
}

export default function Trash({ isOver }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.mug}>
        <div className={classes.container} data-drag-hover={isOver}>
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
  );
}
