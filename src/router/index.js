import VueRouter from 'vue-router';
import firebase from 'firebase';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

/* Website */
import Home from '@/views/website/pages/home/Index';
import NotFound from '@/views/website/pages/404/Index';

/* User */
import UserWrapper from '@/views/user/UserWrapper';
import Profile from '@/views/user/pages/profile/Index';

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
	{
		path: `/account`,
		name: 'UserWrapper',
		components: {
			default: UserWrapper,
			header: Header,
			footer: Footer,
		},
		meta: {
			requiresAuth: true
		},
		children: [
			{
				path: `profile`,
				name: 'Profile',
				component: Profile
			},
		]	
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound
	},
	{
		path: '*',
		redirect: '/404'
	}
	
];

const router = new VueRouter({
	routes,
	mode: 'history',
});

router.beforeEach((to, from, next) => {

	const firebaseUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(p => p.meta.requiresAuth);

	if(requiresAuth && !firebaseUser){
		next('/');
	}else{
		next();
	}

});

export default router;