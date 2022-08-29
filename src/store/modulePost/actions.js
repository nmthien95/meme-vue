import axiosInstance from "../../plugins/axios";
import { PAGE_SIZE, CURRENT_PAGE, CONFIG_ACCESS_TOKEN } from "../../constants";

export default {
  async getListPostHasPaging({ commit }, { pageSize = 6, currentPage = 1 }) {
    try {
      const result = await axiosInstance.get(
        `post/getListPagination.php?pagesize=${pageSize}&currPage=${currentPage}`
      );
      if (result.data.status == 200) {
        commit("SET_LIST_POST", result.data.posts);
      } else {
        console.log(result.error);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
  async getPostDetailById(
    { commit, dispatch },
    { pageSize = 6, currentPage = 1, tagIndex = 1 }
  ) {
    console.log(tagIndex);
    try {
      const result = await axiosInstance.get(
        `post/getListByCategory.php?pagesize=${pageSize}&currPage=${currentPage}&tagIndex=${tagIndex}`
      );
      if (result.data.status == 200) {
        console.log(result);
        commit("SET_LIST_POST", result.data.posts);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getListPostSearch({ commit }, searchStr) {
    commit("SET_LOADING", true);
    try {
      var result = await axiosInstance.get(
        "/post/search.php?query=" + searchStr
      );
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        return {
          ok: true,
          posts: result.data.posts
        };
      } else {
        return {
          ok: false
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
  async createNewPost(
    { commit },
    { post_content = "", category = "", url_image = "", obj_image = null }
  ) {
    commit("SET_LOADING", true);
    try {
      let bodyFormData = new FormData();

      bodyFormData.append("category", category);
      bodyFormData.append("url_image", url_image);
      bodyFormData.append("post_content", post_content);

      if (obj_image) {
        bodyFormData.append("obj_image", obj_image);
      }

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      };

      console.log("post_content:", post_content);
      console.log("category:", category);
      console.log("url_image:", url_image);
      console.log("obj_image:", obj_image);

      var result = await axiosInstance.post(
        "/post/addNew.php",
        bodyFormData,
        config
      );
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        return {
          ok: true,
          data: result.data.data // posts - categories
        };
      } else {
        return {
          ok: false,
          error: result.data.error
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
  async getListCommentByPostid({ commit }, postid) {
    try {
      var result = await axiosInstance.get(
        "/comment/comments.php?postid=" + postid
      );
      if (result.data.status === 200) {
        return {
          ok: true,
          comments: result.data.comments
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async addNewComment({ commit, rootState }, { comment = "", postid = null }) {
    try {
      commit("SET_LOADING", true);
      let data = {
        comment,
        postid
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      };
      var result = await axiosInstance.post(
        "/comment/add_new.php",
        data,
        config
      );
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        let comment = {
          ...result.data.body,
          fullname: rootState.user.currentUser.fullname,
          profilepicture: rootState.user.currentUser.profilepicture
        };
        console.log("result comment = ", result.data.body);
        console.log("comment = ", comment);
        commit("PUST_LIST_COMMENTS", comment);
        return {
          ok: true,
          comment: comment
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  }
};
