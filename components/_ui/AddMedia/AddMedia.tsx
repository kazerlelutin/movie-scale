import classes from "./AddMedia.module.css";

interface props {
  readonly onClick: Function;
}

export default function AddMedia({ onClick }: props) {
  return (
    <div className={classes.container} onClick={() => onClick()}>
      <div className={classes.cross} />
    </div>
  );
}
