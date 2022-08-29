<template>
  <aside class="ass1-aside">
    <div class="ass1-content-head__t">
      <div>Bài viết gần đây.</div>
    </div>
    <PostItem />
  </aside>
</template>

<script>
import PostItem from "./PostItem";

export default {
  name: "sidebar",
  components: {
    PostItem
  },
  computed: {}
};
</script>

<style></style>
