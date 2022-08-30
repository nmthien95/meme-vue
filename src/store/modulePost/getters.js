export default {
  getListPost: state => {
    return state.listPosts;
  },
  getDataPostDetail(state, getters, rootState) {
    const USERID = state.postDetail.post.USERID;
    const user = rootState.user.users[USERID];

    const data = {
      post: {
        ...state.postDetail.post,
        fullname: user.fullname,
        profilepicture: user.profilepicture
      },
      categories: state.postDetail.categories
    };

    return data;
  }
};
