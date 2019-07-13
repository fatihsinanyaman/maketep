<template>
	<header id="navigation" class="p-navigation">
		<div class="p-navigation__banner">
			<div class="p-navigation__logo">
				<a class="p-navigation__link" href="#">
					<!-- <img class="p-navigation__image" src="https://assets.ubuntu.com/v1/5d6da5c4-logo-canonical-aubergine.svg" alt="" width="95"> -->
					<img :src="require('@/assets/imgs/maketep.png')" width="136" />
				</a>
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
				<li class="p-navigation__link" role="menuitem"><a href="#">+ Proje Ekle</a></li>
			</ul>
			<search />
		</nav>
	</header>
	<!-- <header class="row">
		<div class="col-3">
			<img :src="require('@/assets/imgs/maketep.png')" />
		</div>
		<div class="col-5">
			<ul>
				<li><a href="#">Keşfet</a></li>
				<li><a href="#">+ Proje Ekle</a></li>
			</ul>
		</div>	
		<div class="col-4">
			<search />
		</div>
	</header> -->
</template>

<script>

import Search from '@/components/Search';

export default {

	name: 'Header',

	components: {
		Search
	}

}
</script>
