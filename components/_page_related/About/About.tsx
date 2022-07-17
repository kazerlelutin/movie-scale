import OgBalise from "../../OgBalise/OgBalise";
import Layout from "../../_layouts/Layout";
import classes from "./About.module.css";

export default function About() {
  return (
    <Layout
      ogBalise={() => (
        <OgBalise
          title={"À propos"}
          description={
            "Sources de données. boite à outils. Ne necessitant pas de compte, respecte la vie privée."
          }
        />
      )}
    >
      <main className={classes.container}>
        <div className={classes.page}>
          <h1 className="title">À propos</h1>
          <section>
            <h2>Source de revenus</h2>
            Le <span className="bold">Movie Scale</span> {"n'affiche "}
            <span className="bold">aucune publicité</span> et{" "}
            <span className="bold">ne collecte aucune donnée personnelle</span>
            {" "}autre que votre adresse email (si vous vous inscrivez).
            {
              " Le fonctionnement de l'application à un coût qui accroît en fonction du nombre d'utilisateur et de l'ajout de services"
            }
            . Pour
            <span className="bold"> soutenir et financer</span> le{" "}
            <span className="bold">F() Store</span>, vous pouvez souscrire via{" "}
            <a
              href="https://ko-fi.com/kazerlelutin"
              target="_blank"
              rel="noreferrer"
            >
              Kofi
            </a>
            .
          </section>
          <section>
            <h2>Analyse de trafic</h2>
            {
              "Nous enregistrons les données de navigation. Pour suivre le trafic de l'application, nous utilisons "
            }
            <a href="https://fr.matomo.org/" target="_blank" rel="noreferrer">
              Matomo
            </a>
            . Ces données sont anonymes et nous hébergeons sur nos serveurs,
            notre propre instance Matomo. Ces données sont anonymes et nous
            hébergeons notre propre instance Matomo.
          </section>

          <section>
            <h2>Utilisation des cookies</h2>
            Les cookies servent uniquement à persister vos informations de
            sessions. Il sont nécessaires au fonctionnement du site uniquement
            si vous souhaitez vous authentifier. La consultation anonyme peut se
            faire sans cookie, cela {"n'a"} aucune incidence sur le
            fonctionnement normal du site dans ces conditions
          </section>
        </div>
      </main>
    </Layout>
  );
}
