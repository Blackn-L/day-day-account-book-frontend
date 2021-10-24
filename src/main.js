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
  Tab,
  Tabs,
  Popup,
  Grid,
  GridItem,
  Divider,
  DatetimePicker,
  Cell,
  CellGroup,
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
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Grid)
  .use(GridItem)
  .use(Divider)
  .use(DatetimePicker)
  .use(Cell)
  .use(CellGroup);
app.use(router);
app.mount("#app");
