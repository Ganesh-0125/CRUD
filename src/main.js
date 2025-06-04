import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "@/router/router";
import { createPinia } from "pinia";
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
import locale from "view-ui-plus/dist/locale/en-US";

const app = createApp(App);
const pinia = createPinia();

app.use(ViewUIPlus, { locale });
app.use(pinia);
app.use(router);
app.mount("#app");
