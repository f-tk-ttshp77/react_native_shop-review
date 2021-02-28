import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import Constants from 'expo-constants'
// types
import { Shop } from '../types/shop'
import { Review } from '../types/review'
import { initialUser, User } from '../types/user'

if (!firebase.apps.length) {
	firebase.initializeApp(Constants.manifest.extra.firebase)
}

export const getShops = async () => {
	const snapshot = await firebase
		.firestore()
		.collection('shops')
		.orderBy('score', 'desc')
		.get()
	const shops = snapshot.docs.map(
		(doc) => ({ ...doc.data(), id: doc.id } as Shop)
	)
	return shops
}

export const signin = async () => {
	const userCredential = await firebase.auth().signInAnonymously()
	const { uid }: any = userCredential.user
	const userDoc = await firebase
		.firestore()
		.collection('users')
		.doc('uid')
		.get()
	if (!userDoc.exists) {
		await firebase.firestore().collection('users').doc(uid).set(initialUser)
		return {
			...initialUser,
			id: uid,
		} as User
	} else {
		return {
			id: uid,
			...userDoc.data(),
		} as User
	}
}

export const updateUser = async (userId: string, params: any) => {
	await firebase.firestore().collection('users').doc(userId).update(params)
}

export const addReview = async (shopId: string, review: Review) => {
	await firebase
		.firestore()
		.collection('shops')
		.doc(shopId)
		.collection('reviews')
		.add(review)
}