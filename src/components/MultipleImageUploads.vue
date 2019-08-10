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

import { mapActions } from 'vuex';

export default {

	name: 'multipleImageUploads',

	data(){
		return {
			images: [],
			inputRef: Math.random().toString(36).replace('0.', '').substring(0, 10).toUpperCase()
		}
	},

	computed: {
		base64List(){
			return this.images.map(i => i.split(',')[1]);
		}
	},

	watch: {
		
		images: function() {
			this.$emit('input', this.base64List);
		}

	},

	methods: {

		...mapActions(['showErrorMsg']),

		inputChanges(files){

			let pList = [];

			Array.from(files).forEach((file, keyFile) => {
				pList.push(this.addFile(file));
			});

			this.$store.dispatch('wait/start', 'loadImages');

			Promise.all(pList)
			.then((newImages) => {
				this.images = this.images.concat(newImages);
			})
			.catch(() => {
				this.showErrorMsg('Görseller yüklenemedi!');
			})
			.finally(() => {
				this.$store.dispatch('wait/end', 'loadImages');
				this.$refs[this.inputRef].value = null;
			});


		},

		addFile(file) {

			return new Promise((resolve, reject) => {

				const reader = new FileReader();
				reader.onload = async (e) => {
					const rszImg = await this.resizebase64(e.target.result, 1024, 1024);
					resolve(rszImg);
				}
				
				reader.readAsDataURL(file);		

			});

		},

		removeImage(key){
			this.images.splice(key, 1);
		},

		resizebase64(base64, maxWidth, maxHeight){

			return new Promise((resolve, reject) => {

				// Create and initialize two canvas
				var canvas 			= document.createElement("canvas");
				var ctx 			= canvas.getContext("2d");
				var canvasCopy 		= document.createElement("canvas");
				var copyContext 	= canvasCopy.getContext("2d");

				// Create original image
				var img = new Image();
				img.src = base64;

				img.onload = () => {

					// Determine new ratio based on max size
					var ratio = 1;
					if(img.width > maxWidth)
					ratio = maxWidth / img.width;
					else if(img.height > maxHeight)
					ratio = maxHeight / img.height;

					// Draw original image in second canvas
					canvasCopy.width 	= img.width;
					canvasCopy.height 	= img.height;
					copyContext.drawImage(img, 0, 0);

					// Copy and resize second canvas to first canvas
					canvas.width 	= img.width * ratio;
					canvas.height 	= img.height * ratio;
					
					ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

					resolve(canvas.toDataURL("image/jpeg"));

				};

				img.onerror = reject;

			});

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