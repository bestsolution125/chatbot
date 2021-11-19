import { createApp } from "vue";
import api from "./api";
import App from "./App.vue";

const app = createApp(App);
app.use(api);

app.mount("#app");
