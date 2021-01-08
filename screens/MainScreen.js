import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import axios from 'axios'
import Product from '../components/Product'
import Constants from 'expo-constants'
import { Input, Button } from 'react-native-elements'



const MainScreen = () => {

    const [data, setData] = useState([])
    const [updateEnable, setUpdateEnable] = useState(false)
    const [title, setTitle] = useState('')
    const [updateIdObj, setUpdateIdObj] = useState(0)
    const [titleError, setTitleError] = useState('')
    const [newTitleError, setNewTitleError] = useState('')

    const [addEnable, setAddEnable] = useState(false)
    const [addtitle, setAddTitle] = useState('')
    const [addImg, setAddImg] = useState('')
    const [price, setPrice] = useState('')

    const [error, setError] = useState(false)

    useEffect(() => {
        let status
        fetch('http://192.168.1.52:3000/')
            .then((response) => {
                status = response.status
                return response.json()
            }).then((responseJson) => {
                // console.log(status, responseJson);
                if (status === 200) {
                    setData(responseJson.data)
                }
            })

    }, [])

    const onDelete = (id) => {
        // console.log(id);
        axios({

            // url:"http://192.168.1.51:3000/delete?id="+id,
            url: `http://192.168.1.52:3000/delete?id=${id}`,
            method: 'DELETE'

        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.data)
            }
        })

    }

    const onUpdate = () => {
        // console.log(title);
        axios({
            url: `http://192.168.1.52:3000/update?id=${updateIdObj}`,
            method: 'PUT',
            data: {
                title: title
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.data)
                setUpdateEnable(false)
            }
        }).catch((err) => {
            if (err.response.status === 400) {
                setTitleError(err.response.data.errors[0].errorText)
                // console.log(err.response.data.errors[0]);
                setError(true)
            }
        })


    }

    const onAdd = () => {
        axios({
            url: `http://192.168.1.52:3000/add`,
            method: 'POST',
            data: {
                title: addtitle,
                image: addImg,
                price: price
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 201) {
                console.log(response.data.data);

                setData(response.data.data)
                setAddEnable(false)
            }
        }).catch((err) => {
            if (err.response.status === 400) {
                setNewTitleError(err.response.data.errors[0].errorText)
                // console.log(err.response.data.errors[0]);
                setError(true)
            }
        })


    }



    return (
        <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }} >
            <View>
                <Button
                    onPress={() => setAddEnable(true)}
                    title='add'
                />
            </View>

            {error ? (<Text>خطایی رخ داده است.</Text>) : (null)}
            {addEnable ? (
                <View>

                    <Input
                        value={addtitle}
                        onChangeText={(txt) => { setAddTitle(txt) }}
                        placeholder='title'
                        errorMessage={newTitleError}
                    />
                    <Input
                        value={addImg}
                        onChangeText={(txt) => { setAddImg(txt) }}
                        placeholder='image'

                    />
                    <Input
                        value={price}
                        onChangeText={(txt) => { setPrice(txt) }}
                        placeholder='price'

                    />
                    <Button
                        onPress={onAdd}
                        title='اضافه کردن'
                    />

                </View>

            ) : (null)}

            {updateEnable ? (
                <View>

                    <Input
                        value={title}
                        onChangeText={(txt) => { setTitle(txt) }}
                        placeholder='title'
                        errorMessage={titleError}
                    />
                    <Button
                        onPress={onUpdate}
                        title='ویرایش'
                    />

                </View>

            ) : (null)}
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Product
                        img={item.img}
                        title={item.title}
                        price={item.price}
                        onDeletedPress={() => onDelete(item.id)}
                        onUpdatedPress={() => {
                            setUpdateEnable(true)
                            setUpdateIdObj(item.id)
                            setTitle(item.title)
                        }}

                    />}
                keyExtractor={(item) => item.id + ""}
            />

        </View>
    )
}

export default MainScreen
