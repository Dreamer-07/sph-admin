import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    console.log(111111)
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
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
      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }
      const { name, avatar } = data

      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

