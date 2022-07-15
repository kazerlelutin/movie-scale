import classes from "./TitleScale.module.css";
import { useMemo, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Pen from "../_ui/Pen/Pen";
import useLazyFetch from "../../hooks/useLazyFetch";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";

interface props {
  readonly name: string;
  readonly scaleId: string;
  readonly ownerId: string;
}
export default function TitleScale({ name, scaleId, ownerId }: props) {
  const [scaleName, setScaleName] = useState(name),
    [scaleNameInput, setScaleNameInput] = useState(name),
    [isInput, setIsInput] = useState(false),
    { data: session } = useSession(),
    isMyScale = useMemo(
      () => session && session.user.id === ownerId,
      [session, ownerId]
    ),
    { api, data, loading } = useLazyFetch("/scale/updateName");

  function handleReset() {
    setScaleNameInput(scaleName);
    setIsInput(false);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    api({ name: scaleNameInput, scaleId });
  }

  useEffect(() => {
    if (data) {
      setScaleName(data);
      setScaleNameInput(data);
      setIsInput(false);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <ToastLoading loading={loading} text="Modification du nom" />
      {isInput ? (
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            value={scaleNameInput}
            onChange={(e) => setScaleNameInput(e.target.value)}
          />
          <div className={classes.buttons}>
            <button type="reset" onClick={handleReset} disabled={loading}>
              Annuler
            </button>
            <button type="submit" disabled={loading}>
              Modifier
            </button>
          </div>
        </form>
      ) : (
        <h1 className="title">
          <div className={classes.name}>{scaleName}</div>
        </h1>
      )}

      {isMyScale && !isInput && <Pen onClick={() => setIsInput(true)} />}
    </div>
  );
}
