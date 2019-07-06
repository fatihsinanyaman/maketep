<template>
	<div id="app">
		<router-view />
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<h1>Maketep</h1>
					<h2>Maketep</h2>
					<h3>Maketep</h3>
					<el-button type="success">Success</el-button>
					<el-link type="primary">primary</el-link>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>

export default {
	name: 'app',
}
</script>
