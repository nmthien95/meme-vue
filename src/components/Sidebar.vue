<template>
  <aside class="ass1-aside">
    <div class="ass1-content-head__t">
      <div>Bài viết gần đây.</div>
    </div>
    <div v-if="!isLogin">
      Vui lòng đăng nhập để xem nội dung này
      <router-link to="/login">Đăng nhập</router-link>
    </div>
    <div v-else>
      <PostItem
        v-for="item in getListPostOfCurrentUser"
        :key="item.PID"
        :post="item"
      />
    </div>
  </aside>
</template>

<script>
import PostItem from "./PostItem";
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  components: {
    PostItem
  },
  computed: {
    ...mapGetters(["isLogin", "getListPostOfCurrentUser"])
  }
};
</script>

<style></style>
