<template>
  <div class="ass1-head-user">
    <div class="ass1-head-user__content">
      <div class="ass1-head-user__image">
        <a href="#"><img src="images/cat-1634369_1920.jpg" alt=""/></a>
      </div>
      <div class="ass1-head-user__info">
        <div class="ass1-head-user__info-head">
          <div class="ass1-head-user__name">
            <span>nguyen minh thien</span>
            <i
              ><img src="/dist/fonts/emotion/svg/Verified.svg" alt="Verified"
            /></i>
          </div>
          <div class="w-100"></div>
          <a href="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>

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
        </div>
        <div class="ass1-head-user__info-statistic">
          <div class="ass1-btn-icon">
            <i class="icon-Post"></i><span>Bài viết: 9999</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Followers"></i><span>Theo dõi: 99999</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Following"></i><span>Đang theo dõi: 999</span>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-page-info",
  props: {},
  computed: {}
};
</script>

<style></style>
