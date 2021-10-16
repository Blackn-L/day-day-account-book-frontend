import { createApp } from "vue";
import App from "./App.vue";
import { Button,Icon } from "vant";

const app = createApp(App);
app.use(Button).use(Icon);
app.mount("#app");
