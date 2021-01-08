import React, { useEffect } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'
import Register from '../screens/Register'
import LoginScreen from '../screens/LoginScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PaginateScreen from '../screens/PaginateScreen'
import UploadScreen from '../screens/UploadScreen'
const Stack = createStackNavigator();

const MainNavigator = ({page}) => {
    // console.log(page)
    
    return (

        <Stack.Navigator headerMode="none" initialRouteName={page} >
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="UploadScreen" component={UploadScreen} />
            <Stack.Screen name="PaginateScreen" component={PaginateScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Registerr" component={Register} />
        </Stack.Navigator>
    )
}

export default MainNavigator
