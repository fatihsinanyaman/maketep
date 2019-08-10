<template>
	<div>
		<div class="row">
			
			<div class="col-12 page-title">
				<h2>Yeni Proje</h2>
				<hr>
			</div>

			<div class="col-12">
				
				<form class="p-form" @submit.prevent="addProject">
					<project-form />
				</form>

			</div>

		</div>
	</div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import ProjectForm from '@/components/ProjectForm';

export default {

	name: 'NewProject',

	data(){
		return {
		}
	},

	computed: {

		...mapState([
			'user',
		]),

	},


	components: {
		ProjectForm
	},

	// for child component validation
	provide() {
		return {
			$validator: this.$validator,
		}
	},

	methods: {

		async addProject(){

			const valResponse = await this.$validator.validateAll();

			console.log(valResponse);

		}

	},

	async created(){
	}

}

</script>

