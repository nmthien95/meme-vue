<template>
  <div class="ass1-section__content">
    <p v-html="formatPostContent"></p>

    <div class="ass1-section__image">
      <router-link :to="getPostLink">
        <img :src="post.url_image" :alt="post.post_content" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { replaceAll } from "../helpers";

export default {
  name: "post-item-content",
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
    getPostLink() {
      return { name: "post-detail", params: { id: this.post.PID } };
    },
    formatPostContent() {
      if (this.querySearch) {
        // Replace html
        return replaceAll(
          this.post.post_content,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.post_content;
      }
    }
  }
};
</script>

<style></style>
