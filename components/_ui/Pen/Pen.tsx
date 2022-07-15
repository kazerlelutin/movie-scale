import classes from './Pen.module.css';
import Image from "next/image";
import PenImg from "../../../public/pen.webp";

interface props {
    readonly onClick: Function
}
export default function Pen({onClick}:props){

    return <Image className={classes.pen} src={PenImg} height={15} width={15} alt="pen" onClick={()=>onClick()}/>
}