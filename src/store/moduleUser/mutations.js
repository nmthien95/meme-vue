import Vue from "vue";
import { CONFIG_ACCESS_TOKEN } from "../../constants";
export default {
  SET_USER_INFO(state, user) {
    Vue.set(state.users, user.USERID, user);
  },
  SET_USER_POST(state, { posts, userid }) {
    Vue.set(state.posts, userid, posts);
  },
  SET_LOGIN_INFO(state, { user = null, token = "" }) {
    localStorage.setItem("ACCESS_TOKEN", token);
    state.ACCESS_TOKEN = token;
    state.currentUser = user;
  },
  SET_LOGOUT(state) {
    state.ACCESS_TOKEN = "";
    state.currentUser = null;
    localStorage.removeItem("ACCESS_TOKEN");
  }
  // SET_USER_POSTS(state, { posts, userid }) {
  //     Vue.set(state.posts, userid, posts);
  // },

  // SET_CURRENT_USER(state, user) {
  //     state.currentUser = user;
  // }
};
