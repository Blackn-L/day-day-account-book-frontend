<script setup lang="ts">
import { ref, reactive } from "vue";
import { register, LoginAndRegParams } from "@/api/user";
import { Toast } from "vant";
import { tools } from "@/utils/index";

enum LeftIconType {
  CIRCLE = "circle",
  CHECKED = "checked",
  LOADING = "loading",
  CLEAR = "clear",
}
const emit = defineEmits<{
  (e: "toLogin", username: string): void;
}>();
const username = ref<string>("");
const password = ref<string>("");
const buttonLoading = ref(false);
const showLeftIcon = reactive<{
  username: LeftIconType;
  password: LeftIconType;
}>({
  username: LeftIconType.CIRCLE,
  password: LeftIconType.CIRCLE,
});
// 点击图标显示提示
const clickIcon = (type: "username" | "password") => {
  Toast(
    `数字、字母、下划线至少包含两种, ${
      type === "username"
        ? "长度：最短 4 个字符，最长 20 个字符"
        : "长度：最短 8 个字符，最长 20 个字符"
    }`
  );
};
// 根据不同的输入状态，显示不同图标
const changeLeftIcon = (
  val: string,
  type: "username" | "password",
  e?: Event
): boolean => {
  // 是否是失焦后触发的
  const isBlur = e?.type === "blur" || false;
  // 校验
  const result = tools.useCheckUername(val);
  if (result) {
    // 设置延时目的是为了让 loading 状态更久点，好看点？是的
    setTimeout(() => {
      showLeftIcon[type] = LeftIconType.CHECKED;
    }, 500);
  } else {
    // 没值，就显示圆圈
    if (val.length === 0) {
      showLeftIcon[type] = LeftIconType.CIRCLE;
    } else {
      // 输入状态 loading, 如果是失焦后触发的，就显示 CLEAR
      showLeftIcon[type] = isBlur ? LeftIconType.CLEAR : LeftIconType.LOADING;
    }
  }
  return true;
};
const onSubmit = async (values: LoginAndRegParams) => {
  if (!values?.username?.trim() || !values?.password?.trim()) {
    Toast.fail("请输入用户名或密码");
    return;
  }
  try {
    buttonLoading.value = true;
    const { message, code } = await register(values);
    if (code === 200) {
      Toast.success({ message, duration: 700 });
      setTimeout(() => {
        emit("toLogin", username.value);
        username.value = "";
        password.value = "";
      }, 500);
    }
  } catch (error) {
    console.log("error: ", error);
  } finally {
    buttonLoading.value = false;
  }
};
</script>

<template>
  <van-form
    @submit="onSubmit"
    :readonly="buttonLoading"
    validate-trigger="onSubmit"
    label-width="50px"
  >
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="输入用户名"
        clearable
        @blur="(e:Event) => changeLeftIcon(username,'username',e)"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator: (val:string) => tools.useCheckUername(val),
            message: '用户名格式错误',
          },
          {
            validator: (val:string)=>changeLeftIcon(val,'username'),
            trigger: 'onChange'
          },
        ]"
      >
        <template v-slot:left-icon>
          <van-loading v-if="showLeftIcon.username === 'loading'" size="20" />
          <van-icon v-else :name="showLeftIcon.username" />
        </template>
        >
        <template v-slot:right-icon>
          <van-icon name="info-o" @click="clickIcon('username')" />
        </template>
        <template v-slot:extra> </template>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="输入密码"
        clearable
        @blur="(e:Event) => changeLeftIcon(password,'password',e)"
        :rules="[{ required: true, message: '请填写密码' }, {
            validator: (val:string) => tools.useCheckPassword(val),
            message: '密码格式错误',
          },
           {
            validator: (val:string)=>changeLeftIcon(val,'password'),
            trigger: 'onChange'
          },]"
      >
        <template v-slot:left-icon>
          <van-loading v-if="showLeftIcon.password === 'loading'" size="20" />
          <van-icon v-else :name="showLeftIcon.password" />
        </template>
        <template v-slot:right-icon>
          <van-icon name="info-o" @click="clickIcon('password')" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="buttonLoading"
      >
        注册
      </van-button>
    </div>
  </van-form>
</template>

<style lang="less" scoped></style>
