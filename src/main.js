import { createApp } from "vue";
import App from "./App.vue";
import "lib-flexible/flexible";
import { Button, Icon, NavBar, Tabbar, TabbarItem } from "vant";
import router from "./router";

const app = createApp(App);
app.use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem);
app.use(router);
app.mount("#app");
