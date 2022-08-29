export default {
  // increment (state) {
  //     state.count++
  // }
  SET_LIST_POST(state, data) {
    state.listPosts = data;
  },
  PUSH_LIST_POSTS(state, data) {
    state.listPosts = [...state.listPosts, ...data];
  },
  SET_POST_DETAIL(state, data) {
    console.log("set_post_detail", data);
    state.postDetail = data;
  },
  PUST_LIST_COMMENTS(state, comment) {
    console.log("PUSH_LIST_COMMENTS = ", comment);
    state.postDetail.comments.push(comment);
  }
};

// TH nếu current = 1 -> Thay thế array gốc
// TH nếu current = 2, 3, 4 -> Đẩy thêm dữ liệu vào ( nối 2 array lại với nhau )
