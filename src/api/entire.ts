import { t1 } from "../main";

export function getEntireListData() {
  t1.request({
    url: '/home/multidata',
    params: {
      offset: 0,
      size: 20
    },
    interceptors: {
      requestSuccessful: (config) => {
        console.log("/home/multidata请求成功的拦截")
        return config
      },
      requestFailure: (config) => {
        console.log("/home/multidata请求失败的拦截")
        return config
      },
      responseSuccessful: (res) => {
        console.log("/home/multidata响应成功的拦截")
        return res
      },
      responseSFailure: (config) => {
        console.log("/home/multidata响应失败的拦截")
        return config
      },
    }
  })
}