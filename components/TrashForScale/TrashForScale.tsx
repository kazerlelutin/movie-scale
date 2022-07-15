import classes from "./TrashForScale.module.css";
import { useDrop } from "react-dnd";
import { CSSTransition } from "react-transition-group";
import useLazyFetch from "../../hooks/useLazyFetch";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import Trash from "../_ui/Trash/Trash";
import { Scale } from "../../types/Scale.interface";

interface props {
  readonly removeScale: Function;
}

export default function TrashForScale({ removeScale }: props) {
  const { loading, api } = useLazyFetch("/scale/delete"),
    [{ isOver, highlighted }, drop] = useDrop(() => ({
      accept: "BOX",
      drop: (_e, item) => {
        const { scale, state }: { scale: Scale; state: any } = item.getItem();

        removeScale({
          ...state,
          items: state.items.filter((o) => o.id !== scale.id),
        });
        api({ scale });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        highlighted: monitor.canDrop(),
      }),
    }));
  return (
    <>
      <CSSTransition
        in={highlighted}
        timeout={300}
        classNames="toast"
        unmountOnExit
        mountOnEnter
      >
        <div ref={drop} className={classes.box}>
          <Trash isOver={isOver} />
        </div>
      </CSSTransition>
      <ToastLoading loading={loading} text={"suppression de l'échelle"} />
    </>
  );
}
