import { request } from "@/utils/index";
interface LoginParams {
  username: string;
  password: string;
}
interface RegisterParams {
  username: string;
  password: string;
}
// 登录
export function login(params: LoginParams) {
  return request({
    url: "/user/login",
    method: "post",
    data: params,
  });
}

// 注册
export function register(params: RegisterParams) {
  return request({
    url: "/user/register",
    method: "post",
    data: params,
  });
}
