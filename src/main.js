import Vue from 'vue';
import App from './App';

import VueRouter from 'vue-router';
import router from './router';

// Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/maketep.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
