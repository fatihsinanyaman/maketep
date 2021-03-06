import * as Constants from '@/store/constants';

export default {

	alert: {
		success: {
			status: false,
			msg: null
		},
		error: {
			status: false,
			msg: null
		}
	},

	user: {
		email: null,
		displayName: null,
		username: null,
		photoURL: null,
		bio: null,
		id: null
	},

	isLoggedIn: false,

	categories: [],
	
	tags: [],

	project: JSON.parse(JSON.stringify(Constants.PROJECT))

};