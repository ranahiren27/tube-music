import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueMaterial from "vue-material";
import infiniteScroll from "vue-infinite-scroll";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(infiniteScroll);
Vue.use(VueMaterial);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
