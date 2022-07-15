/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "../../types/User.interface";
import classes from "./UserModale.module.css";
import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";

import NicknameInput from "../NicknameInput/NicknameInput";

interface props {
  readonly user: User;
  readonly parentRef: any;
}

export default function UserModale({ user, parentRef }: props) {
  const ref = useRef(null),
    { data: session } = useSession();

  useEffect(() => {
    const topPosition =
      parentRef.current.offsetTop + parentRef.current.offsetHeight + 10;
    ref.current.style.top = `${topPosition}px`;
  }, []);

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.nickname}><NicknameInput/></div>
      <div className={classes.email}>{user.email}</div>

      <div className={classes.deco} onClick={() => signOut()}>
        Se déconnecter
      </div>
    </div>
  );
}
