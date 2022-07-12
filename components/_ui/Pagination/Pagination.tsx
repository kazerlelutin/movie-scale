/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./Pagination.module.css";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Pagination({ onTrigger }) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      onTrigger();
    }
  }, [inView]);

  return <div className={classes.container} ref={ref} />;
}
