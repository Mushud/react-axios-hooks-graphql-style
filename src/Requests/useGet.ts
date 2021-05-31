import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { onCompleted, onError } from './types'

function useGet(
    url: string,
    headers?: {},
    onCompleted?: onCompleted,
    onError?: onError
) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>();
    const [reload, setReload] = useState(false);
    const [error, setError] = useState<AxiosError>();
    const [header,] = useState(headers);

    const refetch = () =>
        setReload(!reload);


    const makeRequest = useCallback(() => {
        setLoading(true);
        setLoading(true);

        axios
            .get(url, {
                ...header
            })
            .then((response: AxiosResponse) => {
                setResponse(response?.data);
                setLoading(false);
                setError(undefined);
                onCompleted && onCompleted(response);
            })
            .catch((error: AxiosError) => {
                setResponse(undefined);
                setLoading(false);
                setError(error);
                onError && onError(error)
            });
    }, []);

    useEffect(() => {
        makeRequest()
    }, [url, header, reload]);

    return { loading, data: response, error, refetch: () => refetch() };
}

export default useGet;
