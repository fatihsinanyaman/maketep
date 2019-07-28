<template>
	<div id="mAlert" :class="{ hide: !displayStatus }">
		
		<div class="p-notification--negative" v-if="alert.error.status">
			<p class="p-notification__response">
				<span class="p-notification__status">Hata:</span>{{ alert.error.msg }}
			</p>
			<button class="p-icon--close" @click="closeAlert('error')">Close</button>
		</div>

		<transition name="fade">
			<div class="p-notification--positive" v-if="alert.success.status">
				<p class="p-notification__response">
					<span class="p-notification__status">Başarılı:</span>{{ alert.success.msg }}
				</p>
				<button class="p-icon--close" @click="closeAlert('success')">Close</button>
			</div>
		</transition>

	</div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
export default {

	name: 'Alert',

	data(){
		return {

		}
	},

	computed: {
		
		...mapState(['alert']),

		displayStatus(){
			return (this.alert.success.status || this.alert.error.status);
		}
	},

	methods: {
		...mapActions(['closeAlert'])
	}

}
</script>

<style scoped>
	
	#mAlert {
		position: fixed;
		width: 50%;
		max-width: 400px;
		min-height: 50px;
		bottom: 0;
		right: 0;
	}
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.hide{
		display: none;
	}

</style>
