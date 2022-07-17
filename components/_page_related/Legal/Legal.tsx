import OgBalise from "../../OgBalise/OgBalise";
import Layout from "../../_layouts/Layout";
import classes from "./Legal.module.css";

export default function Legal() {
  return (
    <Layout
      ogBalise={() => (
        <OgBalise
          title={"Mentions légales"}
          description={
            "Mentions légales. boite à outils. Ne necessitant pas de compte, respecte la vie privée."
          }
        />
      )}
    >
      <main className={classes.container}>
        <div className={classes.page}>
          <h1>Mentions légales</h1>
          <section>
            <h2>Éditeur</h2>
            Le site <span className="bold">kazerlelutin.space</span> (et plus
            spécifiquement{" "}
            <span className="bold">movie-space.kazerlelutin.space</span>) est
            édité Benoist Bouteiller. Les liens de contact sont disponibles via{" "}
            <a href="https://linktr.ee/kazerlelutin" rel="cc:morePermissions">
              linktr.ee
            </a>
            .
          </section>
          <section>
            <h2>Hébergeurs</h2>
            Le <span className="bold">Movie Scale</span> est hébergé chez{" "}
            <a
              href="https://vercel.com/contact"
              target="_blank"
              rel="noreferrer"
            >
              Vercel
            </a>
            . Une partie des services annexes sont hébergés chez{" "}
            <a href="https://www.o2switch.fr/" target="_blank" rel="noreferrer">
              O2Switch
            </a>
            .
          </section>
          <section>
              <h2>{"Sources du logiciel"}</h2>
              Vous pouvez consulter les sources sur <a href="https://github.com/kazerlelutin/movie-scale" target="_blank" rel="noreferrer">
              Github
            </a>. La partie gérant les emails est aussi disponible sur <a href="https://github.com/kazerlelutin/movie-scale-hooks" target="_blank" rel="noreferrer">
              Github
            </a>.
          </section>
        </div>
      </main>
    </Layout>
  );
}
