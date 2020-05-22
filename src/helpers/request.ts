import axios from 'axios'
import { Message, Option } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = "application/x-ww-form-urlencoded"
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'
// 前端在githubPages上但后端不在，跨域不会返回鉴权的cookie，`withCredentials` 表示跨域请求时是否需要使用凭证（cookie）
axios.defaults.withCredentials = true


export default function request(url = '', type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option: any = {
      url,
      method: type,
      params: null,
      data: null
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then((res: any) => {
      if (res.data.status === 'ok') {
        resolve(res.data)
      } else {
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch((err: Error) => {
      Message.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}