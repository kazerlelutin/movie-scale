import CreateScaleButton from "../../CreateScaleButton/CreateScaleButton";
import Layout from "../../_layouts/Layout";
import classes from "./Index.module.css";

export default function Index() {
    /**
     * Le bouton crééer une échelle ouvre la modale de login affiche un message avec une flèche qui pointe sur logging
     */
  return (
    <Layout>
      <div className={classes.container}>
        <header className={classes.header}>
          <CreateScaleButton/>
          <div className="description">
            Un échelle permet de classer des films par ordre de préférence
          </div>
          <input className={classes.header} type="text" placeholder="Rechercher une échelle" />
        </header>
        <section className="scales">Les échelles populaires</section>
      </div>
    </Layout>
  );
}
