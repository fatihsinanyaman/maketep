<template>
		<div>
			<router-view name="header" />
			<router-view />
			<router-view name="footer" />
			<alert />
			<loading />
		</div>
</template>

<script>

import Alert from './components/Alert';
import Loading from './components/Loading';

export default {

	name: 'app',

	components: {
		Alert,
		Loading
	}

}
</script>
