<script setup lang="ts">
import { reactive } from "vue";
const userinfo = reactive({
  name: "admin",
  signature: "hi,world",
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
};
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-left">
        <span> 昵称: {{ userinfo.name }} </span>
        <span>{{ userinfo.signature }}</span>
      </div>
      <div class="header-right">
        <img :src="userinfo.avatar" alt="头像" />
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
  height: 90vh;
  grid-template-rows: 1.5fr 3fr 1fr;
  align-items: stretch;
  margin: 5%;
  font-size: 18px;
  .header {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    grid-template-rows: repeat(3, 2fr);
    align-items: center;
    justify-items: center;
    .header-left {
      font-weight: 700;
      color: #fff;
      background-color: #597fe7;
      grid-column-start: 1;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 2fr;
    }
    .header-right {
      grid-column-start: 3;
      img {
        width: 60px;
        height: 60px;
        border-radius: 15%;
      }
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
