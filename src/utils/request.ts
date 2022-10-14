import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { TRequestConfig } from './types/type'

class TRequest {
  instance: AxiosInstance
  constructor(config: TRequestConfig) {
    this.instance = axios.create(config)

    /**-----全局拦截器-----*/
    this.instance.interceptors.request.use((config: TRequestConfig) => {
      console.log('请求拦截成功');
      return config
    }, err => {
      console.log('请求拦截失败');
      return err
    })

    this.instance.interceptors.response.use((res: AxiosResponse) => {
      console.log('响应拦截成功');
      return res.data
    }, err => {
      console.log('响应拦截失败');
      return err
    })
    /**-----全局拦截器-----*/

    /**-----局部拦截器-----*/
    // 因为use方法传入的参数是可选的
    // 我们不需要使用类型缩小
    // 使用可选链即可（没有返回undefined）
    // if(config.interceptors){}
    // this.instance.interceptors.request.use(
    //   config.interceptors?.requestSuccessful,
    //   config.interceptors?.requestFailure
    // )

    // this.instance.interceptors.response.use(
    //   config.interceptors?.responseSuccessful,
    //   config.interceptors?.responseSuccessful
    // )
    /**-----局部拦截器-----*/
  }

  /**-----单次拦截器-----*/
  request<T = any>(config: TRequestConfig<T>) {
    if (config.interceptors?.requestSuccessful) {
      config = config.interceptors.requestSuccessful(config)
    }

    // 默认拿到的res是unknown类型
    // 我们想要明确知道res的类型,而且每一个请求拿到的res类型都是不一样的
    // 所以我们可以使用泛型,不同的请求传不同的泛型变量
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.responseSuccessful) {
          res = config.interceptors.responseSuccessful(res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  /**-----单次拦截器-----*/

  get<T = any>(config: TRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: TRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: TRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: TRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}


export default TRequest