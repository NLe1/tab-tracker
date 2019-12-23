import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import { sync } from "vuex-router-sync";
import store from "./store";
import Panel from "./components/globals/Panel.vue";

import VueYouTubeEmbed from "vue-youtube-embed";
// if you don't want install the component globally
Vue.use(VueYouTubeEmbed);

Vue.component("panel", Panel);

Vue.config.productionTip = false;

Vue.use(Vuetify);

sync(store, router);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
