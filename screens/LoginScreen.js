import React, { useState, useEffect } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { Toast, Root } from 'native-base'
import Axios from 'axios'

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPass, setErrorPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [btnDis, setBtnDis] = useState(true)

  useEffect(() => {
    var pattern = /^[a-z0-9]{1,}@[a-z0-9]{1,}\.[a-z]{1,}$/i
    if (pattern.test(email) && password.length > 6) {
      setBtnDis(false)
    } else {
      setBtnDis(true)
    }
  }, [email, password])

  const onLogin = async () => {
    if (!loading) {
      setLoading(true)

      setErrorEmail('')
      setErrorPass('')
      setTimeout(() => {
        Axios({
          url: 'http://192.168.1.53:3000/signin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            email: email,
            password: password,
          },
          timeout: 3000,
        })
          .then(async (response) => {
            if (response.status === 200) {
              // console.log(response.data);
              await AsyncStorage.setItem('token', response.data.token)
              await AsyncStorage.setItem('token_type', response.data.token_type)
              props.navigation.replace('UploadScreen')
            }
            setEmail('')
            setPassword('')
            setLoading(false)
          })
          .catch((e) => {
            // console.log(e.response.data.errors);
            switch (e.response.status) {
              case 400:
                let error = e.response.data.errors
                error.forEach((err) => {
                  if (err.key === 'email') {
                    setErrorEmail(err.errorText)
                  } else if (err.key === 'password') {
                    setErrorPass(err.errorText)
                  }
                })

                break
              case 403:
                Toast.show({
                  text: e.response.data.errorText,
                  type: 'danger',
                })
                break

              default:
                Toast.show({
                  text: 'در ارتباط با سرور مشکلی وجود دارد',
                  type: 'danger',
                })
                break
            }
          })
      }, 2000)
    }
  }

  return (
    <Root>
      <View style={{ backgroundColor: '#607D8B', height: 690 }}>
        <View
          style={{
            backgroundColor: '#EFEBE9',
            alignSelf: 'center',
            marginTop: 150,
            borderColor: '#424242',
            borderRadius: 5,
            borderWidth: 1,
            paddingBottom: 10,
            width: '90%',
            alignItems: 'center',
            elevation: 5,
            height: 400,
          }}
        >
          <Input
            containerStyle={{
              marginTop: 10,
              paddingTop: 1,
              width: '80%',
              height: 2,
            }}
            label={'ایمیل'}
            labelStyle={{
              fontSize: 10,
              fontWeight: '500',
              marginBottom: 0,
              paddingBottom: 1,
            }}
            inputStyle={{
              fontSize: 10,
              fontWeight: '500',
              marginBottom: 0,
              paddingBottom: 1,
            }}
            errorMessage={errorEmail}
            errorStyle={{
              fontSize: 8,
              fontWeight: '500',
              marginBottom: 0,
              paddingBottom: 1,
            }}
            placeholder="info@info.com"
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />
          <Input
            containerStyle={{ marginTop: 40, width: '80%', paddingTop: 35 }}
            secureTextEntry={true}
            label="رمز را وارد کنید"
            labelStyle={{
              fontSize: 10,
              fontWeight: '500',
              marginBottom: 0,
              paddingBottom: 1,
            }}
            inputStyle={{
              fontSize: 10,
              fontWeight: '500',
              marginBottom: 0,
              paddingBottom: 1,
            }}
            placeholder="*********"
            errorMessage={errorPass}
            errorStyle={{
              fontSize: 8,
              fontWeight: '500',
              marginBottom: 0,
              paddingBottom: 1,
            }}
            value={password}
            onChangeText={(txt) => setPassword(txt)}
          />
          <Button
            title="ورود"
            type="solid"
            containerStyle={{ width: '70%', height: 30, marginTop: 10 }}
            buttonStyle={{ backgroundColor: '#E91E63' }}
            titleStyle={{ fontSize: 15, fontWeight: '200' }}
            onPress={onLogin}
            disabled={loading || btnDis}
          />

          <Button
            title="رمز عبور را فراموش کرده ام؟"
            type="clear"
            containerStyle={{ width: '70%', marginTop: 5 }}
            titleStyle={{
              fontSize: 8,
              color: '#424242',
              textAlign: 'right',
              fontWeight: '200',
              width: '100%',
            }}
          />
          <Button
            title="ثبت نام نکرده ام؟"
            type="clear"
            containerStyle={{ width: '70%' }}
            onPress={() => props.navigation.navigate('Registerr')}
            titleStyle={{
              fontSize: 8,
              color: '#424242',
              textAlign: 'right',
              fontWeight: '200',
              width: '100%',
            }}
          />
        </View>
      </View>
    </Root>
  )
}

export default LoginScreen
