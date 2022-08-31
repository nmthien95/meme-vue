import { CONFIG_ACCESS_TOKEN } from "../../constants";
import { parseJwt } from "../../helpers";
export default {
  isLogin: state => {
    const userObj = parseJwt(state.ACCESS_TOKEN);
    if (userObj) {
      return true;
    }
    return false;
  },
  currentUser: state => {
    return state.currentUser;
  },
  getListPostOfCurrentUser: state => {
    if (state.currentUser) {
      const userCurrentId = state.currentUser.USERID;
      return state.posts[userCurrentId];
    }
    return null;
  }
};
