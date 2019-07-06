import Vue from 'vue';
import App from './App';

// Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/maketep.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	render: h => h(App),
}).$mount('#app')
