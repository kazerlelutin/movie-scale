import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import classes from "./Nickname.module.css";
import { CSSTransition } from "react-transition-group";
import UserModale from "../UserModale/UserModale";
import getNickname from "../../utils/getNickname";

export default function Nickname() {
  const { data: session } = useSession(),
    [show, setShow] = useState<boolean>(false),
    ref = useRef(null);

  function handleClose() {
    setShow(false);
  }

  return (
    <div className={classes.container}>
      <div ref={ref}>
        {show ? (
          <button  onClick={handleClose} >Fermer</button>
        ) : (
          <button className={classes.nickname} onClick={() => setShow(true)}>
            {getNickname(session)}
          </button>
        )}
      </div>

      {session && (
        <CSSTransition
          in={show}
          timeout={200}
          classNames="alert"
          unmountOnExit
          mountOnEnter
        >
          <UserModale
            user={session.user}
            parentRef={ref}
          />
        </CSSTransition>
      )}
    </div>
  );
}
