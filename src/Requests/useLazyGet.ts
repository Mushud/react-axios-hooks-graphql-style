import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { onCompleted, onError, } from './types'

function useLazyGet(
    url: string,
    headers?: {},
    onCompleted?: onCompleted,
    onError?: onError
) {
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState<AxiosError>();
   
    const [header,] = useState(headers);

    const refetch = () =>
        makeRequest();
        
    const makeRequest = useCallback((): any => {
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
    }, [])

    return {makeQuery: ()=> makeRequest(),  loading, data: response, error, refetch: () =>refetch() };
}

export default useLazyGet;