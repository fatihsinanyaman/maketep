import Vue from 'vue';
import App from './App';

import VueRouter from 'vue-router';
import router from './router';

import VeeValidate from 'vee-validate';


import '@/assets/vanilla/build.scss';
import '@/assets/css/maketep.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VeeValidate);

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
