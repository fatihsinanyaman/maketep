<template>
	<form class="p-form" @submit.prevent="doSignup">

		<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('name') }]">
			<label for="name">Ad-Soyad</label>
			<input 
				class="p-form-validation__input"
				data-vv-as="Ad-Soyad"
				type="text" 
				id="name" 
				placeholder="Ahmet Yıldırım"
				name="name"
				v-validate="'required|min:2'"
				v-model="user.user_fullname"
			>
			<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('name')">
				<strong>Hata:</strong> {{ errors.first('name') }}
			</p>
		</div>

		<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('email') }]">
			<label for="email">Email</label>
			<input 
				class="p-form-validation__input"
				data-vv-as="Email"
				type="text" 
				id="email" 
				placeholder="ahmet@gmail.com"
				name="email"
				v-validate="'required|email'"
				v-model="user.user_email"
			>
			<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('email')">
				<strong>Hata:</strong> {{ errors.first('email') }}
			</p>
		</div>

		<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('password') }]">
			<label for="password">Parola</label>
			<input 
				class="p-form-validation__input"
				data-vv-as="Parola"
				id="password" 
				type="password" 
				placeholder="******"
				name="password"
				v-validate="'required|min:5'"
				v-model="user.user_password"
			>
			<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('password')">
				<strong>Hata:</strong> {{ errors.first('password') }}
			</p>
		</div>
	
		<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('accept') }]">
			<input 
				checked
				data-vv-as="Kullanıcı sözleşmesi"
				id="accept" 
				type="checkbox" 
				name="accept"
				v-validate="'required'"
			>
			<label for="accept">Kullanıcı sözleşmesini okudum ve kabul ediyorum.</label>
			<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('accept')">
				<strong>Hata:</strong> {{ errors.first('accept') }}
			</p>
		</div>
		
		<button class="p-button--positive">Kayıt Ol!</button>

	</form>
</template>

<script>

import firebase from 'firebase';
import { mapActions } from 'vuex';

export default {

	name: 'Signup',

	data(){
		return {
			user: {
				user_email: 'fatihsinanyaman@gmail.com',
				user_password: '123456',
				user_fullname: 'Sinan Yaman',
			}
		}
	},

	methods: {

		...mapActions(['showSuccessMsg', 'showErrorMsg', 'signup']),

		async doSignup(){

			const validation = await this.$validator.validateAll();

			if(!validation){
				return false;
			}

			this.signup({
				user_email: this.user.user_email,
				user_password: this.user.user_password
			})
			.then((user) => {
				this.showSuccessMsg('Başarıyla Kayıt Oldunuz...');
			})
			.catch((error) => {
				this.showErrorMsg(error.message);
			});

		}

	},

}

</script>
