<template>
	<div>
		<input 
			type="file" 
			multiple 
			@change="inputChanges($event.target.files)"
			:ref="inputRef"
		>

		<ul class="p-list">
			<li v-for="(file, keyFile) in files" :key="keyFile" class="p-list__item is-ticked">
				
				{{ file.name }}

				<a @click="removeFile(keyFile)">
					<i class="p-icon--error"></i>
				</a>

			</li>
		</ul>

	</div>
</template>

<script>

export default {

	name: 'multipleFilesUpload',

	data(){
		return {
			files: [],
			inputRef: Math.random().toString(36).replace('0.', '').substring(0, 10).toUpperCase()
		}
	},

	components: {
	},

	watch: {
		
		files: function(files) {
			this.$emit('input', files)
		}

	},

	methods: {

		inputChanges(files){
			this.files = this.files.concat(Array.from(files));
			this.$refs[this.inputRef].value = null;
		},

		removeFile(key){
			this.files.splice(key, 1);
		}

	}

}
</script>