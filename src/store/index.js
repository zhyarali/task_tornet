import { createStore } from 'vuex'

export default createStore({
  state: {
    counter:0,
    token:'',
    user:{},
    department:{}
  },
  getters: {
    isLoggedIn(state){
      return state.token
    },
    getUser(state){
      return state.user
    },
    getDepartment(state){
      return state.department
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    },
    SET_DEPARTMENT: (state, department) => {
      state.department = department;
    },

  },
  actions: {
   login({commit},token,user){


    commit('SET_TOKEN', token);
    commit('SET_USER', user);
   },

   getDepartment({commit,dispatch},department){
      commit('SET_DEPARTMENT',department)
   }



  },
  modules: {
  }
})
