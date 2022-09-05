export default {
  // increment (state) {
  //     state.count++
  // }
  SET_LIST_POST(state, data) {
    state.listPosts = data;
  },
  // TH nếu curent =1 => thay thế arr gốc
  // Th nếu current != 1=> đẩy thêm dữ liệu (nối 2 array lại với nhau)s
  PUSH_LIST_POST(state, data) {
    state.listPosts = [...state.listPosts, ...data];
  },
  SET_POST_DETAIL(state, data) {
    state.postDetail = data;
  },

  PUST_LIST_COMMENTS(state, comment) {
    console.log("PUSH_LIST_COMMENTS = ", comment);
    state.postDetail.comments.push(comment);
  }
};
