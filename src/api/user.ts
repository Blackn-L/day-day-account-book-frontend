import { request } from "@/utils/index";
export interface LoginAndRegParams {
  username: string;
  password: string;
}
interface LoginData {
  token: string;
}
interface editParams {
  signature: string;
}
interface editData {
  id: number;
  username: string;
  signature: string;
}
interface updatePasswordParams {
  oldPassword: string;
  newPassword: string;
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
export function getUserInfo() {
  return request({
    url: "/user/get",
    method: "get",
  });
}

// 编辑用户信息
export function editUserInfo(params: editParams) {
  return request<editData>({
    url: "/user/edit",
    method: "put",
    data: params,
  });
}

// 修改密码
export function updatePassword(params: updatePasswordParams) {
  return request({
    url: "/user/update_password",
    method: "put",
    data: params,
  });
}
