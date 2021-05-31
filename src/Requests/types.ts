import { AxiosError, AxiosResponse } from "axios"



type RequestCallback = {
    onCompleted: (response: AxiosResponse) => AxiosResponse,
    onError: (error: AxiosError) => AxiosError
}



interface Response{
   request:any,
   response : {loading: boolean, data: any, error: AxiosError, refetch : any;
   }
}

type onCompleted = (response: AxiosResponse) => AxiosResponse
type onError = (response: AxiosError) => AxiosError

export {
    RequestCallback,
    onCompleted,
    onError,
    Response
}