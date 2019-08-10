<template>
	<quill-editor 
		class="text-editor"
		@change="onEditorChange($event)"
		ref="textEditor"
		:options="editorOptions"
		v-model="content"
		placeholder="Açıklamayı buraya yazınız..."
	>
	</quill-editor>
</template>

<script>

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {

	name: 'textEditor',

	data(){
		return {
			editorOptions: {
				theme: 'snow',
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						['code-block'],
						[{ 'list': 'ordered' }, { 'list': 'bullet' }],
						[{ 'script': 'sub' }, { 'script': 'super' }],
						[{ 'indent': '-1' }, { 'indent': '+1' }],
						[{ 'direction': 'rtl' }],
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
						[{ 'color': [] }, { 'background': [] }],
						[{ 'align': [] }],
						['link', 'image']
					],
				}
			},
			content: ''
		}
	},

	props: {
		value: {
			type: String
		}
	},

	components: {
		quillEditor
	},

	methods: {

		onEditorChange(e){
			this.$emit('input', e.html);
		}

	},

	created(){
		this.content = this.value;
	}

}
</script>

<style>
	.ql-snow .ql-formats{
		vertical-align: top;
	}
	.text-editor .ql-container, .text-editor .ql-editor{
		min-height: 200px; 
	}
</style>