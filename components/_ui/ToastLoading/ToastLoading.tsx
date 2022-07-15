import { CSSTransition } from "react-transition-group";
import Loader from "../Loader/Loader";
import classes from "./ToastLoading.module.css";

interface props {
  readonly loading: boolean;
  readonly text?: string;
}

export default function ToastLoading({ loading, text }: props) {
  return (
    <CSSTransition
      in={loading}
      timeout={300}
      classNames="toast"
      unmountOnExit
      mountOnEnter
    >
      <div className={classes.container}>
        <div className={classes.mug}>
          <Loader />
        </div>
        {text && <div className={classes.text}>{text}</div>}
      </div>
    </CSSTransition>
  );
}
