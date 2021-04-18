import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {Header} from "react-native-elements"

const InforScreen = ({navigation}) => {
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
      <View style={styles.information}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Image style={styles.avtInfor} source={require('../asset/avt.jpg')}/>
        </View>
        
        <View style={styles.inforNV}>
          <View style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 30,}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}}>Tên: </Text>
            <Text style={{flex: 1, textAlign: 'right'}}>Trần Lê Tấn Tài</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}}>Số điện thoại: </Text>
            <Text style={{flex: 1, textAlign: 'right'}}>0987654321</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}}>Email: </Text>
            <Text style={{flex: 3, textAlign: 'right'}}>Taitranonlyt100920@gmail.com</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}}>Chức vụ: </Text>
            <Text style={{flex: 1, textAlign: 'right'}}>Nhân viên</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.signOut}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          <Text style={styles.textSignOut}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InforScreen

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
  information:{
    height: 270,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
    marginTop: 20
  },
  avtInfor:{
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  inforNV:{
    flexDirection: 'column',
  },
  signOut:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#8A388F",
    marginTop: 220
},
  textSignOut:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    fontWeight: 'bold'
},
})

