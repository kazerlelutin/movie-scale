import classes from "./ScalePage.module.css";
import Layout from "../../_layouts/Layout";
import Scale from "../../Scale/Scale";
import useLevels from "../../../hooks/useLevels";
import MovieCount from "../../MovieCount/MovieCount";
import TrashForMovie from "../../TrashForMovie/TrashForMovie";
import TitleScale from "../../TitleScale/TitleScale";
import StarOnScale from "../../StarOnScale/StarOnScale";
import OgBalise from "../../OgBalise/OgBalise";
import getNickname from "../../../utils/getNickname";

interface props {
  readonly name: string;
  readonly id: string;
  readonly author: string;
  readonly ownerId: string;
}

export default function ScalePage({ name, author, id, ownerId }: props) {
  const { levels, addMovie, createLevel, removeMovie } = useLevels();

  return (
    <Layout
      ogBalise={() => (
        <OgBalise
          description={`Consutez ce classment de films`}
          title={`${name} - ${author}`}
        />
      )}
    >
      <div className={classes.container}>
        <div className={classes.title}>
          <TitleScale scaleId={id} name={name} ownerId={ownerId} />
          <h2>{author}</h2>
          <div className={classes.details}>
            <MovieCount levels={levels} />
            <div className={classes.separate}>{"-"}</div>
            <StarOnScale scaleId={id} />
          </div>
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
        <TrashForMovie removeMovie={removeMovie} scaleId={id} />
      </div>
    </Layout>
  );
}
