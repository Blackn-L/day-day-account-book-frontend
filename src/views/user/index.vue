<script setup lang="ts">
import { Toast } from "vant";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userinfo = reactive({
  name: "admin",
  signature: "hi,world, just do what u like",
  avatar:
    "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211003210108.png",
});
// 个人信息修改
const editUserinfo = () => {
  console.log("editUserinfo");
};

// 修改密码
const editPassword = () => {
  console.log("editPassword");
};

// 关于我
const aboutMe = () => {
  console.log("aboutMe");
};

// 退出登录
const loginOut = () => {
  console.log("退出登录");
  localStorage.removeItem("token");
  Toast.success({ message: "退出成功", duration: 1000 });
  setTimeout(() => {
    router.push("/login");
  }, 1000);
};
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-avatar">
        <van-image
          round
          fit="contain"
          width="80"
          height="80"
          :src="userinfo.avatar"
          alt="头像"
        />
      </div>
      <div class="header-name">
        <span> {{ userinfo.name }} </span>
      </div>
      <div class="header-signature">
        <span>{{ userinfo.signature }}</span>
      </div>
    </div>
    <div class="content">
      <van-cell-group inset>
        <van-cell
          title="个人信息"
          icon="user-circle-o"
          is-link
          @click="editUserinfo"
        />
        <van-cell title="修改密码" icon="edit" is-link @click="editPassword" />
        <van-cell title="关于" icon="info-o" is-link @click="aboutMe" />
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button size="large" type="danger" @click="loginOut"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  display: grid;
  height: 95vh;
  grid-template-rows: 1.5fr 3fr 1fr;
  align-items: stretch;
  padding: 3%;
  font-size: 18px;
  background: url("@/assets/user.jpeg") no-repeat;
  .header {
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    grid-template-rows: 0.3fr 0.8fr 0.5fr 0.8fr;
    align-items: center;
    justify-items: center;
    .header-avatar {
      grid-column-start: 2;
      grid-row-start: 2;
      div {
        border: 2px solid #fff;
      }
    }
    .header-name {
      grid-column-start: 2;
      grid-row-start: 3;
      font-weight: 700;
      font-size: 22px;
      color: #fff;
    }
    .header-signature {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 4;
      font-size: 18px;
      color: #fff;
    }
  }
  .content {
    grid-row-start: 2;
    font-size: 17px;
  }
  .footer {
    margin: 10px;
  }
}
</style>
