import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { onCompleted, onError, } from './types'

function usePost(
    url: string,
    headers?: {},
    onCompleted?: onCompleted,
    onError?: onError
) {
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>();
    const [variables, setVariables] = useState<any>({})
    const [error, setError] = useState<AxiosError>();

    const [header,] = useState(headers);

    const refetch = () =>
        makeRequest(variables);

    const makeRequest = useCallback((variables): any => {
        setLoading(true);
        setVariables(variables)
        axios
            .post(url, {
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
                onError && onError(error);
            });
    }, [])

    return { makePost: (v: any)=> makeRequest(v) , loading, data: response, error, refetch: () => refetch() };
}

export default usePost;