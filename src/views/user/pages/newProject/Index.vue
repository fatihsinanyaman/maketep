<template>
	<div>
		<div class="row">
			
			<div class="col-12 page-title">
				<h2>Yeni Proje</h2>
				<hr>
			</div>

			<div class="col-12">
				
				<form class="p-form" @submit.prevent="doSignup">

					<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('name') }]">
						<label for="name">Proje Adı</label>
						<input 
							class="p-form-validation__input"
							data-vv-as="Proje Adı"
							type="text" 
							id="name" 
							placeholder="Proje Adı..."
							name="name"
							v-validate="'required|min:2'"
						>
						<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('name')">
							<strong>Hata:</strong> {{ errors.first('name') }}
						</p>
					</div>

					<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('description') }]">
						<label for="description">Proje Açıklaması</label>
						<textarea
							class="p-form-validation__input"
							data-vv-as="Proje Açıklaması"
							id="description" 
							placeholder="Proje Açıklaması..."
							name="description"
							v-validate="'required|min:10'"
						></textarea>
						<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('description')">
							<strong>Hata:</strong> {{ errors.first('description') }}
						</p>
					</div>

				</form>

			</div>

		</div>
		<div class="row">
			
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {

	name: 'NewProject',

	data(){
		return {
		}
	},

	computed: {

		...mapState([
			'user'
		]),

	},

	methods: {

		...mapActions([
		]),

	},

	async created(){

	}

}

</script>
