import firebase from 'firebase';
import { db } from '@/main';

import { slugify } from '@/helpers/slugify';

export default {

	login ({dispatch}, {user_email, user_password}){

		dispatch('wait/start', 'login');

		return new Promise((resolve, reject) => {

			firebase.auth().signInWithEmailAndPassword(user_email, user_password)
			.then((data) => {
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

	logout({dispatch}){

		dispatch('wait/start', 'logout');

		return new Promise((resolve, reject) => {

			firebase.auth().signOut()
			.then(() => {
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

	fetchAuth({dispatch, commit}){

		dispatch('wait/start', 'fetchAuth');

		return new Promise((resolve, reject) => {

			firebase.auth().onAuthStateChanged(async (authUser) => {

				if (authUser) {

					console.log(authUser);

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

					dispatch('wait/end', 'fetchAuth');

					resolve();
				
				}

			});

		});

	},

	updateAuthProfile({ dispatch, commit}, payload){

		dispatch('wait/start', 'updateAuthProfile');

		return new Promise((resolve, reject) => {

			const user = firebase.auth().currentUser;

			console.log('payload', payload);

			user.updateProfile(payload)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				console.log(error);
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

	/*
	file => Blob
	 */
	uploadProfileImage({commit, dispatch, state}, file){

		dispatch('wait/start', 'uploadProfileImage');

		return new Promise((resolve, reject) => {

			const filePath 	= `user-photos/${state.user.username}-${Math.random().toString(36).replace('0.', '').substring(0, 6)}.jpg`;

			firebase.storage().ref(filePath).put(file)
			.then(async function(snapshot) {
				
				await dispatch('updateAuthProfile', {
					photoURL: snapshot.ref.fullPath
				});
				
				resolve(snapshot.ref.fullPath);

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
			dispatch('closeAlert', 'error');
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

};