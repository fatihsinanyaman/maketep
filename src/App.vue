<template>
		<div>
			<router-view name="header" />
			<router-view />
			<router-view name="footer" />
			<alert />
		</div>
</template>

<script>

import Alert from './components/Alert';

export default {

	name: 'app',

	components: {
		Alert
	}

}
</script>
