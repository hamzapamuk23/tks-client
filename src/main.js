import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify/vuetify";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import router from "./plugins/router";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader

Vue.use(VueAxios, axios);
Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  VueRouter,
  router,
  icons: {
    iconfont: "mdiSvg", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },

  render: (h) => h(App),
}).$mount("#app");