import dashboardApi from '@/api/dashboard'

const state = {
  dataList: []
}

const mutations = {
  GET_DATA(state, dataList) {
    state.dataList = dataList
  }
}

const actions = {
  async getDashboardDataList({ commit }) {
    const result = await dashboardApi.getDashboardDataList()
    commit('GET_DATA', result.data)
  }
}

export default {
  state,
  mutations,
  actions
}
