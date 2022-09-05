import store from "../store";

const ifNotAuthenticated = (to, form, next) => {
  // 1. Router chỉ cho phép vào khi chưa đăng nhập (Login, Register)
  if (store.getters.isLogin == false) {
    next();
  } else {
    next({
      name: "home-page",
      query: {
        redirect: to.name
      }
    });
  }
};

const ifAuthenticated = (to, form, next) => {
  // 2. Router chỉ chó phép vào khi đã đăng nhập
  if (store.getters.isLogin == true) {
    next();
  } else {
    next({
      name: "login",
      query: {
        redirect: to.name
      }
    });
  }
  next();
};

export { ifNotAuthenticated, ifAuthenticated };
