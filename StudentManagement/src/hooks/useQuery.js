import { delay } from "../utils/delay";
import { localStorageCache, sessionStorageCache } from "../utils/cache";
import { CanceledError } from "axios";
import { useEffect, useRef, useState } from "react";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
};

const _asyncFunction = {
  // key: Promise
};

export const useQuery = ({
  queryKey,
  queryFn,
  cacheTime,
  enabled = true,
  keepPreviousData = false,
  dependencyList = [],
  limitDuration,
  storeDriver = "localStorage",
} = {}) => {
  const dataRef = useRef({});
  const cache = _cache[storeDriver];
  const refetchRef = useRef();
  const [loading, setLoading] = useState(enabled);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const cacheName = Array.isArray(queryKey) ? queryKey[0] : queryKey;
  const controllerRef = useRef(new AbortController());

  // useEffect(() => {
  //   if (typeof refetchRef.current === "boolean") {
  //     refetchRef.current = true;
  //   }
  // }, dependencyList);

  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled].concat(queryKey));

  const getCacheDataOrPreviousData = () => {
    if (cacheName) {
      if (keepPreviousData && dataRef.current[cacheName]) {
        return dataRef.current[cacheName];
      }

      if (_asyncFunction[cacheName]) {
        return _asyncFunction[cacheName];
      }

      return cache.get(queryKey);
    }
  };

  const setCacheDataOrPreviousData = (data) => {
    if (keepPreviousData) {
      dataRef.current[cacheName] = data;
    }

    if (cacheName && cacheTime) {
      let expired = cacheTime;
      if (cacheTime) {
        expired += Date.now();
      }
      cache.set(cacheName, data, expired);
    }
  };

  const fetchData = async (...args) => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
    const startTime = Date.now();
    const endTime = Date.now();

    let res;
    let error;
    try {
      setLoading(true);
      setStatus("pending");

      if (limitDuration) {
        let timeOut = endTime - startTime;
        if (timeOut < limitDuration) {
          await delay(limitDuration - timeOut);
        }
      }

      res = getCacheDataOrPreviousData();
      // if (cacheName) delete _asyncFunction(cacheName)

      if (!res) {
        res = queryFn({ signal: controllerRef.current.signal, params: args });
        if (cacheName) {
          _asyncFunction[cacheName] = res;
        }
      }

      if (res instanceof Promise) {
        res = await res;
      }

      if (res) {
        res = await res;
      }

      setStatus("success");
      setData(res);

      setCacheDataOrPreviousData(res);
      refetchRef.current = false;
      setLoading(false);

      return res;
    } catch (err) {
      // console.log(err);
      if (error instanceof CanceledError) {
      } else {
        // error = err;
        setError(err);
        setStatus("error");
        setLoading(false);
        throw err;
      }
    }
  };

  const clearPreviousData = () => {
    dataRef.current = {};
  };
  return {
    loading,
    error,
    data,
    status,
    refetch: fetchData,
    clearPreviousData,
  };
};
