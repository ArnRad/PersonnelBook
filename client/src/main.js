// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueSimpleAlert from "vue-simple-alert";
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);
Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
