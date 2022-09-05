<template>
  <div class="ass1-login">
    <div class="ass1-login__content">
      <p>Profile</p>

      <div class="ass1-login__form">
        <div class="avatar">
          <img :src="getAvatar" alt="" />
        </div>
        <form
          action="#"
          v-if="currentUser"
          v-on:submit.prevent="handleEditProfile"
        >
          <input
            :value="currentUser.fullname"
            v-on:input="fullname = $event.target.value"
            type="text"
            class="form-control"
            placeholder="Tên ..."
            required=""
          />

          <select
            :value="currentUser.gender"
            v-on:input="gender = $event.target.value"
            class="form-control"
          >
            <option value="" disabled>Giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>

          <input
            v-on:change="uploadAvatar"
            type="file"
            name="avatar"
            placeholder="Ảnh đại diện"
            class="form-control"
          />

          <textarea
            :value="currentUser.description"
            v-on:input="description = $event.target.value"
            class="form-control"
            cols="30"
            rows="5"
            placeholder="Mô tả ngắn ..."
          ></textarea>

          <div class="ass1-login__send justify-content-center">
            <button type="submit" class="ass1-btn">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "user-profile",
  data() {
    return {
      fullname: "",
      description: "",
      gender: "",
      avatar: {
        objFile: null,
        base64URL: ""
      },
      userid: this.$route.params.id
    };
  },
  watch: {
    $route(to, from) {
      this.userid = to.params.id;
      this.checkIsCurrentUser();
    }
  },
  created() {
    this.checkIsCurrentUser();
  },
  computed: {
    ...mapGetters(["currentUser"]),
    getAvatar() {
      if (this.avatar.base64URL === "" && this.currentUser) {
        return this.currentUser.profilepicture;
      } else {
        return this.avatar.base64URL;
      }
    }
  },
  methods: {
    ...mapActions(["updateProfile"]),
    handleEditProfile() {
      console.log("yes");
      if (!this.fullname) this.fullname = this.currentUser.fullname;
      if (!this.description) this.description = this.currentUser.description;
      if (!this.gender) this.gender = this.currentUser.gender;

      if (this.fullname && this.description && this.gender) {
        const data = {
          fullname: this.fullname,
          description: this.description,
          gender: this.gender
        };
        if (this.avatar.objFile) {
          data.objFile = this.avatar.objFile;
        }
        this.updateProfile(data).then(res => {
          if (res.ok) {
            alert("Update thông tin thành công");
          } else {
            alert(res.error);
          }
        });
      }
    },
    checkIsCurrentUser() {
      if (this.userid && this.currentUser) {
        if (this.userid != this.currentUser.USERID) {
          this.$router.push("/");
        }
      }
    },
    uploadAvatar(e) {
      if (e.target.files && e.target.files.length) {
        const filesAvatar = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const previewsrc = reader.result;

            this.avatar.base64URL = previewsrc;
            this.avatar.objFile = filesAvatar;
          },
          false
        );
        if (filesAvatar) {
          reader.readAsDataURL(filesAvatar);
        }
      }
    }
  }
};
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  overflow: hidden;
}
</style>
