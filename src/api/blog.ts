import request from '@/helpers/request.ts'
import dayjs from 'dayjs'

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
    return request(URL.GET_LIST, 'GET', { page, userId, atIndex }).then((res: any) => {
      res.data = res.data.filter((i: any) => {
        return dayjs(i.createdAt) > dayjs("2020-05-22T12:35:09.836Z")
      })
      res.total = res.total - 864
      res.totalPage = res.totalPage - 86
      res.data = res.data.filter((i: any) => {
        return i.id = i.id - 3795
      })
      return res
    })
  },
  getIndexBlogs({ page = 1 } = { page: 1 }) {
    return this.getBlogs({ page, atIndex: true })
  },
  getBlogsByUserId(userId: any, { page = 1, atIndex }: any = { page: 1 }, ) {
    return this.getBlogs({ userId, page, atIndex })
  },
  getDetail({ blogId }: any) {
    return request(URL.GET_DETAIL.replace(':blogId', blogId + 3795))
  },
  updateBlog({ blogId }: any, { title, content, description, atIndex }: any) {
    return request(URL.UPDATE.replace(':blogId', blogId + 3795), 'PATCH', { title, content, description, atIndex })
  },
  deleteBlog({ blogId }: any) {
    return request(URL.DELETE.replace(':blogId', blogId + 3795), 'DELETE')
  },
  createBlog({ title = "", content = "", description = "", atIndex = true }: any = { title: '', content: '', description: '', atIndex: true }) {
    return request(URL.CREATE, 'POST', { title, content, description, atIndex })
  }
}