import Vue from 'vue';
import App from './App';

import VueRouter from 'vue-router';
import router from './router';

import '@/assets/vanilla/build.scss';
import '@/assets/css/maketep.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
