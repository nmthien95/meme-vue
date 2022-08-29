<template>
  <div class="row">
    <div class="col-lg-8">
      <post-list />
    </div>
    <div class="col-lg-4">
      <sidebar />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
export default {
  name: "home-page",
  components: {
    PostList,
    Sidebar
  },
  // watch $route chỉ chạy khi có sự thay đổi router
  // Nếu như lần load đầu tiên -> Không có chạy
  watch: {
    $route(to, from) {
      console.log("homepage to", to);
      const tagIndex = to.query.tagIndex;
      if (tagIndex) {
        //dispatch  action by category
        console.log(tagIndex);
        this.getPostDetailById({ tagIndex: tagIndex });
      } else {
        // dispatch action by  pagin
        this.getListPostHasPaging({});
      }
    }
  },
  created() {
    const tagIndex = this.$route.query.tagIndex;
    this.getListPostHasPaging({ tagIndex });
  },
  methods: {
    ...mapActions(["getListPostHasPaging", "getPostDetailById"])
  }
};
</script>

<style></style>
