<template>
	<div class="user-actions-wrapper">
		<span class="p-contextual-menu--left" v-click-outside="clickOutside">
		    <button @click="change"class="p-contextual-menu__toggle has-icon u-action-bt" aria-controls="#user-action-menu" :aria-expanded="String(!status)" aria-haspopup="true">
		    	<img :src="userImage" :alt="user.displayName" :title="user.displayName">
		    	<span class="uname">{{ userFirstName }}</span>
		    	<i class="p-icon--contextual-menu"></i>
			</button>
		    <span class="p-contextual-menu__dropdown" id="user-action-menu" :aria-hidden="String(status)" aria-label="submenu">
		        <span class="p-contextual-menu__group">
		            <a class="p-contextual-menu__link">Profilim</a>
		            <a class="p-contextual-menu__link">Projelerim</a>
		            <a class="p-contextual-menu__link">Favorilerim</a>
		            <a @click="doLogout" class="p-contextual-menu__link">Çıkış</a>
		        </span>
		    </span>
		</span>
	</div>
</template>

<script>

import ClickOutside from 'vue-click-outside';
import { mapGetters, mapState, mapActions } from 'vuex';

export default {

	name: 'UserActions',

	data(){
		return {
			status: true,
		}
	},

	computed: {

		...mapState([
			'user'
		]),

		...mapGetters([
			'userFirstName',
			'userImage'
		]),

	},

	directives: {
		ClickOutside
	},

	methods: {

		...mapActions([
			'logout',
			'showSuccessMsg', 
			'showErrorMsg'
		]),

		change(){
			this.status = !this.status;
		},

		clickOutside(){
			if(!this.status){
				this.change();
			}
		},

		async doLogout(){

			this.logout()
			.then((results) => {
				
				this.$router.push({
					name: 'Home'
				});

			})
			.catch((error) => {
				this.showErrorMsg(error.message);
			})



		}

	}

}
</script>

<style scoped>

	.p-contextual-menu--left .p-contextual-menu__dropdown{
		left: auto;
	}
	
	.user-actions-wrapper{
		order: 1;
		margin-top: 0.35rem;
	}
	
	.u-action-bt{
		margin-bottom: 0;
	    padding-bottom: 0;
	}
	
	.u-action-bt i{
		margin-left: 10px;
		position: relative;
		top: -3px;
	}

	.u-action-bt img{
		width: 22px;
		height: 22px;

	}

	.uname{
		position: relative;
	    top: -5px;
	    padding-left: 10px;
	}

</style>