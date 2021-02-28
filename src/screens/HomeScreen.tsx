import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native'
// component
import { ShopReviewItem } from '../components/ShopReviewItem'
// libs
import { getShops } from '../lib/firebase'
// types
import { Shop } from '../types/shop'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/navigation'

type Props = {
	navigation: StackNavigationProp<RootStackParamList, 'Home'>
}
export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [shops, setShops] = useState<Shop[]>([])
	useEffect(() => {
		getFirebaseItems()
	}, [])

	const getFirebaseItems = async () => {
		const shops = await getShops()
		setShops(shops)
	}

	const onPressShop = (shop: Shop) => {
		navigation.navigate('Shop', { shop })
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={shops}
				renderItem={({ item }: { item: Shop }) => (
					<ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
				)}
				keyExtractor={(item, index) => index.toString()}
				numColumns={2}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
