<template>
	<form class="p-search-box" @submit.prevent="search">
		<input type="search" class="p-search-box__input" name="search" placeholder="Proje Ara...">
		<button type="submit" class="p-search-box__button" alt="search"><i class="p-icon--search"></i></button>
	</form>
</template>

<script>

export default {

	name: 'Search',

	methods: {

		search(){
			console.log('geldi');
		}

	}

}
</script>
