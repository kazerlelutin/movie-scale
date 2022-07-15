/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./MiniToast.module.css";
import { useRef, useEffect } from 'react';

export default function MiniToast({parentRef,onClose,text}){
    const toastRef = useRef(null);

    function getPosition(){
        
        if(parentRef){
            toastRef.current.style.top = 30 +parentRef.current.offsetHeight  + parentRef.current.offsetTop +"px"
            toastRef.current.style.left = parentRef.current.offsetLeft +"px"
            toastRef.current.style.width =(  parentRef.current.offsetWidth) +"px"
        }
    }

    useEffect(()=>{
        getPosition()
    },[parentRef])
    return <div className={classes.container} ref={toastRef}>
        {text}
        <div className="cross" onClick={()=>onClose()}></div>
    </div>

}