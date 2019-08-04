<template>
	<div>
		<h1>test</h1>

		<span class="p-contextual-menu--left" v-click-outside="clickOutside">
		    <button @click="change" href="#" class="p-contextual-menu__toggle has-icon u-action-bt" aria-controls="#menu-3" :aria-expanded="String(!status)" aria-haspopup="true">
		    	<img src="https://avatars2.githubusercontent.com/u/6079978?s=40&v=4">
		    	<i class="p-icon--contextual-menu"></i>
			</button>
		    <span class="p-contextual-menu__dropdown" id="menu-3" :aria-hidden="String(status)" aria-label="submenu">
		        <span class="p-contextual-menu__group">
		            <a class="p-contextual-menu__link">Profilim</a>
		            <a class="p-contextual-menu__link">Projelerim</a>
		            <a class="p-contextual-menu__link">Favorilerim</a>
		            <a class="p-contextual-menu__link">Çıkış</a>
		        </span>
		    </span>
		</span>

		
		    

	</div>
</template>

<script>

import ClickOutside from 'vue-click-outside'

export default {

	name: 'test',

	data(){
		return {
			status: true,
		}
	},

	directives: {
		ClickOutside
	},

	methods: {

		change(){
			this.status = !this.status;
		},

		clickOutside(){
			if(!this.status){
				this.change();
			}
		}

	}

}
</script>

<style>
	.u-action-bt i{
		margin-left: 10px;
		margin-top: -13px;
	}
</style>