<template>
		<div>
			<template v-if="appLoadStatus">
				<router-view name="header" />
				<router-view />
				<router-view name="footer" />
			</template>
			<alert />
			<loading />
		</div>
</template>

<script>

import Alert from './components/Alert';
import Loading from './components/Loading';

export default {

	name: 'app',

	data(){
		return {
			appLoadStatus: false
		}
	},

	components: {
		Alert,
		Loading
	},

	async created(){
		await this.$store.dispatch('fetchAuth');
		this.appLoadStatus = true;
	}

}
</script>
