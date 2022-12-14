import axiosInstance from "../../plugins/axios";

import { parseJwt } from "../../helpers";
import { CONFIG_ACCESS_TOKEN } from "../../constants";

export default {
  async getUserbyId({ commit }, userId) {
    commit("SET_LOADING", true);
    try {
      const result = await axiosInstance.get(
        `/member/member.php?userid=${userId}`
      );
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        commit("SET_USER_INFO", result.data.user);
        return {
          ok: true,
          error: null,
          data: result.data.user
        };
      }
      return { ok: false, error: null };
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: result.data.error
      };
    }
  },
  async login({ commit, dispatch }, { email = "", password = "" }) {
    commit("SET_LOADING", true);
    try {
      let data = { email, password };
      const result = await axiosInstance.post("/member/login.php", data);

      commit("SET_LOADING", false);
      console.log("loginResult", result);
      if (result.data.status === 200) {
        commit("SET_USER_INFO", result.data.user);
        commit("SET_LOGIN_INFO", result.data);
        await dispatch("getListPostsByUserId", result.data.user.USERID);
        return {
          ok: true,
          error: null,
          data: result.data.user
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);

      console.log(error.message);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async logout({ commit }) {
    commit("SET_LOGOUT");
  },
  async checkLogin({ commit, dispatch }) {
    try {
      const tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
      const userObj = parseJwt(tokenLocal);
      console.log("userObj: ", userObj.id);
      if (userObj) {
        // hai api trên chạy riêng lẻ dùng pomise  all
        const pomiseUser = dispatch("getUserbyId", userObj.id);
        const promisePostUser = dispatch("getListPostsByUserId", userObj.id);
        const [resultUser, resulPostUser] = await Promise.all([
          pomiseUser,
          promisePostUser
        ]);

        if (resultUser.ok && resulPostUser.ok) {
          const data = { user: resultUser.data, token: tokenLocal };
          commit("SET_LOGIN_INFO", data);
          return { ok: true, error: null };
        }
      }
      return { ok: false, error: null };
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },

  async getListPostsByUserId({ commit }, userid) {
    try {
      const configs = {
        params: {
          userid
        },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      };
      const result = await axiosInstance.get(
        "/post/getListPostUserID.php",
        configs
      );
      if (result.data.status === 200) {
        const objData = {
          posts: result.data.posts,
          userid
        };
        commit("SET_USER_POST", objData);
        return {
          ok: true,
          posts: result.data.posts || [],
          error: null
        };
      }
      return {
        ok: false,
        error: null
      };
    } catch (error) {
      return {
        ok: false,
        data: data.result,
        error: error.message
      };
    }
  },
  async register({ commit, dispatch }, data) {
    commit("SET_LOADING", true);

    try {
      const result = await axiosInstance.post("/member/register.php", data);
      commit("SET_LOADING", false);
      console.log("register", result);
      if (result.data.status === 200) {
        const objLoginInfo = {
          user: result.data.user,
          token: result.data.token
        };
        commit("SET_USER_INFO", result.data.user);
        commit("SET_LOGIN_INFO", objLoginInfo);
        await dispatch("getListPostsByUserId", result.data.user.USERID);

        return { ok: true, error: null };
      }
      return { ok: false, error: result.data.error };
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        data: data.result,
        error: error.message
      };
    }
  },
  async updateProfile(
    { commit },
    { fullname = "", description = "", gender = "", objFile = null }
  ) {
    commit("SET_LOADING", true);
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("fullname", fullname);
      bodyFormData.append("description", description);
      bodyFormData.append("gender", gender);

      // Up Avatar
      if (objFile) {
        bodyFormData.append("avatar", objFile);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      };

      const result = await axiosInstance.post(
        "/member/update.php",
        bodyFormData,
        config
      );
      if (result.data.status === 200) {
        commit("SET_LOADING", false);
        commit("SET_CURRENT_USER", result.data.user);
        return {
          ok: true,
          user: result.data.user
        };
      } else {
        return {
          ok: false,
          error: error.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,

        error: error.message
      };
    }
  },
  async changePassword({ commit }, data) {
    commit("SET_LOADING", true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      };
      const result = await axiosInstance.post(
        "/member/password.php",
        data,
        config
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return { ok: true, message: result.data.message };
      }
      return {
        ok: false,
        error: result.data.error
      };
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  }
};
