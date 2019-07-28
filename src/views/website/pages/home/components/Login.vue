<template>
	<div>
		<transition name="fade">

			<form class="p-form" @submit.prevent="login" v-if="!forgotPassStatus" data-vv-scope="login" key="login">

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
						v-model="user.user_email"
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
						v-validate="'required|min:5'"
						v-model="user.user_password"
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
								name="remember"
							>
							<label for="accept">Beni Hatırla!</label>
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
						v-model="user.user_email"
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

export default {

	name: 'Login',

	data(){
		return {
			forgotPassStatus: false,
			user: {
				user_email: 'fatihsinanyaman@gmail.com',
				user_password: '123456',
			}
		}
	},

	methods: {

		async login(){

			const validation = await this.$validator.validateAll('login');

			if(!validation){
				return false;
			}

			firebase.auth().signInWithEmailAndPassword(this.user.user_email, this.user.user_password)
			.then((user) => {
				console.log('user => ', user);
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

			firebase.auth().sendPasswordResetEmail(this.user.user_email)
			.then(() => {
				console.log('gonderid');
			})
			.catch((error) => {
				console.log('hata => ', error);
			});

		},

		async changeForgotPassStatus(){
			this.$nextTick(() => {
				this.forgotPassStatus = !this.forgotPassStatus;
			})
		}

	}

}

</script>
