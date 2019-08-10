<template>
	<header id="navigation" class="p-navigation">
		<div class="p-navigation__banner">
			<div class="p-navigation__logo">
				<router-link tag="a" class="p-navigation__link" :to="{ name: 'Home' }">
					<img :src="require('@/assets/imgs/maketep.png')" width="136" />
				</router-link>
			</div>
			<a href="#navigation" class="p-navigation__toggle--open" title="menu">Menu</a>
			<a href="#navigation-closed" class="p-navigation__toggle--close" title="close menu">Close menu</a>
		</div>
		<nav class="p-navigation__nav">
			
			<span class="u-off-screen">
				<a href="#main-content">Jump to main content</a>
			</span>
			<ul class="p-navigation__links" role="menu">
				<li class="p-navigation__link" role="menuitem"><a href="#">Keşfet</a></li>
				<li class="p-navigation__link" role="menuitem">
					<router-link :to="{ name: 'NewProject'}">+ Proje Ekle</router-link>
				</li>
			</ul>
			
			<search />

			<user-actions v-if="isLoggedIn" />

		</nav>
	</header>
</template>

<script>

import Search from '@/components/Search';
import UserActions from '@/components/UserActions';
import { mapGetters, mapState } from 'vuex';

export default {

	name: 'Header',

	computed: {

		...mapState([
			'isLoggedIn'
		]),

		...mapGetters([
			'userImage'
		]),

	},

	components: {
		Search,
		UserActions
	}

}
</script>
