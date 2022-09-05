<template>
  <div class="ass1-section__footer">
    <!-- <a href="#" class="ass1-section__btn-upvote ass1-btn-icon"
      ><i class="icon-Upvote"></i
    ></a>
    <a href="#" class="ass1-section__btn-downvote ass1-btn-icon"
      ><i class="icon-Downvote"></i
    ></a>
    <a href="#" class="ass1-section__btn-repost ass1-btn-icon"
      ><i class="icon-Repost"></i
    ></a>
    <a href="#" class="ass1-section__btn-like ass1-btn-icon"
      ><i class="icon-Favorite_Full"></i><span>1,274</span></a
    > -->
    <router-link
      :to="getPostLink"
      class="ass1-section__btn-comment ass1-btn-icon"
    >
      <i class="icon-Comment_Full"></i>
      <span>{{ commentCount }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "post-item-footer",
  props: {
    post: { type: Object, default: null }
  },
  computed: {
    commentCount() {
      console.log(this.post);
      if (this.post.count) return this.post.count;
      return 0;
    },
    getPostLink() {
      return { name: "post-detail", params: { id: this.post.PID } };
    }
  }
};
</script>

<style></style>
