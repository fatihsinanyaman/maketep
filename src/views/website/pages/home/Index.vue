<template>
	<div>
		<onboarding />
		<featured-projects />
	</div>
</template>

<script>

import FeaturedProjects from './components/FeaturedProjects';
import Onboarding from './components/Onboarding';

export default {
	name: 'Home',
	components: {
		FeaturedProjects,
		Onboarding
	}
}
</script>
