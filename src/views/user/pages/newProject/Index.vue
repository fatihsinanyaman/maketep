<template>
	<div>
		<div class="row">
			
			<div class="col-12 page-title">
				<h2>Yeni Proje</h2>
				<hr>
			</div>

			<div class="col-12">
				<project-form @submit="submitProject" />
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

	methods: {

		...mapActions([
			'addProject',
			'addProjectImages'
		]),

		async submitProject(project){

			await this.addProjectImages(project.images);
			return;
			
			this.addProject(project)
			.then((id) => {
				console.log('eklend', id);
			})
			.catch((error) => {
				this.showErrorMsg(error.message);
			});

		}

	},

	async created(){
	}

}

</script>

