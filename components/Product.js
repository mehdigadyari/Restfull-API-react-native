import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const Product = ({ img, title, price, onDeletedPress, onUpdatedPress, }) => {
    return (
        <View style={{
            width: "100%"
            , paddingTop: 15,
            elevation: 5,
            backgroundColor: "#a1a1a1",
            height: 150,

            flexDirection: 'row-reverse',
            borderRadius: 10,
            margin: 2

        }}>

            <View style={{
                width: 200, height: 130, borderWidth: 2, borderColor: "#000",
                marginBottom: 10, marginRight: 5, borderRadius: 10

            }}>

                <Image
                    source={{ uri: img }}
                    style={{

                        width: "100%",
                        height: "100%"
                        , resizeMode: 'center'
                    }} />

            </View>
            <View style={{ flex: 2, padding: -2, }}>
                <Text style={{ fontSize: 15, textAlign: 'right' }} >  {title} </Text>
                <Text style={{ fontSize: 15, textAlign: 'right' }} >  {price} </Text>

                <TouchableOpacity onPress={onUpdatedPress} >
                    <Text style={{ fontSize: 15, color: "#000", textAlign: 'left' }} >  ویرایش </Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={onDeletedPress} >
                    <Text style={{ fontSize: 15, color: "#f00", textAlign: 'left' }} >  حذف </Text>

                </TouchableOpacity>
                
            </View>

            {/* <View style={{ flex: 1, backgroundColor: "#00f", }}></View> */}
        </View>
    )
}

export default Product
