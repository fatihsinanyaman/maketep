import Vue from 'vue';

export default {

	/**
	 * @param {[type]} options.type ['success', 'error']
	 */
	SET_ALERT(state, { type, msg }){
		Vue.set(state.alert, type, { 
			status: true,
			msg: msg
		});
	},

	/**
	 * @param {[type]} options.type ['success', 'error']
	 */
	CLOSE_ALERT(state, type){
		Vue.set(state.alert, type, { 
			status: false,
			msg: null
		});	
	},

	SET_USER(state, user){
		Vue.set(state, 'user', user);
	},

	SET_LOGGED_STATUS(state, isLoggedIn){
		Vue.set(state, 'isLoggedIn', isLoggedIn);
	},

	SET_CATEGORIES(state, categories){
		Vue.set(state, 'categories', categories);
	},

	SET_TAGS(state, tags){
		Vue.set(state, 'tags', tags);
	}

};