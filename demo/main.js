import Vue from "vue";
import VSwatches from "../src/VSwatches";
import Demo from "./Demo.vue";

Vue.config.productionTip = false;

Vue.component("v-swatches", VSwatches);

new Vue({
  render: h => h(Demo)
}).$mount("#app");
