<template>
  <div class="ass1-section__head">
    <router-link :to="getUserLink" class="ass1-section__avatar ass1-avatar"
      ><img :src="getAvatar" alt=""
    /></router-link>

    <div>
      <router-link
        :to="getUserLink"
        class="ass1-section__name"
        v-html="formatFullname"
      ></router-link>
      <span class="ass1-section__passed">{{ formatTimeAdded }}</span>
    </div>
    <router-link :to="getUserLink" class="ass1-section__link ass1-btn-icon"
      ><i class="icon-Link"></i
    ></router-link>
  </div>
</template>

<script>
import moment from "moment";
import { replaceAll } from "../helpers";
export default {
  name: "post-item-head",
  props: {
    post: Object
  },
  data() {
    return {
      querySearch: this.$route.query.query
    };
  },
  watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    }
  },

  computed: {
    getAvatar() {
      if (this.post.profilepicture) {
        return this.post.profilepicture;
      }
      return "https://i.pravatar.cc/300";
    },
    getUserLink() {
      return { name: "user-page", params: { id: this.post.USERID } };
    },
    formatTimeAdded() {
      moment.locale("vi");
      return moment(this.post.time_added).fromNow();
    },
    formatFullname() {
      if (this.querySearch) {
        // repalce html
        return replaceAll(
          this.post.fullname,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.fullname;
      }
    }
  }
};
</script>

<style>
.ass1-section__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ass1-section__name {
  text-transform: capitalize;
}
</style>
