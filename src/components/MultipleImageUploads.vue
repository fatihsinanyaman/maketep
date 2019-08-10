<template>
	<div>
		<input 
			type="file" 
			multiple 
			@change="inputChanges($event.target.files)"
			accept="image/*" 
			:ref="inputRef"
		>

		<ul class="p-inline-images image-list">
			<li v-for="(image, keyImage) in images" :key="keyImage" class="p-inline-images__item">
				
				<img 
					class="p-image--shadowed"
					:src="image"  
				/>

				<a @click="removeImage(keyImage)">
					<i class="p-icon--error"></i>
				</a>

			</li>
		</ul>

	</div>
</template>

<script>

export default {

	name: 'multipleImageUploads',

	data(){
		return {
			images: [],
			inputRef: Math.random().toString(36).replace('0.', '').substring(0, 10).toUpperCase()
		}
	},

	components: {
	},

	watch: {
		
		images: function(images) {
			this.$emit('input', images)
		}

	},

	methods: {

		inputChanges(files){

			Array.from(files).forEach((file, keyFile) => {
				this.addFile(file);
			});

		},

		addFile(file) {

			const reader = new FileReader();
			reader.onload = (e) => {
				this.images.push(e.target.result);
			}
			
			reader.readAsDataURL(file);

			this.$refs[this.inputRef].value = null;

		},

		removeImage(key){
			this.images.splice(key, 1);
		}

	}

}
</script>

<style>
	.image-list li{
		position: relative;
		overflow: visible;
	}
	.image-list li a {
		position: absolute;
		top: -11px;
    	right: -8px;
		z-index: 1;
	}
	.image-list li img{
		width: 100px;
		height: 100px;
	}
</style>