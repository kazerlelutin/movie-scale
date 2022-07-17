import CreateScaleButton from "../../CreateScaleButton/CreateScaleButton";
import OgBalise from "../../OgBalise/OgBalise";
import PopularScales from "../../PopularScales/PopularScales";
import Layout from "../../_layouts/Layout";
import classes from "./Index.module.css";
import Link from 'next/link';

export default function Index() {
  return (
    <Layout ogBalise={()=><OgBalise/> }>
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
        <footer className={classes.links}>
          <Link href={'/about'}>{"A propos"}</Link>
          <Link href={'/legal'}>{"Mentions légales"}</Link>
        </footer>
      </div>
    </Layout>
  );
}
