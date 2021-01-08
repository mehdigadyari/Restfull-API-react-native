import React, { useEffect, useState } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'

const ProfileScreen = ({ navigation }) => {


    const [email, setEmail] = useState('')


    const getUserInfo = async () => {
        let token = await AsyncStorage.getItem('token')
        let token_type = await AsyncStorage.getItem('token_type')
        console.log(token, token_type);


        let status
        fetch('http://192.168.1.53:3000/profile', {
            method: "GET",
            headers: {
                'Authorization': token_type + " " + token
            },
        }).then((response) => {
            status = response.status
            return response.json()
        }).then((responseJson) => {
            if (status === 200) {
                setEmail(responseJson.user.email)
            }
            if (status === 401) {
                onLogout()
            }
            console.log(status, responseJson);

        })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const onLogout = async () => {

        await AsyncStorage.removeItem('token')
        navigation.replace('LoginScreen')
    }


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }} >
            <Text> {email} </Text>
            <Button
                title="Logout"
                onPress={onLogout}
            />
        </View>
    )
}

export default ProfileScreen
