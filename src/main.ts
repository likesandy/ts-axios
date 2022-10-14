// import { getEntireListData } from "./api/entire";
import { getHomeMultiData } from "./api/home"
import { BASE_URL, TIME_OUT } from "./config/config"
import TRequest from "./utils/request"

export const t1 = new TRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessful(config) {
      console.log('局部请求拦截成功');
      return config
    },
    requestFailure(err) {
      console.log('局部请求拦截失败');
      return err
    },
    responseSuccessful(res) {
      console.log('局部响应拦截成功');
      return res
    },
    responseSFailure(err) {
      console.log('局部响应拦截失败');
      return err
    }
  }
})

export const t2 = new TRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

getHomeMultiData()
// getEntireListData()


export { }
