import Vue from 'vue';
import App from './App';

import VueRouter from 'vue-router';
import router from './router';

import VueWait from 'vue-wait';

import store from './store';

import VeeValidate from 'vee-validate';

import { firestorePlugin } from 'vuefire';
import firebase from 'firebase';
import 'firebase/firestore'
import { FBCONFIG } from './fbConfig';

import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';

import '@/assets/vanilla/build.scss';
import '@/assets/css/maketep.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueWait);
Vue.use(Croppa);

Vue.use(firestorePlugin);
firebase.initializeApp(FBCONFIG);
export const db = firebase.firestore();


let app = '';

firebase.auth().onAuthStateChanged(() => {

	if(!app){
		app = new Vue({
			render: h => h(App),
			router,
			store,
			wait: new VueWait({
				useVuex: true,
			}),
		}).$mount('#app');
	}

});
