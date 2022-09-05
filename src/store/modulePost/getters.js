export default {
  getListPost: state => {
    return state.listPosts;
  },
  getDataPostDetail(state, getters, rootState) {
    let data = null;
    if (state.postDetail && rootState.user) {
      const USERID = state.postDetail.post.USERID;
      const user = rootState.user.users[USERID];
      const post = state.postDetail.post;

      data = {
        post: {
          ...post,
          fullname: user.fullname,
          profilepicture: user.profilepicture
        },
        categories: state.postDetail.categories,
        comments: state.postDetail.comments
      };
    }

    return data;
  }
};
