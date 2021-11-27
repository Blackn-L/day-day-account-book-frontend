import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Toast } from "vant";
interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

const MODE = import.meta.env.MODE; // 环境变量
console.log("MODE: ", MODE);
const service = axios.create({
  // 开发环境请求本地代理，生产环境请求域名
  // 开发环境在接口面前自动加上 api，配合 本地代理使用，无需在每个接口前写 /api
  baseURL: MODE === "development" ? "/api" : "http://ab.svip52.com/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});
// 两层泛型，一层是 axios 提供的，AxiosRequestConfig
// 一层是自定义的，ResponseData<T>
// 实现响应的 data 以及 data.data 的类型提示
// request 函数传入一个 data.data 的类型
const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<ResponseData<T>> => {
  // 请求前加上 token
  service.interceptors.request.use((config) => {
    if (config?.headers) {
      config.headers.Authorization = localStorage.getItem("token") || "";
    }
    return config;
  });
  const { data } = await service.request<ResponseData<T>>(config);
  // 请求失败
  if (typeof data !== "object") {
    Toast.fail("服务端异常！");
    return Promise.reject(data);
  }
  if (data.code != 200) {
    if (data.message) Toast.fail(data.message);
    if (data.code == 401) {
      location.href = "#/login";
    }
    return Promise.reject(data);
  }
  return data;
};

export default request;
