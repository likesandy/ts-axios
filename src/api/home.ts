import { t1 } from "../main";

interface IHomeData {
  data: {}
  returnCode: string
  success: boolean
}

export function getHomeMultiData() {
  t1.request<IHomeData>({
    method: 'GET',
    url: '/home/multidata'
  }).then(res => {
    console.log(res);
  })
}
