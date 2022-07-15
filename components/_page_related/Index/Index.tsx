import CreateScaleButton from "../../CreateScaleButton/CreateScaleButton";
import PopularScales from "../../PopularScales/PopularScales";
import Layout from "../../_layouts/Layout";
import classes from "./Index.module.css";

export default function Index() {
  return (
    <Layout>
      <div className={classes.container}>
        <header className={classes.header}>
          <CreateScaleButton />
          <div className="description">
            Un échelle permet de classer des films par ordre de préférence
          </div>
          {/* <input className={classes.header} type="text" placeholder="Rechercher une échelle" /> */}
        </header>
        <section className={classes.scales}>
          <div className="title">Les échelles populaires</div>
          <PopularScales />
        </section>
      </div>
    </Layout>
  );
}
