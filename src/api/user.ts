import { request } from "@/utils/index";
export interface LoginParams {
  username: string;
  password: string;
}
export interface RegisterParams {
  username: string;
  password: string;
}
interface LoginData {
  token: string;
}
// 登录
export function login(params: LoginParams) {
  return request<LoginData>({
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

// 获取用户信息
export function getUserInfo(params: RegisterParams) {
  return request({
    url: "/user/get",
    method: "get",
  });
}
