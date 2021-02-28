import React, { useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
// components
import { ShopDetail } from '../components/ShopDetail'
import { FloatingActionButton } from '../components/FloatingActionButton'
// types
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/navigation'

type Props = {
	navigation: StackNavigationProp<RootStackParamList, 'Shop'>
	route: RouteProp<RootStackParamList, 'Shop'>
}

export const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
	const { shop } = route.params

	useEffect(() => {
		navigation.setOptions({ title: shop.name })
	}, [shop])

	return (
		<SafeAreaView style={styles.container}>
			<ShopDetail shop={shop} />
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
