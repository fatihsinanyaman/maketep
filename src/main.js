import Vue from 'vue';
import App from './App';

import VueRouter from 'vue-router';
import router from './router';

import store from './store';

import VeeValidate from 'vee-validate';

import firebase from 'firebase';
import { FBCONFIG } from './fbConfig';

import '@/assets/vanilla/build.scss';
import '@/assets/css/maketep.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VeeValidate);

firebase.initializeApp(FBCONFIG);

let app = '';

firebase.auth().onAuthStateChanged(() => {

	if(!app){
		app = new Vue({
			render: h => h(App),
			router,
			store,
		}).$mount('#app');
	}

});
