<template>
	<el-container id="app">
		<router-view name="header" />
		<el-main>
			<router-view />
		</el-main>
		<router-view name="footer" />
	</el-container>
</template>

<script>

export default {
	name: 'app',
}
</script>
