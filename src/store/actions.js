import firebase from 'firebase';
import { db } from '@/main';

import { slugify } from '@/helpers/slugify';

export default {

	async loadApp({dispatch}){

		await dispatch('authRefresh');
		await dispatch('fetchCategories');

	},

	login ({dispatch}, {user_email, user_password}){

		dispatch('wait/start', 'login');

		return new Promise((resolve, reject) => {

			firebase.auth().signInWithEmailAndPassword(user_email, user_password)
			.then(async (data) => {
				
				await dispatch('setUser');
				
				resolve(data.user);

			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'login');
			});

		});

	},

	sendResetPasswordEmail({}, user_email){

		return new Promise((resolve, reject) => {

			firebase.auth().sendPasswordResetEmail(user_email)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});

		});

	},

	signup({commit, dispatch}, user){

		dispatch('wait/start', 'signup');

		return new Promise((resolve, reject) => {

			firebase.auth().createUserWithEmailAndPassword(user.user_email, user.user_password)
			.then( async (data) => {

				var fbUser = firebase.auth().currentUser;

				await fbUser.updateProfile({
					displayName: user.user_fullname,
				});

				const username = await dispatch('getViableUsername', user.user_fullname);

				await db.collection('users').doc(fbUser.uid).set({
					bio: null,
					username: username
				});

				await dispatch('login', user);

				resolve(data.user);
			
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'signup');
			});

		});

	},

	logout({dispatch, commit}){

		dispatch('wait/start', 'logout');

		return new Promise((resolve, reject) => {

			firebase.auth().signOut()
			.then(() => {
				
				commit('SET_LOGGED_STATUS', false);
				
				resolve();

			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'logout');
			});

		});

	},

	authRefresh({dispatch, commit}){

		dispatch('wait/start', 'authRefresh');

		return new Promise(async (resolve, reject) => {

			const authUser = firebase.auth().currentUser;

			if (authUser) {

				await dispatch('setUser');
			
			}

			resolve();

			dispatch('wait/end', 'authRefresh');

		});

	},

	async setUser({commit}){

		const authUser = firebase.auth().currentUser;

		if (authUser) {

			const userSnapShot 	= await db.collection('users').doc(authUser.uid).get();
			const userOtherInfo = userSnapShot.data();

			const user = {
				id: authUser.uid,
				email: authUser.email,
				displayName: authUser.displayName,
				photoURL: authUser.photoURL,
				username: userOtherInfo.username,
				bio: userOtherInfo.bio
			};

			await commit('SET_USER', user);
			await commit('SET_LOGGED_STATUS', true);

		}

	},

	updateAuthProfile({ dispatch, commit}, payload){

		dispatch('wait/start', 'updateAuthProfile');

		return new Promise((resolve, reject) => {

			const user = firebase.auth().currentUser;

			user.updateProfile(payload)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'updateAuthProfile');
			});

		});

	},

	updateUserEmail({dispatch, commit}, email){

		dispatch('wait/start', 'updateUserEmail');

		return new Promise((resolve, reject) => {

			const user = firebase.auth().currentUser;

			user.updateEmail(email)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'updateUserEmail');
			});

		});

	},

	updateUserAdditionalInfo({commit, dispatch}, payload){	

		dispatch('wait/start', 'updateUserAdditionalInfo');

		return new Promise((resolve, reject) => {

			const user = firebase.auth().currentUser;

			db.collection('users').doc(user.uid).update(payload)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'updateUserAdditionalInfo');
			});

		});

	},

	updateUserPassword({commit, dispatch}, newPassword){

		dispatch('wait/start', 'updateUserPassword');

		return new Promise((resolve, reject) => {

			const user = firebase.auth().currentUser;

			user.updatePassword(newPassword)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'updateUserPassword');
			});

		});

	},

	/*
	file => Blob
	 */
	uploadProfileImage({commit, dispatch, state}, file){

		dispatch('wait/start', 'uploadProfileImage');

		return new Promise((resolve, reject) => {

			const filePath 	= `user-photos/${state.user.username}-${Math.random().toString(36).replace('0.', '').substring(0, 6)}.jpg`;

			firebase.storage().ref(filePath).put(file)
			.then(async function(snapshot) {

				const userImageRef 			= firebase.storage().ref().child(snapshot.ref.fullPath);
				const userPhotoFullPath 	= await userImageRef.getDownloadURL();
				
				await dispatch('updateAuthProfile', {
					photoURL: userPhotoFullPath
				});
				
				resolve(userPhotoFullPath);

			})
			.catch((error) => {
				reject(error)
			})
			.finally(() => {
				dispatch('wait/end', 'uploadProfileImage');
			});

		});

	},
	
	showSuccessMsg({commit, dispatch}, msg){

		// if exist error alert
		dispatch('closeAlert', 'error');
	
		commit('SET_ALERT', {
			type: 'success',
			msg: msg
		});
		
		setTimeout(() => {
			dispatch('closeAlert', 'success');
		}, 3000);
	
	},

	showErrorMsg({commit}, msg){
	
		commit('SET_ALERT', {
			type: 'error',
			msg: msg
		});
	
	},

	closeAlert({commit}, type){
		commit('CLOSE_ALERT', type);
	},

	async getViableUsername({dispatch}, user_fullname){

		dispatch('wait/start', 'getViableUsername');

		let username;
		let snapShot;

		do{
			username 		= (username)? `${username}-${Math.random().toString(36).replace('0.', '').substring(0, 6)}`: slugify(user_fullname);
			snapShot 		= await db.collection('users').where("username", "==", username ).get();
		}while(snapShot.size > 0)
		
		dispatch('wait/end', 'getViableUsername');
		
		return username;

	},

	async fetchCategories({dispatch, commit}){

		dispatch('wait/start', 'fetchCategories');

		return new Promise(async (resolve, reject) => {

			db.collection("categories")
			.get()
			.then(async (querySnapshot) =>  {
				
				const categories = querySnapshot.docs.map(doc => {
					const { id } = doc
					const data = doc.data()
					return { id, ...data }
				});

				await commit('SET_CATEGORIES', categories);

			})
			.catch(function(error) {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'fetchCategories');
				resolve();
			});

		});

	},

	async fetchTags({dispatch, commit}){

		dispatch('wait/start', 'fetchTags');

		return new Promise(async (resolve, reject) => {

			db.collection("tags")
			.get()
			.then(async (querySnapshot) =>  {
				
				const tags = querySnapshot.docs.map(doc => {
					const { id } = doc
					const data = doc.data()
					return { id, ...data }
				});

				await commit('SET_TAGS', tags);

			})
			.catch(function(error) {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'fetchTags');
				resolve();
			});

		});

	},

	async addProject({dispatch, commit}, project){

		dispatch('wait/start', 'addProject');

		return new Promise(async (resolve, reject) => {

			console.log('project => ', project);

			db.collection('projects').add(project)
			.then((docRef) => {
				console.log(docRef);
				resolve(docRef.id);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'addProject');
			});;			

		});

	},

	async addTag({dispatch, commit}, tag){

		dispatch('wait/start', 'addTag');

		return new Promise(async (resolve, reject) => {

			db.collection('tags').add(tag)
			.then((docRef) => {
				resolve(docRef.id);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'addTag');
			});;			

		});

	},

	// convert tags to tag id list
	async getTagIds({dispatch, commit}, tags){

		dispatch('wait/start', 'getTagIds');

		let tagIdList 	= [];
		let prList 		= [];
		let singlePr;
		
		return new Promise(async (resolve, reject) => {


			await Promise.all(prList);

			tags.forEach(async (tag, keyTag) => {

				singlePr = db.collection("tags")
				.where('tag' , '==', tag)
				.get()
				.then(async (querySnapshot) => {

					if(querySnapshot.size === 0){

						await dispatch('addTag', {
							tag: tag
						})
						.then((tagId) => {
							tagIdList.push(tagId);
						});

					}else{
						tagIdList.push(querySnapshot.docs[0].id);
					}

				});

				prList.push(singlePr);


			});

			await Promise.all(prList);

			dispatch('wait/end', 'getTagIds');
			
			resolve(tagIdList);

		});

	},

	/*
	image => base64
	 */
	uploadProjectImage({commit, dispatch, state}, image){

		dispatch('wait/start', 'uploadProjectImage');

		return new Promise((resolve, reject) => {

			const imagePath = `project-images/${Math.random().toString(36).replace('0.', '').substring(0, 6)}.jpg`;

			firebase.storage().ref().child(imagePath).putString(image, 'base64')
			.then(async function(snapshot) {

				const projectImageRef 		= firebase.storage().ref().child(snapshot.ref.fullPath);
				const projectImageFullPath 	= await projectImageRef.getDownloadURL();
				
				resolve(projectImageFullPath);

			})
			.catch((error) => {
				reject(error)
			})
			.finally(() => {
				dispatch('wait/end', 'uploadProjectImage');
			});

		});

	},

	addProjectImages({dispatch}, images){

		dispatch('wait/start', 'addProjectImages');

		let prList = [];

		return new Promise(async (resolve, reject) => {
			
			images.forEach((image) => {
				prList.push(dispatch('uploadProjectImage', image));
			});

			await Promise.all(prList).then((res) => {
				console.log('res', res);
				resolve(res);
			})
			.finally(() => {
				dispatch('wait/end', 'addProjectImages');
			});
		
		});

	}

};