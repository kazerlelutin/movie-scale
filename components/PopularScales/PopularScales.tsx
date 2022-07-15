import classes from "./PopularScales.module.css";
import useFetch from "../../utils/hooks/useFetch";
import Loader from "../_ui/Loader/Loader";
import { Scale } from '../../types/Scale.interface';
import PublicScaleCard from "../PublicScaleCard/PublicScaleCard";

export default function PopularScales() {
  const { data, loading } = useFetch("/scale/popular");

  return loading ? <Loader /> : <div className={classes.container}>
    { data && data.map((scale:Scale)=> <PublicScaleCard item={scale} key={scale.id}/>)}
  </div>;
}
