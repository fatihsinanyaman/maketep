import VueRouter from 'vue-router';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

import Home from '@/views/website/pages/home/Index';

const routes = [
	{
		path: `/`,
		name: 'Home',
		components: {
			default: Home,
			header: Header,
			footer: Footer,
		}
	},
];

const router = new VueRouter({
	routes,
	mode: 'history',
});

export default router;