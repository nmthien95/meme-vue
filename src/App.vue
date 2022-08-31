<template>
  <div id="app">
    <app-header v-if="isRenderHeader" />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <app-footer v-if="isRenderFooter" />
    <loading :class="{ show: isLoading }" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Loading from "./components/Loading.vue";

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter,
    Loading
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLoading"]),
    isRenderHeader() {
      const arrRouter = ["login", "register"];
      const routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) return false;
      return true;
    },
    isRenderFooter() {
      const arrRouter = ["home-page", "post-detail"];
      const routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) return false;
      return true;
    }
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(["checkLogin"])
  }
};
</script>

<style></style>
