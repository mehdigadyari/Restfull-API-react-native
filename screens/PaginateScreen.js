import React, { useEffect, useState } from 'react'
import { View, Text, AsyncStorage, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import Product from '../components/Product'
const PaginateScreen = ({ navigation }) => {


    const [count, setCount] = useState(1)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)


    const getItems = async (page) => {
        let token = await AsyncStorage.getItem('token')
        let token_type = await AsyncStorage.getItem('token_type')


        console.log(page)

        let status
        fetch(`http://192.168.1.53:3000/paginate?page=${page}`, {
            method: "GET",
            headers: {
                'Authorization': token_type + " " + token
            },
        }).then((response) => {
            status = response.status
            return response.json()
        }).then((responseJson) => {
            if (status === 401) {
                onLogout()
            } else if (status === 200) {
                setCount(responseJson.count)
                setCurrentPage(responseJson.curren_page)
                setData(data => [...data, ...responseJson.data])
                //... injori faqat item haro migire bedoene noghte araye haro mirize toye araye dg

                setLastPage(responseJson.last_page)
            }


        })
    }

    useEffect(() => {
        setData([])
        getItems(1)
    }, [])

    const onLogout = async () => {

        await AsyncStorage.removeItem('token')
        navigation.replace('LoginScreen')
    }

    const getMore = () => {
        // console.log(currentPage == lastPage);

        if (currentPage == lastPage) {
            return
        }
        getItems(parseInt(currentPage) + 1)
        //bara ink addad ro daqiqan ba addade badi jam konad
    }

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Product
                        img={item.img}
                        title={item.title}
                        price={item.price}
                    />}
                keyExtractor={(item) => item.id + ""}
                onEndReached={getMore}
                onEndReachedThreshold={0.2}
            />
        </View>
    )
}

export default PaginateScreen
