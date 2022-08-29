<template>
  <div id="app">
    <app-header v-if="isRenderHeader" />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <app-footer v-if="isRenderFooter" />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {};
  },
  computed: {
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
  created() {},
  methods: {}
};
</script>

<style></style>
