import { useState } from "react";
import classes from "./LoginButton.module.css";
import { CSSTransition } from "react-transition-group";
import LoginModale from "../LoginModale/LoginModale";

export default function Login() {
  const
     [typeOfConnect, setTypeOfConnect] = useState(""),
    [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div className={classes.container} onClick={() => setShow(!show)}>
        <button
          className={classes.connect}
          onClick={() => setTypeOfConnect("Connexion")}
        >
          Se connecter
        </button>
        <button
          onClick={() => setTypeOfConnect("Créer un compte")}
        >{`S'enregistrer`}</button>
      </div>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="alert"
        unmountOnExit
        mountOnEnter
      >
        <LoginModale onClose={() => setShow(false)} title={typeOfConnect} />
      </CSSTransition>
    </>
  );
}
