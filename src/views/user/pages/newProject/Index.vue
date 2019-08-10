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
			'addProjectImages',
			'addProjectFiles',
			'showSuccessMsg', 
			'showErrorMsg',
			'getNewProjectUrl',
		]),

		async submitProject(project){

			project.user 	= this.user.id;
			project.url 	= await this.getNewProjectUrl(project.name);
			project.images 	= await this.addProjectImages(project.images);
			project.files 	= await this.addProjectFiles(project.files);
			
			this.addProject(project)
			.then((id) => {
				this.showSuccessMsg('Projeniz Eklendi...');
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

