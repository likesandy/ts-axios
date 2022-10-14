import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface TInterceptors<T = AxiosResponse> {
  requestSuccessful?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  requestFailure?: (err: any) => any,
  responseSuccessful?: (res: T) => T,
  responseSFailure?: (err: any) => any,
}

export interface TRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TInterceptors<T>
}