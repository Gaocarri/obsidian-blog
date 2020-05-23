# Vuejs 黑曜石共享博客项目

# 接口测试

1. 用户注册(`POST /auth/register`)

```bash
# -d 是用来传递数据
# 对于 POST 和 PUT 可以：  -X POST， 对于 GET，不加 -X
curl -d "username=carrigao1&password=123456" -X POST "http://localhost:3000/auth/register"
```

2. 用户登录(`POST /auth/login`)

```
# -i 可以展示响应头
# 会发现响应头里有 setCookie 信息，得到 cookie

curl -d "username=hunger1&password=123456" -X POST "http://localhost:3000/auth/login" -i
```

3. 是否登录（`GET /auth`）

```
#先通过登录接口获取 cookie，带上 cookie 就能测试登录

curl "http://localhost:3000/auth" -b "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV1ZsozMvZYWC6s"
```

4. 注销（`GET /auth/logout`）

```
curl "http://localhost:3000/auth/logout" -b "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV1ZsozMvZYWC6s"
```

5. 获取博客列表(`GET /blog`)

```
curl "http://localhost:3000/blog?page=1&userId=1"
curl "http://localhost:3000/blog?page=1"
curl "http://localhost:3000/blog"
```

6. 创建博客`POST /blog`

```
curl -d "title=hello&content=world&description=jirengu" -X POST "http://localhost:3000/blog" -b "connect.sid=s%3AdyZh-z5fqPU_ThG9Qn8nGD6euI0UI75e.8uso0k4P6WzqWv02iQCUwxbUML2RdlOCnpKp7RSJpj0"
```

# 路由管理

````typescript
const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user',
    component: User
  }
]
````

# 引入element-ui

1. 安装

```typescript
yarn add element-ui
```

2. 在main.ts中引用

```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

3. 也可按需引入 参考官网文档：[element文档](https://element.eleme.io/#/zh-CN/component/quickstart)

4. 参照文档使用

#  引入axios

1. 安装

```bash
yarn add axios
```

2. 封装request.ts

```typescript
import axios from 'axios'
import { Message, Option } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = "application/x-ww-form-urlencoded"
axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'
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
```

3. 分别封装接口api

* auth.ts

```
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
```

* blog.ts

```
import request from '@/helpers/request.ts'

const URL = {
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId'
}

export default {
  getBlogs({ page = 1, userId, atIndex }: any = { page: 1 }) {
    // 修改了
    return request(URL.GET_LIST, 'GET', { page, userId, atIndex })
  },
  getIndexBlogs({ page = 1 } = { page: 1 }) {
    return this.getBlogs({ page, atIndex: true })
  },
  getBlogsByUserId(userId: any, { page = 1, atIndex }: any = { page: 1 }, ) {
    return this.getBlogs({ userId, page, atIndex })
  },
  getDetail({ blogId }: any) {
    return request(URL.GET_DETAIL.replace(':blogId', blogId))
  },
  updateBlog({ blogId }: any, { title, content, description, atIndex }: any) {
    return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex })
  },
  deleteBlog({ blogId }: any) {
    return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
  },
  createBlog({ title = "", content = "", description = "", atIndex = true }: any = { title: '', content: '', description: '', atIndex: true }) {
    return request(URL.CREATE, 'POST', { title, content, description, atIndex })
  }
}
```

# Vuex

1. vuex的异步方法

```typescript
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // auth
    user: null,
    isLogin: false,
  },
  mutations: {
    // auth
    setUser(state, payload) {
      state.user = payload.user
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    // auth
    login({ commit }, { username, password }) {
      return auth.login({ username, password }).then((res: any) => {
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
      })
    },
    async register({ commit }, { username, password }) {
      let res: any = await auth.register({ username, password })
      commit('setUser', { user: res.data })
      commit('setLogin', { isLogin: true })
      return res.data
    },
    async logout({ commit }) {
      await auth.logout()
      commit('setUser', { user: null })
      commit('setLogin', { isLogin: false })
    },
    async checkLogin({ commit, state }) {
      if (state.isLogin) return true
      let res: any = await auth.getInfo()
      commit('setLogin', { isLogin: res.isLogin })
      if (!res.isLogin) return false
      commit('setUser', { user: res.data })
      return true
    }
  }
})
```

2. 登录注册时直接调用相应方法即可

# 进入路由前判断是否已登录

1. 使用路由原信息，参考官网

```
  {
    path: '/my',
    component: My,
    meta: { requiresAuth: true }
  },
```

```
router.beforeEach((to, from, next) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin => {// 不能用store.state.login，因为此时headerNav是异步执行的，还没有给store设置
      if (!isLogin) {// 如果没有登录
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保调用了next()
  }
})
```

# 自定义插件

1. 定义一个ts文件utils

```typescript
function friendlyDate(dateStr: any) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    case space < 60000:
      str = "刚刚"
      break
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + '分钟前'
      break
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
  }
  return str
}

export default {
  install(Vue: any, options: any) {
    Vue.prototype.friendlyDate = friendlyDate
  }
}
```

2. main.ts中引入

```
import util from '@/helpers/util'

Vue.use(util)
```

3. 其他任意地方

```
<p>{{friendlyDate(createdAt)}}<p>
```

