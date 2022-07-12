/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(
  url: string,
  body?: object
) {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState<AxiosError>(),
    [data, setData] = useState<any>();

  async function handleFetch() {
    setLoading(true);
    try {
      const { data: res } = await axios.post("/api" + url, body || {});
      setData(res);
    } catch (e) {
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return {
    loading,
    error,
    data,
    refetch: handleFetch,
  };
}
