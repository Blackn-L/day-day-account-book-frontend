<script setup lang="ts">
import { ref, reactive } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import Header from "@/components/Header/index.vue";
import { editUserInfo } from "@/api/user";
const router = useRouter();
const avatarList = reactive({
  dog: [
    {
      name: "dog1",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224002.jpeg",
    },
    {
      name: "dog2",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224029.jpeg",
    },
    {
      name: "dog3",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224039.jpeg",
    },
    {
      name: "dog4",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224054.jpeg",
    },
    {
      name: "dog5",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224102.jpeg",
    },
    {
      name: "dog6",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224107.jpeg",
    },
    {
      name: "dog7",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224113.jpeg",
    },
    {
      name: "dog8",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224148.jpeg",
    },
    {
      name: "dog9",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224153.jpeg",
    },
    {
      name: "dog10",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224157.jpeg",
    },
    {
      name: "dog11",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211208224344.png",
    },
    {
      name: "dog12",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209010823.jpeg",
    },
  ],
  cat: [
    {
      name: "cat1",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231336.jpeg",
    },
    {
      name: "cat2",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231434.jpeg",
    },
    {
      name: "cat3",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231440.jpeg",
    },
    {
      name: "cat4",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231444.jpeg",
    },
    {
      name: "cat5",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231450.jpeg",
    },
    {
      name: "cat6",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231455.jpeg",
    },
    {
      name: "cat7",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231459.jpeg",
    },
    {
      name: "cat8",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231504.jpeg",
    },
    {
      name: "cat9",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231508.jpeg",
    },
    {
      name: "cat10",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231514.jpeg",
    },
    {
      name: "cat11",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231519.jpeg",
    },
    {
      name: "cat12",
      url: "https://cdn.jsdelivr.net/gh/Blackn-L/Picture/blog/20211209231553.jpeg",
    },
  ],
});

const clickImg = (url: string) => {
  console.log(url);
  reqEditUserInfo(url);
};

// 更换头像
const reqEditUserInfo = async (avatar: string) => {
  const { code } = await editUserInfo({ avatar });
  if (code === 200) {
    Toast.success("头像更换成功");
    setTimeout(() => {
      router.push("/user");
    }, 1000);
  }
};
</script>

<template>
  <Header title="更换头像" />
  <div class="main">
    <div class="items">
      <div v-for="value in avatarList.dog" :key="value.name">
        <van-image
          style="border: 2px solid #fff"
          round
          fit="contain"
          width="80"
          height="80"
          :src="value.url"
          alt="dog"
          lazy-load
          @click="clickImg(value.url)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div v-for="value in avatarList.cat" :key="value.name">
        <van-image
          style="border: 2px solid #fff"
          round
          fit="contain"
          width="80"
          height="80"
          :src="value.url"
          alt="dog"
          lazy-load
          @click="clickImg(value.url)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  background: url("@/assets/user.jpeg") no-repeat center center fixed;
  background-size: cover;
  .items {
    height: 80%;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center center;
    gap: 20px 10px;
  }
}
</style>
