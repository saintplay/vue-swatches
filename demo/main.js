import { createApp } from "vue";
import VSwatches from "../src/VSwatches";
import Demo from "./Demo.vue";

const app = createApp(Demo);
app.component("v-swatches", VSwatches);

app.mount("#app");
