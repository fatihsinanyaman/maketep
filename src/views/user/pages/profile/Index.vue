<template>
	<div>
		<div class="row">
			<div class="col-12 page-title">
				<h2>Hesap Ayarları</h2>
				<hr>
			</div>
		</div>
		<div class="row">
			
			<div class="col-4">
				
				<div>
					<croppa 
						v-model="imageCroppa"
						:width="300"
						:height="300"
						:initial-image="initialImage"
					/>
				</div>

			</div>
			
			<div class="col-8">
			
				<form class="p-form" @submit.prevent="updateProfile">

					<div class="p-form__group row">
						
						<div class="col-6">
							<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('name') }]">
								<label for="name">Ad-Soyad</label>
								<input 
									class="p-form-validation__input"
									data-vv-as="Ad-Soyad"
									type="text" 
									id="name" 
									placeholder="Ad-Soyad"
									name="name"
									v-validate="'required|min:2'"
									v-model="displayName"
								>
								<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('name')">
									<strong>Hata:</strong> {{ errors.first('name') }}
								</p>
							</div>
						</div>

						<div class="col-6">
							<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('email') }]">
								<label for="email">Email</label>
								<input 
									class="p-form-validation__input"
									data-vv-as="Email"
									type="text" 
									id="email" 
									placeholder="E-mail adresiniz..."
									name="email"
									v-validate="'required|email'"
									v-model="email"
								>
								<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('email')">
									<strong>Hata:</strong> {{ errors.first('email') }}
								</p>
							</div>
						</div>

					</div>

					<div class="p-form__group row">
						<div class="col-12">
							<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('bio') }]">
								<label for="bio">Bio</label>
								<textarea 
									class="p-form-validation__input"
									data-vv-as="Bio"
									id="bio"
									name="bio"
									placeholder="Kendiniz hakkında kısa bir açıklama yazabilirsiniz..."
									v-validate="'required'" 
									v-model="bio"
								></textarea>
								<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('bio')">
									<strong>Hata:</strong> {{ errors.first('bio') }}
								</p>
							</div>
						</div>
					</div>

					<div class="p-form__group row">
						<div class="col-12">
							<label> 
								Parolayı Değiştir
								<input type="checkbox" class="p-switch" v-model="passwordChangeStatus">
								<div class="p-switch__slider"></div>
							</label>
						</div>
					</div>

					<transition name="fade">
						<div class="p-form__group row" v-if="passwordChangeStatus">
						
							<div class="col-6">
								<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('newPassword') }]">
									<label for="newPassword">Yeni Parola</label>
									<input 
										class="p-form-validation__input"
										data-vv-as="Parola"
										id="newPassword" 
										type="password" 
										placeholder="******"
										name="newPassword"
										ref="newPassword"
										v-validate="'required|min:6'"
										v-model="newPassword"
									>
									<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('newPassword')">
										<strong>Hata:</strong> {{ errors.first('newPassword') }}
									</p>
								</div>
							</div>

							<div class="col-6">
								<div :class="['p-form__control', 'p-form-validation', { 'is-error': errors.has('newPasswordCheck') }]">
									<label for="newPasswordCheck">Yeni Parola (tekrar)</label>
									<input 
										class="p-form-validation__input"
										data-vv-as="Parola"
										id="newPasswordCheck" 
										type="password" 
										placeholder="******"
										name="newPasswordCheck"
										v-validate="'required|min:6|confirmed:newPassword'"
									>
									<p class="p-form-validation__message" id="input-error-message-inline" role="alert" v-if="errors.has('newPasswordCheck')">
										<strong>Hata:</strong> {{ errors.first('newPasswordCheck') }}
									</p>
								</div>
							</div>

						</div>
					</transition>
					
					<button class="p-button--positive">Kaydet</button>

				</form>

			</div>
		</div>
	</div>
</template>

<script>


import { db } from '@/main';
import firebase from 'firebase';
import { mapActions, mapState } from 'vuex';

export default {

	name: 'Profile',

	data(){
		return {
			displayName: null,
			email: null,
			initialImage: '',
			bio: null,
			imageCroppa: {},
			passwordChangeStatus: false,
			newPassword: '',
		}
	},

	computed: {

		...mapState([
			'user'
		]),

	},

	components: {
		
	},

	methods: {

		...mapActions([
			'updateAuthProfile',
			'updateUserEmail',
			'updateUserAdditionalInfo',
			'showErrorMsg',
			'showSuccessMsg',
			'uploadProfileImage',
			'updateUserPassword'
		]),

		async updateProfile(){

			const validationStatus = await this.$validator.validateAll();

			if(!validationStatus){
				return;
			}

			let promiseList = [];

			// authOtherInformations
			if(this.displayName !== this.user.displayName){

				const updateAuthProfile = this.updateAuthProfile({
					displayName: this.displayName
				});

				promiseList.push(updateAuthProfile);

			}

			// Email
			if(this.email !== this.user.email){

				const updateUserEmail = this.updateUserEmail(this.email);

				promiseList.push(updateUserEmail);

			}

			// Firestore user info
			if(this.bio !== this.user.bio){

				const updateUserAdditionalInfo = this.updateUserAdditionalInfo({
					bio: this.bio
				});

				promiseList.push(updateUserAdditionalInfo);

			}

			// change password
			if(this.passwordChangeStatus){
				const updateUserPassword = this.updateUserPassword(this.newPassword);
				promiseList.push(updateUserPassword);
			}

			//Profile Image
			const imageFile 			= await this.imageCroppa.promisedBlob('image/jpeg');
			const uploadProfileImage 	= this.uploadProfileImage(imageFile);
			promiseList.push(uploadProfileImage);
			
			let self = await this;	

			Promise.all(promiseList)
			.then((results) => {
				this.passwordChangeStatus = false;
				self.showSuccessMsg('Hesabınız güncellendi!');
			})
			.catch((error) => {
				self.showErrorMsg(error.message);
			})

		},

	},

	async created(){

		this.displayName 	= this.user.displayName;
		this.email 			= this.user.email;
		this.bio 			= this.user.bio;
		this.initialImage 	= this.user.photoURL;

	}

}

</script>
