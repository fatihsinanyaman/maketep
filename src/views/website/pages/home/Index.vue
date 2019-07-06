<template>
	<div>
		<h1>homepage</h1>
		{{ test }}
	</div>
</template>

<script>

//import test from '@components/test';

export default {
	name: 'Home',
	
	computed: {
		test: () => process.env.VUE_APP_ALL_ENVIRONMENT
	},

	created(){
		console.table(process.env);
	}
}
</script>
