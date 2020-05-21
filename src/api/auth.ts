import request from '@/helpers/request'
import { ElLoadingComponent } from 'element-ui/types/loading'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}

type User = {
  username: string | number
  password: string | number
}

export default {
  register({ username, password }: User) {
    return request(URL.REGISTER, 'POST', { username, password })
  },
  login({ username, password }: User) {
    return request(URL.LOGIN, 'POST', { username, password })
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo() {
    return request(URL.GET_INFO)
  }
}