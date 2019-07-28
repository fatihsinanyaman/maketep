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
	}

};