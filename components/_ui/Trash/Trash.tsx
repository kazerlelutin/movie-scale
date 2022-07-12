import classes from "./Trash.module.css";

export default function Trash() {
  return (
    <div className={classes.container}>
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
  );
}
