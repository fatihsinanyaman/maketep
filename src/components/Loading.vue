<template>
	<div id="mLoader" v-if="$wait.any">
		<div class="spinWrapper">
			<i class="p-icon--spinner u-animation--spin"></i>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Loading',
}
</script>

<style scoped>
	
	#mLoader{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 100;
		background: #fff;
		opacity: .9;
	}

	.spinWrapper{
		width: 30px;
		height: 27px;
		position: relative;
		top:50%;
		margin: -13px auto 0 auto;	
	}

</style>
