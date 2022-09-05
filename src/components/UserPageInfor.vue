<template>
  <div class="ass1-head-user" v-if="userInfor">
    <div class="ass1-head-user__content">
      <div class="ass1-head-user__image">
        <a href="#">
          <img :src="userInfor.profilepicture" alt="" />
        </a>
      </div>
      <div class="ass1-head-user__info">
        <div class="ass1-head-user__info-head">
          <div class="ass1-head-user__name">
            <span>{{ userInfor.fullname }}</span>
            <i
              ><img src="/dist/fonts/emotion/svg/Verified.svg" alt="Verified"
            /></i>
          </div>
          <div class="w-100"></div>
          <a
            v-if="!isCurrentUser"
            href="#"
            class="ass1-head-user__btn-follow ass1-btn"
            >Theo dõi</a
          >

          <template v-else>
            <router-link
              :to="{
                name: 'change-password',
                params: { id: userInfor.USERID }
              }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Đổi mật khẩu</router-link
            >

            <router-link
              :to="{
                name: 'user-profile',
                params: { id: userInfor.USERID }
              }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Profile</router-link
            >
          </template>
        </div>
        <div class="ass1-head-user__info-statistic">
          <div class="ass1-btn-icon">
            <i class="icon-Post"></i><span>Bài viết:{{ countPost }}</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Followers"></i><span>Theo dõi: 99999</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Following"></i><span>Đang theo dõi: 999</span>
          </div>
        </div>
        <p>{{ userInfor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "user-page-info",

  props: { userInfor: Object, countPost: Number },
  computed: {
    ...mapGetters(["currentUser"]),
    isCurrentUser() {
      if (this.userInfor && this.currentUser) {
        if (this.userInfor.USERID == this.currentUser.USERID) return true;
      }
      return false;
    }
  }
};
</script>

<style></style>
