import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import fasolid from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(fasolid);

Vue.use(Element);
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);

import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
