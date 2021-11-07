import { request } from "@/utils/index";
export interface LoginAndRegParams {
  username: string;
  password: string;
}
interface LoginData {
  token: string;
}
// 登录
export function login(params: LoginAndRegParams) {
  return request<LoginData>({
    url: "/user/login",
    method: "post",
    data: params,
  });
}

// 注册
export function register(params: LoginAndRegParams) {
  return request({
    url: "/user/register",
    method: "post",
    data: params,
  });
}

// 获取用户信息
export function getUserInfo(params: LoginAndRegParams) {
  return request({
    url: "/user/get",
    method: "get",
  });
}
