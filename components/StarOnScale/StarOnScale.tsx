/* eslint-disable react-hooks/exhaustive-deps */
import Star from "../_ui/Star/Star";
import classes from "./StarOnScale.module.css";
import useFetch from "../../utils/hooks/useFetch";
import useLazyFetch from "../../hooks/useLazyFetch";
import {  useEffect } from "react";

interface props {
  readonly scaleId: string;
}

export default function StarOnScale({ scaleId }: props) {
  const { data, refetch } = useFetch("/scale/stars", { scaleId }),
    { data: dataVoted, loading, api } = useLazyFetch("/scale/vote");

  function handleClick() {
    
    if(!loading){
        api({scaleId});
    }
  }

  useEffect(() => {
    if (dataVoted) {
      refetch();
    }
  }, [dataVoted]);

  return (
    <div className={classes.container}>
      <div className={classes.count}>
        {data ? data.stars._count.favorites : 0}
      </div>
      <div className={classes.star} onClick={handleClick}>
        <Star size={22} isColor={data && data.iHaveStared} />
      </div>
    </div>
  );
}
