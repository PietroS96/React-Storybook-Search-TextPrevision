import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useSearch = (query) => {
  const [state, setState] = useState({
    articles: [],
    status: "IDLE",
    error: "",
  });

  const cancelToken = useRef(null);

  useEffect(() => {
    if (query.length < 3) {
      return;
    }

    if (cancelToken.current) {
      cancelToken.current.cancel();
    }

    cancelToken.current = axios.CancelToken.source();

    axios
      .get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}`, {
        cancelToken: cancelToken.current.token,
      })
      .then(function (response) {
        const parsedResponse = [];

        for (let i = 0; i < response.data[1].length; i++) {
          parsedResponse.push({
            id: response.data[3][i],
            label: response.data[1][i],
          });
        }
        setState({
          articles: parsedResponse,
          status: "SUCCESS",
          error: "",
        });
      })
      .catch(function (error) {
        // handle error
        if (axios.isCancel(error)) {
          return;
        }
        setState({
          articles: [],
          status: "ERROR",
          error: error,
        });
      });
  }, [query]);

  return state;
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebauncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebauncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSearchForm = () => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (e) => setSearchValue(e.target.value);

  return {
    searchValue,
    onSearchChange,
  };
};
