import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [], // 用户可以使用的按钮
    routes: [], // 用户可以访问的路由
    roles: [], // 用户的角色
    canVisitRoutes: [] // 可以访问的路由配置
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    // 获取可以访问的路由配置信息
    state.canVisitRoutes = constantRoutes.concat(filterInvalidRoutes(userInfo.routes))
    // 添加新路由
    router.addRoutes(state.canVisitRoutes)
    Object.assign(state, userInfo)
  }
}

const actions = {
  // 用户登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password })
    if (result.code === 20000) {
      const { token } = result.data
      commit('SET_TOKEN', token)
      setToken(token)
      return Promise.resolve('success')
    } else {
      return Promise.reject('faild')
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)
    if (result.code === 20000) {
      const { data } = result
      commit('SET_USERINFO', data)
      return Promise.resolve('scuuess')
    } else {
      return Promise.reject('faild')
    }
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout(state.token)
    if (result.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return Promise.resolve('success')
    } else {
      return Promise.reject('faild')
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

/*
* targetRouters - 需要过滤的数组
* */
const filterInvalidRoutes = function(targetRoutes, ar = asyncRoutes) {
  return ar.filter(item => {
    if (item.children && item.children.length > 0) {
      item.children = filterInvalidRoutes(targetRoutes, item.children)
    }
    return targetRoutes.indexOf(item.name) !== -1
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

