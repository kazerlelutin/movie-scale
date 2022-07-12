import classes from "./Loader.module.css";

export default function Loader(){
    return <div className={classes.container} data-testid="mug">
        <div className={classes.mugContainer}>
            <div className={classes.mug}>
                <div className={classes.coffee}/>
            </div>
        </div>
    </div>

}