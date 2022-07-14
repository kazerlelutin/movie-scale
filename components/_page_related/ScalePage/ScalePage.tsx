import classes from "./ScalePage.module.css";
import Layout from "../../_layouts/Layout";
import Scale from "../../Scale/Scale";
import useLevels from "../../../hooks/useLevels";
import MovieCount from "../../MovieCount/MovieCount";
import Trash from "../../_ui/Trash/Trash";

interface props {
  readonly name: string;
  readonly id: string;
  readonly author: string;
  readonly ownerId: string;
}

export default function ScalePage({ name, author, id, ownerId }: props) {
  const { levels, addMovie, createLevel,removeMovie } = useLevels();

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1 className="title">
            <div className={classes.scaleName}>{name}</div>
          </h1>
          <h2>{author}</h2>
          <MovieCount levels={levels} />
        </div>
        <div className={classes.scaleContainer}>
          <div className={classes.scale} id="scale">
            <Scale
              scaleId={id}
              ownerId={ownerId}
              levels={levels}
              addMovie={addMovie}
              createLevel={createLevel}
            />
          </div>
        </div>
        <Trash removeMovie={removeMovie} scaleId={id}/>
      </div>
    </Layout>
  );
}
