<template>
	<form class="p-search-box" @submit.prevent="search">
		
		<input 
			type="search" 
			class="p-search-box__input" 
			name="search" 
			placeholder="Proje Ara..."
			v-validate="'required|min:2'"
		>
		
		<button type="submit" class="p-search-box__button" alt="search"><i class="p-icon--search"></i></button>

	</form>
</template>

<script>

export default {

	name: 'Search',

	methods: {

		async search(){

			const validation = await this.$validator.validateAll();

			if(!validation){
				return false;
			}

			console.log('geldi');
		}

	}

}
</script>
