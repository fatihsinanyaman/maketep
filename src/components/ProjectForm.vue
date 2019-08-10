<template>
	<form class="p-form" @submit.prevent="submitProject">
		<div class="row">
			
			<div class="col-12">
				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('name') }]">
					<label for="name" class="is-required">Proje Adı</label>
					<input 
						class="p-form-validation__input"
						data-vv-as="Proje Adı"
						type="text" 
						id="name" 
						placeholder="Proje Adı..."
						name="name"
						v-validate="'required|min:2'"
						v-model="project.name"
					>
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('name')">
						<strong>Hata:</strong> {{ errors.first('name') }}
					</p>
				</div>
			</div>
			<div class="col-12">
				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('description') }]">
					<label for="description" class="is-required">Proje Açıklaması</label>
					<text-editor 
						data-vv-as="Proje Açıklaması"
						id="description" 
						name="description"
						v-validate="'required|min:10'"
						v-model="project.description"
					/>
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('description')">
						<strong>Hata:</strong> {{ errors.first('description') }}
					</p>
				</div>
			</div>

			<div class="col-12">
				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('images') }]">
					<label for="description" class="is-required">Görseller</label>
					<p class="p-form-help-text">En az 1 görsel eklemelisiniz.</p>
					<multiple-image-uploads 
						v-model="project.images"
					/>
				</div>
			</div>

			<div class="col-6">
				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('youtube_url') }]">
					<label for="youtube_url">Youtube Video URL</label>
					<input 
						class="p-form-validation__input"
						data-vv-as="Youtube URL"
						type="text" 
						id="youtube_url" 
						placeholder="Varsa youtube video adresini yazınız..."
						name="youtube_url"
						v-validate="'url'"
						v-model="project.video_url"
					>
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('youtube_url')">
						<strong>Hata:</strong> {{ errors.first('youtube_url') }}
					</p>
				</div>
			</div>

			<div class="col-6">
				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('category') }]">
			
					<label for="category" class="is-required">Kategori</label>
					
					<select 
						class="p-form-validation__input"
						name="category" 
						id="category"
						data-vv-as="Kategori"
						v-validate="'required'"
						v-model="project.category"
					>
						<option :value="category.id" v-for="(category, keyCat) in categories">{{ category.category }}</option>
					</select>
					
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('category')">
						<strong>Hata:</strong> {{ errors.first('category') }}
					</p>

				</div>
			</div>

			<div class="col-6">
				<div :class="['p-form__control', 'tags']">
			
					<label for="tags">Etiketler</label>
					
					<vue-tags-input
						id="tags"
						v-model="singleTag"
						:tags="selectedTags"
						placeholder="Etiketi yazın ve 'Enter'a basınız..."
						@tags-changed="newTags => selectedTags = newTags"
						:autocomplete-items="tagsAutoCompletedItems"
					/>

				</div>
			</div>

			<div class="col-6">
				<div :class="['p-form__control']">
					<label for="files">Dosyalar</label>
					<multiple-files-upload 
						id="files"
						v-model="project.files"
					/>
				</div>
			</div>

			<div class="col-12">
				<button class="p-button--positive u-float-right">Kaydet</button>
			</div>

		</div>
	</form>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';

import TextEditor from '@/components/TextEditor';
import MultipleImageUploads from '@/components/MultipleImageUploads';
import MultipleFilesUpload from '@/components/MultipleFilesUpload';
import VueTagsInput from '@johmun/vue-tags-input';

import * as Constants from '@/store/constants';

export default {

	name: 'NewProject',

	data(){
		return {
			project: JSON.parse(JSON.stringify(Constants.PROJECT)),
			singleTag: '', // single tag item required for tags-input
			selectedTags: [],
		}
	},

	computed: {

		...mapState([
			'categories',
			'tags'
		]),

		tagsAutoCompletedItems(){
			return this.tags.map(function(t){
				return {
					text: t.tag
				}
			});	
		},

	},


	components: {
		TextEditor,
		MultipleImageUploads,
		MultipleFilesUpload,
		VueTagsInput
	},

	methods: {

		...mapActions([
			'fetchTags',
			'getTagIds'
		]),

		async submitProject(){
			
			const valResponse = await this.$validator.validateAll();

			if(!valResponse){
				return;
			}
			
			this.project.tags = await this.getTagIds(this.selectedTags.map(t => t.text));
		
			this.$emit('submit', this.project);

		}

	},

	async created(){
		this.fetchTags();
	}

}

</script>

<style>
	.tags input{
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}
</style>
