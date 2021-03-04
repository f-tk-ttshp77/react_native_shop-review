import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native'
import { getReviews } from '../lib/firebase'
import { ReviewsContext } from '../contexts/reviewsContext'
// components
import { ShopDetail } from '../components/ShopDetail'
import { FloatingActionButton } from '../components/FloatingActionButton'
import { ReviewItem } from '../components/ReviewItem'
// types
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/navigation'
import { Review } from '../types/review'

type Props = {
	navigation: StackNavigationProp<RootStackParamList, 'Shop'>
	route: RouteProp<RootStackParamList, 'Shop'>
}

export const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
	const { shop } = route.params
	const { reviews, setReviews } = useContext(ReviewsContext)

	useEffect(() => {
		navigation.setOptions({ title: shop.name })

		const fetchReviews = async () => {
			const reviews = await getReviews(shop.id)
			setReviews(reviews)
		}
		fetchReviews()
	}, [shop])

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				ListHeaderComponent={<ShopDetail shop={shop} />}
				data={reviews}
				renderItem={({ item }) => <ReviewItem review={item} />}
				keyExtractor={(item) => item.id}
			/>
			<FloatingActionButton
				iconName='plus'
				onPress={() => navigation.navigate('CreateReview', { shop })}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
