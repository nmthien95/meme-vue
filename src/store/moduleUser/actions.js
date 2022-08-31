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
        // const resultUserPost = await dispatch(
        //   "getListPostsByUserId",
        //   result.data.user.USERID
        // );

        commit("SET_USER_INFO", result.data.user);
        commit("SET_LOGIN_INFO", result.data);
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
    return null;
  },
  async checkLogin({ commit, dispatch }) {
    try {
      const tokenLocal = localStorage.getItem("ACCESS_TOKEN");
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
        eroor: error.message
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
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN")
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
        eroor: error.message
      };
    }
  }
  //   async getListPostsByUserId({ commit }, userid) {
  //     try {
  //       let config = {
  //         params: {
  //           userid: userid
  //         },
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
  //         }
  //       };
  //       let result = await axiosInstance.get(
  //         "/post/getListPostUserID.php",
  //         config
  //       );
  //       if (result.data.status === 200) {
  //         let objData = {
  //           posts: result.data.posts,
  //           userid: userid
  //         };
  //         commit("SET_USER_POSTS", objData);
  //         return {
  //           ok: true,
  //           posts: result.data.posts || [],
  //           error: null
  //         };
  //       }
  //       return {
  //         ok: false,
  //         error: null
  //       };
  //     } catch (error) {
  //       return {
  //         ok: false,
  //         error: error.message
  //       };
  //     }
  //   },
  //   async register({ commit, dispatch }, data) {
  //     commit("SET_LOADING", true);
  //     try {
  //       let result = await axiosInstance.post("/member/register.php", data);
  //       commit("SET_LOADING", false);
  //       if (result.data.code === 200) {
  //         let objLoginInfo = {
  //           user: result.data.user,
  //           token: result.data.token
  //         };
  //         commit("SET_USER_INFO", result.data.user);
  //         commit("SET_LOGIN_INFO", objLoginInfo);

  //         dispatch("getListPostsByUserId", result.data.user.USERID);

  //         return {
  //           ok: true,
  //           data: result.data,
  //           error: null
  //         };
  //       } else {
  //         return {
  //           ok: false,
  //           error: result.data.error
  //         };
  //       }
  //     } catch (error) {
  //       commit("SET_LOADING", false);
  //       return {
  //         ok: false,
  //         error: error.message
  //       };
  //     }
  //   },
  //   async updateProfile(
  //     { commit },
  //     { fullname = "", description = "", gender = "", objFile = null }
  //   ) {
  //     commit("SET_LOADING", true);
  //     try {
  //       let bodyFormData = new FormData();

  //       bodyFormData.append("gender", gender);
  //       bodyFormData.append("fullname", fullname);
  //       bodyFormData.append("description", description);

  //       // For avatar
  //       if (objFile) {
  //         bodyFormData.append("avatar", objFile);
  //       }

  //       let config = {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
  //         }
  //       };

  //       let result = await axiosInstance.post(
  //         "/member/update.php",
  //         bodyFormData,
  //         config
  //       );
  //       commit("SET_LOADING", false);
  //       if (result.data.status === 200) {
  //         commit("SET_CURRENT_USER", result.data.user);
  //         return {
  //           ok: true,
  //           user: result.data.user
  //         };
  //       } else {
  //         return {
  //           ok: false,
  //           error: result.data.error
  //         };
  //       }
  //     } catch (error) {
  //       commit("SET_LOADING", false);
  //       return {
  //         ok: false,
  //         error: error.message
  //       };
  //     }
  //   },
  //   async changePassword({ commit }, data) {
  //     commit("SET_LOADING", true);
  //     try {
  //       let config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
  //         }
  //       };

  //       let result = await axiosInstance.post(
  //         "/member/password.php",
  //         data,
  //         config
  //       );
  //       commit("SET_LOADING", false);
  //       if (result.data.status === 200) {
  //         return {
  //           ok: true,
  //           message: result.data.message
  //         };
  //       } else {
  //         return {
  //           ok: false,
  //           error: result.data.error
  //         };
  //       }
  //     } catch (error) {
  //       commit("SET_LOADING", false);
  //       return {
  //         ok: false,
  //         error: error.message
  //       };
  //     }
  //   }
};
