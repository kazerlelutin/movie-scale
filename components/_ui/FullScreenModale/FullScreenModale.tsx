/* eslint-disable react-hooks/exhaustive-deps */
import { ReactChild, useEffect, useRef } from "react";
import clickOutside from "../../../utils/clickOutside";
import classes from "./FullScreenModale.module.css";

interface props {
  readonly onClose: Function;
  readonly children: ReactChild;
}
export default function FullScreenModale({ onClose, children }: props) {
  const ref = useRef(null);

  useEffect(() => clickOutside([ref], () => onClose()), []);

  return (
    <div className={classes.container}>
      <div className={classes.modale} ref={ref}>
        <div className={classes.close}>
          <div className="cross" onClick={() => onClose()} />
        </div>
        {children}
      </div>
    </div>
  );
}
