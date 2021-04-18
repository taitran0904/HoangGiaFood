import React, {useState} from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import {Header} from "react-native-elements"


const StatisticsScreen = () => {
  return (
    <View>
      <Header
            leftComponent={
                <Image style={styles.avt} source={require('../asset/avt.jpg')}/>
            }
            centerComponent={
                <Image style={styles.logo} source={require('../asset/logo.png')}/>
                }
            backgroundColor= "#8A388F"
             height={130}
      />  
    </View>
  );
}

export default StatisticsScreen

const styles = StyleSheet.create({
  logo:{
    height: 150,
    width: 100  
},
avt:{
    height: 50,
    width: 50,
    borderRadius: 50,
    marginTop: 50,
    marginLeft: 10,
},
datePickerStyle: {
  width: 200,
  marginTop: 20,
},
})

