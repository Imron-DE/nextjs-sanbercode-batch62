import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "", headers = {} } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });

  const fetchingData = useCallback(async ({ url = "", method = "GET", headers = {} } = {}) => {
    setData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));

    try {
      const response = await fetch(url, { method, headers }); // Perbaiki tanda kurung di sini
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
      fetchingData({ url: prefixUrl, headers: headers });
    }
  }, [prefixUrl, headers, fetchingData]);

  return { ...data };
};
