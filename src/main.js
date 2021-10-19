import { createApp } from "vue";
import App from "./App.vue";
import "lib-flexible/flexible";
import {
  Button,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  CellGroup,
  Tab,
  Tabs,
} from "vant";
import router from "./router";

const app = createApp(App);
app
  .use(Button)
  .use(Icon)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Tab)
  .use(Tabs);
app.use(router);
app.mount("#app");
