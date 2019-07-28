import firebase from 'firebase';

export default {

	login ({}, {user_email, user_password}){

		return new Promise((resolve, reject) => {

			firebase.auth().signInWithEmailAndPassword(user_email, user_password)
			.then((user) => {
				resolve(user);
			})
			.catch((error) => {
				reject(error);
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

	signup({commit, dispatch}, {user_email, user_password}){

		dispatch('wait/start', 'signup');

		return new Promise((resolve, reject) => {

			firebase.auth().createUserWithEmailAndPassword(user_email, user_password)
			.then((user) => {
				resolve(user);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				dispatch('wait/end', 'signup');
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

};