export default {
  namespaced: true,
  state: {
    auth: {},
    isAuth: false,
    user: null,
  },
  getters: {
    auth(state) {
      return state.isAuth
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    setAuth(state, {auth, user, isAuth}) {
      state.auth = auth;
      state.isAuth = isAuth
      state.user = user
    }
  },
  actions: {
    auth({ commit }, {auth, user}) {
      commit('setAuth', {auth, user, isAuth: true})
    },
    logOut({ commit }) {
      commit('setAuth', {auth: {}, user: {}, isAuth: false})
    }
  }
}
