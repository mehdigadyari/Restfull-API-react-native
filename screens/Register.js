import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { Toast, Root } from 'native-base'



const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [btnDis, setBtnDis] = useState(false)

    useEffect(() => {
        var pattern = /^[a-z0-9]{1,}@[a-z0-9]{1,}\.[a-z]{1,}$/i
        if (pattern.test(email) && password.length > 6) {
            setBtnDis(false)
        } else {
            setBtnDis(true)
        }

    }, [email, password])

    const onRegister = () => {
        if (!loading) {
            setLoading(true)
            // console.log(email, '====', password);
            setErrorEmail('')
            setErrorPass('')
            let status
            setTimeout(() => {
                fetch('http://192.168.1.53:3000/signup', {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            email: email,
                            password: password
                        },
                    )
                }).then((response) => {
                    status = response.status
                    return response.json()
                }).then((responseJson) => {
                    setLoading(false)
                    // ino bayad bzarin k age khata rokh dad karbar dobare betone click kone                    
                    // console.log(status, '------', responseJson);
                    if (status === 400) {


                        responseJson.errors.forEach(err => {
                            console.log(err.key, '----', err.errorText);

                            switch (err.key) {
                                case "email":
                                    setErrorEmail(err.errorText)
                                    break;
                                case "password":
                                    setErrorPass(err.errorText)
                                    break;

                                default:
                                    break;
                            }
                        });
                    } else if (status === 201) {
                        Toast.show({
                            text: "ثبت با موفقیت انجام شد.",
                            type: "success"
                        })
                        setTimeout(() => {
                            props.navigation.navigate('LoginScreen')
                        }, 2000);
                        setEmail('')
                        setPassword('')
                    } else {
                        Toast.show({
                            text: "servererror",
                            type: "danger"
                        })
                    }

                })

            }, 2000);
        }
    }

    return (
        <Root>


            <View style={{
                backgroundColor: "#EFEBE9",
                alignSelf: 'center', marginTop: 200,
                borderColor: "#424242", borderRadius: 5, borderWidth: 1
                , paddingBottom: 10, width: "90%", alignItems: 'center', elevation: 5
            }}>

                <Input
                    containerStyle={{ marginTop: 10, paddingTop: 1, width: "80%", height: 2 }}
                    label={"ایمیل"}
                    labelStyle={{ fontSize: 10, fontWeight: "500", marginBottom: 0, paddingBottom: 1 }}
                    inputStyle={{ fontSize: 10, fontWeight: "500", marginBottom: 0, paddingBottom: 1 }}
                    errorMessage={errorEmail}
                    errorStyle={{ fontSize: 6, fontWeight: "500", marginBottom: 0, paddingBottom: 1 }}

                    value={email}
                    onChangeText={(txt) => setEmail(txt)}

                />
                <Input
                    containerStyle={{ marginTop: 40, width: "80%", paddingTop: 35 }}
                    secureTextEntry={true}
                    label="رمز را وارد کنید"
                    labelStyle={{ fontSize: 10, fontWeight: "500", marginBottom: 0, paddingBottom: 1 }}
                    inputStyle={{ fontSize: 10, fontWeight: "500", marginBottom: 0, paddingBottom: 1 }}
                    placeholder="*********"
                    errorMessage={errorPass}
                    value={password}
                    onChangeText={(txt) => setPassword(txt)}
                />
                <Button
                    title="ثبت نام"
                    type="solid"
                    containerStyle={{ width: "70%", height: 30, marginTop: 10 }}
                    buttonStyle={{ backgroundColor: "#E91E63" }}
                    titleStyle={{ fontSize: 15, fontWeight: "200" }}
                    onPress={onRegister}
                    disabled={loading || btnDis}
                />



                {/* onPress={()=> props.navigation.navigate('Registerr')} */}





                <Button
                    title="ورود"
                    type="clear"
                    containerStyle={{ width: "70%", }}
                    onPress={() => props.navigation.navigate('LoginScreen')}
                    titleStyle={{ fontSize: 12, color: "#424242", textAlign: 'right', fontWeight: "200", width: "100%" }}
                />

            </View>

        </Root>


    )
}

export default Register
