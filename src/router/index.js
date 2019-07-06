import VueRouter from 'vue-router';
import Home from '../views/website/pages/home/Index';

const routes = [
	{
		path: `/`,
		name: 'Home',
		component: Home
	},
];

const router = new VueRouter({
	routes
});

export default router;