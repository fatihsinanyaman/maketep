<template>
	<div>
		<transition name="fade">

			<form class="p-form" @submit.prevent="submitLogin" v-if="!forgotPassStatus" data-vv-scope="login" key="login">

				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('login.email') }]">
					<label for="email">Email</label>
					<input 
						class="p-form-validation__input"
						data-vv-as="Email"
						data-vv-scope="login"
						type="text" 
						id="email" 
						placeholder="ahmet@gmail.com"
						name="email"
						v-validate="'required|email'"
						v-model="user_email"
					>
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('login.email')">
						<strong>Hata:</strong> {{ errors.first('login.email') }}
					</p>
				</div>

				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('login.password') }]">
					<label for="password">Parola</label>
					<input 
						class="p-form-validation__input"
						data-vv-as="Parola"
						data-vv-scope="login"
						id="password" 
						type="password" 
						placeholder="******"
						name="password"
						v-validate="'required'"
						v-model="user_password"
					>
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('login.password')">
						<strong>Hata:</strong> {{ errors.first('login.password') }}
					</p>
				</div>

				<div class="p-form__control p-form-validation">
					<div class="row">
						<div class="col-8 col-small-12">
							<input 
								id="remember" 
								type="checkbox" 
								v-model="rememberStatus"
							>
							<label for="remember">Beni Hatırla!</label>
						</div>
						<div class="col-4 col-small-12">
							<div class="u-align--right">
								<a @click="changeForgotPassStatus">Parolamı unuttum!</a>
							</div>
						</div>
					</div>

				</div>
				
				<button class="p-button--positive">Giriş Yap!</button>

			</form>

			<form class="p-form" @submit.prevent="sendPassRemember" data-vv-scope="rememberP" key="remember" v-else>

				<div class="row">
					<div class="col-10">
						<b>Parolamı Unutum</b>
						<p>E-mail adresine yeni parola oluşturabilmen için bir mail göndereceğiz.</p>
					</div>
					<div class="col-2">
						<div class="u-align--right">
							<button class="p-button has-icon" type="button" @click="changeForgotPassStatus">
								<i class="p-icon--error"></i>
							</button>
						</div>
					</div>
				</div>

				<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('rememberP.rememberEmail') }]">
					<label for="rememberEmail">Email</label>
					<input 
						class="p-form-validation__input"
						data-vv-as="Email"
						data-vv-scope="rememberP"
						type="text" 
						id="rememberEmail" 
						placeholder="ahmet@gmail.com"
						name="rememberEmail"
						v-validate="'required|email'"
						v-model="user_email"
					>
					<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('rememberP.rememberEmail')">
						<strong>Hata:</strong> {{ errors.first('rememberP.rememberEmail') }}
					</p>
				</div>
				
				<button class="p-button--positive" type="submit">Gönder</button>

			</form>

		</transition>

	</div>
</template>

<script>

import firebase from 'firebase';
import {mapActions} from 'vuex';

export default {

	name: 'Login',

	data(){
		return {
			forgotPassStatus: false,
			user_email: '',
			user_password: '',
			rememberStatus: false
		}
	},

	methods: {

		...mapActions(['login', 'sendResetPasswordEmail']),

		async submitLogin(){

			const validation = await this.$validator.validateAll('login');

			if(!validation){
				return false;
			}

			this.login({user_email: this.user_email, user_password: this.user_password})
			.then((user) => {

				if(this.rememberStatus){
					this.setRememberToken();
				}else{
					this.removeRememberMeToken();
				}

				this.$router.push({
					name: 'Profile'
				});

			})
			.catch((error) => {
				console.log('error => ', error);
			});

		},

		async sendPassRemember(){

			const validation = await this.$validator.validateAll('rememberP');

			if(!validation){
				return false;
			}

			this.sendResetPasswordEmail(this.user_email)
			.then(() => {
				this.showSuccessMsg('Parola hatırlatma e-maili gönderildi, gelen kutunuzu kontrol ediniz...');
			})
			.catch((error) => {
				this.showErrorMsg(error.message);
			});

		},

		async changeForgotPassStatus(){
			this.$nextTick(() => {
				this.forgotPassStatus = !this.forgotPassStatus;
			})
		},

		setRememberToken(){

			const payload = {
				user_email: 	this.user_email,
				user_password: 	this.user_password
			}

			localStorage.setItem(process.env.VUE_APP_REMEMBER_TOKEN_NAME, window.btoa(JSON.stringify(payload)));

		},

		removeRememberMeToken(){
			localStorage.removeItem(process.env.VUE_APP_REMEMBER_TOKEN_NAME);
		},

		getRememberToken(){

			let rememberToken = localStorage.getItem(process.env.VUE_APP_REMEMBER_TOKEN_NAME);
			
			if(rememberToken){
				
				const loginData = JSON.parse(window.atob(rememberToken));

				this.user_email 		= loginData.user_email;
				this.user_password 		= loginData.user_password;
				this.rememberStatus 	= true;

			}

		}

	},

	created(){
		this.getRememberToken();
	}

}

</script>
