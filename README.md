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

