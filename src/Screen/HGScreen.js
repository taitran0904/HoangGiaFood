import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native'
import { FlatList, TouchableHighlight } from "react-native-gesture-handler"

import {Header} from "react-native-elements"

import numTable from '../../data/numTable'


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HGSCreen = ({navigation}) => {
    const EatTable = ({nT}) => {
        return(
            <TouchableHighlight
                underlayColor="#ffffff"
                activeOpacity={0.9}
                onPress={() => navigation.navigate("OrderScreen")}
                >
                { 
                    nT.status == '0' ? 
                    <View style={[styles.eattable,{backgroundColor: 'white'}]}>
                        <View style={styles.etContainer}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#8A388F'}}>{nT.name}</Text>
                        </View>
                    </View> 
                    :
                    <View style={[styles.eattable,{backgroundColor: '#8A388F'}]}>
                        <View style={styles.etContainer}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{nT.name}</Text>
                        </View>
                    </View> 
                }
            </TouchableHighlight>
        );
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={numTable}
                renderItem={({item}) => <EatTable nT={item} />}
            />
        </SafeAreaView>
      );
}

export default HGSCreen

const styles = StyleSheet.create({
    eattable:{
        height: 120,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 30,
        borderRadius: 15,
        elevation: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    etContainer:{
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
    }, 
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
    }
})

