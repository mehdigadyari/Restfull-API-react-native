import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import Q1 from '../assets/images/q1.jpg'

const UploadScreen = () => {

    const [image, setImage] = useState('')

    const getImage = async () => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()
        if (permissionResult.granted === false) {
            console.log("not per")
            return

        }
        let selectPic = await ImagePicker.launchImageLibraryAsync()
        console.log(selectPic)
        if (selectPic.cancelled === true) {

        } else {

            setImage(selectPic.uri)
        }



    }



    // useEffect(() => {

    // }, [image])


    const upload = () => {

        let data = new FormData()
        data.append('image', {
            uri: image,
            name: "gg.jpeg",
            type: "image/jpg"
        })
        let status
        fetch('http://192.168.1.53:3000/upload', {
            method: "POST",
            body: data
        }).then((response) => {
            status = response.status
            return response.json()
        }).then((responseJson) => {
            console.log(status, responseJson)

        })


    }

    return (
        <View style={{ paddingTop: Constants.statusBarHeight }} >

            <Text>upload</Text>
            <Button
                title="اپلود عکس"
                onPress={upload}
            />
            <TouchableOpacity onPress={getImage}  >
                <Image
                    style={{ width: 400, height: 400 }}
                    source={image === "" || image === undefined ? Q1 : { uri: image }}

                />

            </TouchableOpacity>
        </View>
    )
}

export default UploadScreen
