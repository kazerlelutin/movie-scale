/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./NicknameInput.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Pen from "../_ui/Pen/Pen";
import useLazyFetch from "../../hooks/useLazyFetch";
import ToastLoading from "../_ui/ToastLoading/ToastLoading";
import getNickname from "../../utils/getNickname";
import useDebounce from "../../utils/hooks/useDebounce copy";
import { useRouter } from 'next/router';

export default function NicknameInput() {
  const { data: session } = useSession(),
    [nickname, setNickname] = useState(getNickname(session)),
    [scaleNicknameInput, setNicknameInput] = useState(nickname),
    [errorMsg, setErrorMsg] = useState<string|null>(null),
    debounceNickname = useDebounce(scaleNicknameInput),
    [isInput, setIsInput] = useState(false),
    { api, data, loading, error } = useLazyFetch("/user/updateNickname"),
    router = useRouter();

  function handleReset() {
    setNicknameInput(nickname);
    setIsInput(false);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    api({ nickname: scaleNicknameInput });
  }

  useEffect(() => {
    debounceNickname;
  }, [debounceNickname]);

  useEffect(() => {
    if (data) {
      router.reload()
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorMsg(error.response.data);
    }
  }, [error]);

  return (
    <div className={classes.container}>
      <ToastLoading loading={loading} text="Modification du nom" />
      {isInput ? (
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            value={scaleNicknameInput}
            onChange={(e) => {
              setErrorMsg(null)
              setNicknameInput(e.target.value)}}
          />
          {errorMsg && <div className={classes.error}>{errorMsg}</div>}
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
        <div className={classes.name}>{nickname}</div>
      )}

      {!isInput && <Pen onClick={() => setIsInput(true)} />}
    </div>
  );
}
