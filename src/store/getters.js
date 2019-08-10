import firebase from 'firebase';
import { db } from '@/main';

export default {

	userImage: (state) => (state.user.photoURL)? state.user.photoURL: `https://robohash.org/${state.user.id}`,

	userFirstName: (state) => (state.user.displayName)? state.user.displayName.split(' ').slice(0, -1).join(' '): '',

};