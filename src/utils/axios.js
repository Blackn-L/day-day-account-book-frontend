import axios from "axios";
import { Toast } from "vant";

const MODE = import.meta.env.MODE; // 环境变量

// 开发环境请求本地代理，生产环境请求域名
axios.defaults.baseURL =
  MODE == "development" ? "/api" : "http://api.svip52.com/pocket/";
axios.defaults.withCredentials = true;
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Authorization"] = `${
  localStorage.getItem("token") || null
}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
  // 请求失败
  if (typeof res.data !== "object") {
    Toast.fail("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.code != 200) {
    if (res.data.msg) Toast.fail(res.data.msg);
    if (res.data.code == 401) {
      window.location.href = "/login";
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

export default axios;
