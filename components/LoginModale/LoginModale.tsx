import FullScreenModale from "../_ui/FullScreenModale/FullScreenModale";
import classes from "./LoginModale.module.css";
import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import MiniToast from "../_ui/MiniToast/MiniToast";

interface props {
  readonly onClose: Function;
  readonly title: string;
}

export default function LoginModale({ onClose, title }: props) {
  const label = "Email:",
    [email, setEmail] = useState(""),
    [resume, setResume] = useState(""),
    ref = useRef(null);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!email) {
      setResume("Vous devez entrer une adresse email !");
    } else {
        //même action pour les 2
      await signIn("email", { email });
    }
  }
  return (
    <FullScreenModale onClose={onClose}>
      <form className={classes.container} onSubmit={handleSubmit} ref={ref}>
        <div className="title">{title}</div>
        <label
          htmlFor="email"
          className={classes.label}
          data-alert={label !== resume}
        >
          email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onFocus={() => setResume("")}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="description">Vous allez recevoir un email vous permettant de vous connecter.</div>
        <button type="submit">Se connecter</button>
        {resume && (
          <MiniToast
            text={resume}
            onClose={() => setResume("")}
            parentRef={ref}
          />
        )}
      </form>
    </FullScreenModale>
  );
}
