<template>
  <div class="row">
    <div class="col-lg-8">
      <div
        class="ass1-section__list"
        v-if="getDataPostDetail && getDataPostDetail.post"
      >
        <div class="ass1-section">
          <post-item :post="getDataPostDetail.post" />

          <!-- <post-feeling /> -->
          <!-- <post-feeling1 /> -->
          <ul>
            <li v-for="item in getDataPostDetail.categories" :key="item.TAG_ID">
              <router-link :to="getLinkCategory(item)">
                {{ item.tag_value }}
              </router-link>
            </li>
          </ul>
        </div>

        <post-comment-add />

        <post-comments />
      </div>
    </div>
    <div class="col-lg-4">
      <sidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import PostItem from "../components/PostItem";
import PostFeeling from "../components/PostFeeling";
import PostComments from "../components/PostComments";
import PostCommentAdd from "../components/PostCommentAdd";

import { mapActions, mapGetters } from "vuex";
import { removeVietnameseFromString } from "../helpers";
import PostFeeling1 from "../components/PostFeeling.vue";

export default {
  name: "post-detail",
  data() {
    return {
      postId: this.$route.params.id
    };
  },
  components: {
    Sidebar,
    PostItem,
    PostFeeling,
    PostComments,
    PostCommentAdd,
    PostFeeling1
  },
  watch: {
    $route(to, from) {
      this.postId = to.params.id;

      this.fetchDataPostDetail(this.postId);
    }
  },
  computed: {
    ...mapGetters(["getDataPostDetail"])
  },
  created() {
    // Load lại trang lần đầu tiên

    this.fetchDataPostDetail(this.postId);
  },
  methods: {
    ...mapActions(["getPostDetailById"]),
    fetchDataPostDetail(postId) {
      this.getPostDetailById(postId).then(res => {
        if (!res.ok) {
          // đẩy qua trang chủ
          this.$router.push("/");
        }
      });
    },
    getLinkCategory(category) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(category.tag_value),
          tagIndex: category.tag_index
        }
      };
    }
  }
};
</script>

<style>
.ass1-section__post-detail {
  margin-top: 44px;
}
.ass1-section__post-detail .ass1-section .ass1-section {
  box-shadow: none;
  padding: 0;
  border-bottom: solid 1px #f3f3f3;
}
.list-categories {
  padding-bottom: 20px;
}
.list-categories ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
}
.list-categories ul li {
  margin: 5px;
}
.list-categories ul li a {
  color: #333;
  font-size: 14px;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 3px 10px;
  transition: all 0.3s ease;
}
.list-categories ul li a:hover {
  background-color: #333;
  border-color: #333;
  color: #fff;
}
/* .ass1-section__post-detail > .ass1-section {
        padding: 0;
    } */
</style>
