import { createStore } from 'vuex';
const state = {
  users: [],
  sesion: false,
  usuarioLogeado: [],
  showRegistrationForm: false,
};
const mutations = {
  addUser(state, user) {
    state.users.push(user);
  },
  login(state,userlog) {
    state.sesion = true;
    state.usuarioLogeado = userlog;
  },
  logout(state) {
    state.sesion = false;
  },
  SET_SHOW_REGISTRATION_FORM(state, value) {
    state.showRegistrationForm = value;
  },
};
const actions = {
  registerUser({ commit }, user) {
    commit('addUser', user);
  },
  loginUser({ commit }, userlog) {
    commit('login',userlog);
  },
  logoutUser({ commit }) {
    commit('logout');
  },
  toggleRegistrationForm({ commit }, value) {
    commit('SET_SHOW_REGISTRATION_FORM', value);
  },
};
const getters = {
  getUsers(state) {
    return state.users;
  },
  getSesion(state) {
    return state.sesion;
  },
  getUserLog(state){
    return state.usuarioLogeado;
  },
  showRegistrationForm(state){
    return state.showRegistrationForm;
  }
};
export default createStore({
  state,
  mutations,
  actions,
  getters,
});