import { MockMethod } from 'vite-plugin-mock'

const userList = [
  {
    username: 'admin',
    password: '123',
    role: 'admin',
    introduction: '管理员',
    avatar: 'https://www.xyob.top/cube/cube01.bmp',
    email: 'admin@qq.com',
    createTime: '2021-06-10 20:41:18'
  },
  {
    username: 'editor',
    password: '456',
    role: 'editor',
    introduction: '搬砖码农',
    avatar: 'https://www.xyob.top/cube/cube02.bmp',
    email: 'editor@qq.com',
    createTime: '2021-06-10 20:41:18'
  },
  {
    username: 'xueyue',
    password: '123456',
    role: 'admin',
    introduction: '否定先生',
    avatar: 'https://www.xyob.top/icons/favicon.ico',
    email: 'xueyue@qq.com',
    createTime: '2021-06-10 20:41:18'
  }
]

const roleList = [
  { name: 'admin', description: '管理员', level: 0 },
  { name: 'editor', description: '编辑人员', level: 1 }
]

const userMockList: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }: any) => {
      let flag = -1
      userList.forEach((item, index) => {
        if (item.username === body.username && item.password === body.password) {
          flag = index
        }
      })
      if (~flag) {
        const data = {
          code: 0,
          message: '登录成功',
          token: new Date().getTime().toString(32),
          ...userList[flag]
        }
        return data
      } else {
        return {
          code: 40000,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    response: ({ query }: any) => {
      return {
        code: 0,
        message: 'success',
        data: query
      }
    }
  },
  {
    url: '/api/users',
    method: 'get',
    timeout: 500,
    response: ({ query }: any) => {
      const { page, page_size, username } = query
      const allList = userList.filter((item) => item.username === username || !username)
      const total = allList.length
      const list = allList.slice((page - 1) * page_size, page * page_size)
      return {
        code: 0,
        message: 'success',
        total,
        list,
        query
      }
    }
  },
  {
    url: '/api/users',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query
      return {
        code: 0,
        message: 'success',
        data: id
      }
    }
  },
  {
    url: '/api/roles',
    method: 'get',
    response: () => {
      const list = roleList
      return {
        code: 0,
        message: 'success',
        list
      }
    }
  }
]

export default userMockList
