import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Toast } from "vant";
interface ResponseData {
  code: number;
  message: string;
  data: object;
}
// interface useAxiosPesponse extends AxiosResponse {
//   data: ResponseData;
// }
interface AxiosResponse {
  data: ResponseData;
}
const MODE = import.meta.env.MODE; // 环境变量
console.log("MODE: ", MODE);
const service = axios.create({
  // 开发环境请求本地代理，生产环境请求域名
  // 开发环境在接口面前自动加上 api，配合 本地代理使用，无需在每个接口前写 /api
  baseURL: MODE === "development" ? "/api" : "http://api.svip52.com/pocket/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: localStorage.getItem("token") || "",
    "Content-Type": "application/json",
  },
});

service.interceptors.response.use((res: AxiosResponse) => {
  // 请求失败
  if (typeof res.data !== "object") {
    Toast.fail("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.code != 200) {
    if (res.data?.message) Toast.fail(res.data?.message);
    if (res.data?.code == 401) {
      window.location.href = "/login";
    }
    return Promise.reject(res.data);
  }

  return res;
});

export default service;
