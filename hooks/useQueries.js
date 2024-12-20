import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "" } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });
  const fetchingData = useCallback(async ({ url = "", method = "GET" } = {}) => {
    setData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));
    try {
      const response = await fetch(url, { method });
      const result = await response.json();
      setData((prevData) => ({
        ...prevData,
        data: result,
        isLoading: false,
      }));
    } catch (error) {
      setData((prevData) => ({
        ...prevData,
        isLoading: false,
        isError: true,
      }));
    }
  }, []);

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl });
    }
  }, [prefixUrl, fetchingData]);

  return { ...data };
};
