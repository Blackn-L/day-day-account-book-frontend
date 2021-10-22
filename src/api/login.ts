import { request } from "@/utils/index";
interface LoginParams {
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
