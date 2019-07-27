<template>
	<div id="main-content" class="p-strip--image is-dark is-deep onboarding-wrapper"> 
		<div class="row"> 
			<div class="col-6">
				<h1 class="p-heading--stylized">
					Maketep, <b>Makerların</b> projelerini paylaşarak ve birbirleri ile etkileşim halinde oldukları online platform...
				</h1> 
			</div>
			<div class="col-6">
				<div class="p-strip">
					<div class="p-card">
						<div class="row">
							<nav class="p-tabs">
								<ul class="p-tabs__list" role="tablist">
									<li class="p-tabs__item" role="presentation">
										<a @click="openTab('signup')" class="p-tabs__link" tabindex="0" role="tab" aria-controls="section1" :aria-selected="signupTabStatus">
										Kayıt Ol
										</a>
									</li>
									<li class="p-tabs__item" role="presentation">
										<a @click="openTab('login')" class="p-tabs__link" tabindex="1" role="tab" aria-controls="section2" :aria-selected="loginTabStatus">
										Giriş Yap
										</a>
									</li>
								</ul>
							</nav>
						</div>
						<transition name="fade">
							<signup v-if="signupTabStatus" />
							<login v-else />
						</transition>
					</div> 
				</div>
			</div>
		</div> 
	</div>
</template>

<script>

import Signup from './Signup';
import Login from './Login';

export default {
	
	name: 'Onboarding',

	data(){
		return {
			currentTab: 'signup', // ['signup', 'login']
		}
	},

	computed: {

		signupTabStatus(){
			return (this.currentTab === 'signup');
		},

		loginTabStatus(){
			return (this.currentTab === 'login');
		}

	},
	
	components: {
		Signup,
		Login
	},

	methods: {

		openTab(tab){
			this.currentTab = tab;
		}

	}

}



</script>

<style scoped>
	.onboarding-wrapper{
		background-image: url('https://assets.ubuntu.com/v1/b54d869a-vanilla-grad-background-min.png');
		background-position: 75% 50%;
	}
	.onboarding-wrapper .p-strip{
		padding-top:0;
	}
</style>