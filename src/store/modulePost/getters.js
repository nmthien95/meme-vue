export default {
  getListPost(state) {
    return state.listPosts;
  },
  getDataPostDetail(state, getters, rootState) {
    if (state.postDetail) {
      var USERID = state.postDetail.post.USERID;
      var user = rootState.user.users[USERID];

      var data = {
        post: {
          ...state.postDetail.post,
          fullname: user.fullname,
          profilepicture: user.profilepicture
        },
        categories: state.postDetail.categories,
        comments: state.postDetail.comments
      };

      return data;
    }
  }
};
