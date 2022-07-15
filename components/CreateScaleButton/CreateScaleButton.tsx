/* eslint-disable react-hooks/exhaustive-deps */
import useLazyFetch from "../../hooks/useLazyFetch";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import LoginModale from "../LoginModale/LoginModale";
import { useRouter } from "next/router";
import Loader from "../_ui/Loader/Loader";

export default function CreateScaleButton() {
  const { data: session } = useSession(),
    router = useRouter(),
    { data, loading, api } = useLazyFetch("/scale/create"),
    [isOpen, setIsOpen] = useState(false);

  async function handleclick() {
    if (session) {
      api({});
    } else {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    if (data) {
      router.push("/scale/" + data);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <button onClick={handleclick}>Créer une échelle</button>
      )}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="alert"
        unmountOnExit
        mountOnEnter
      >
        <LoginModale onClose={() => setIsOpen(false)} title={"Se connecter"} />
      </CSSTransition>
    </>
  );
}
