import { typeOfConsent } from "../../types/typeOfConsent.interface";
import classes from "./Consent.module.css";

export default function Consent({ setter }) {
  return (
    <div className={classes.box}>
      <section className={classes.container}>
        <div className="title">Nous utilisons des cookies</div>
        <article className={classes.article}>
          <div className={classes.subtitle}>Pour Votre session</div>
          <p>
            Si vous vous connectez à <span className="bold">Movie Scale</span>, 
            Vous acceptez les cookies nécessaires pour maintenir votre session active.
          </p>
          <p>
            Nous ne collectons que votre adresse email. 
          </p>
        </article>
        <article className={classes.article}>
          <div className={classes.subtitle}>Pour les statistiques</div>
          <p>Nous enregistrons les données de navigation.</p>
          <p>
          {"Pour suivre le trafic de l'application, nous utilisons "}
            <a href="https://fr.matomo.org/" target="_blank" rel="noreferrer">
              Matomo
            </a>
            .
          </p>
          <p>
            Ces données sont anonymes et nous hébergeons sur nos serveurs, notre
            propre instance Matomo.
          </p>
        </article>
        <article className={classes.article}>
          <div className={classes.subtitle}>Vous avez le choix</div>
          <div className={classes.buttons}>
            <div>Quittez le Movie Scale</div>
            <button onClick={()=>setter(typeOfConsent.NO_CONSENT)} >Refuser les cookies</button>
            <button onClick={()=>setter(typeOfConsent.CONSENT)}>Accepter les cookies</button>
          </div>
        </article>
      </section>
    </div>
  );
}
