import Vue from 'vue';
import { CONFIG_ACCESS_TOKEN } from '../../constants';
export default {
    // increment (state) {
    //     state.count++
    // }
    SET_USER_INFO(state, user) {
        Vue.set(state.users, user.USERID, user);
    },
    SET_USER_POSTS(state, { posts, userid }) {
        Vue.set(state.posts, userid, posts);
    },
    SET_LOGOUT(state) {
        state[CONFIG_ACCESS_TOKEN] = '';
        state.currentUser = null;
        localStorage.removeItem(CONFIG_ACCESS_TOKEN);
    },
    SET_LOGIN_INFO(state, { user = null, token = '' }) {
        // xs
        localStorage.setItem(CONFIG_ACCESS_TOKEN, token);
        state[CONFIG_ACCESS_TOKEN] = token;
        state.currentUser = user;
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    }
}