<template>
	<div>
		<onboarding v-if="!isLoggedIn" />
		<featured-projects />
	</div>
</template>

<script>

import FeaturedProjects from './components/FeaturedProjects';
import Onboarding from './components/Onboarding';

import { mapState } from 'vuex';

export default {
	
	name: 'Home',
	
	components: {
		FeaturedProjects,
		Onboarding
	},

	computed: {

		...mapState([
			'isLoggedIn'
		]),

	}	

}
</script>
