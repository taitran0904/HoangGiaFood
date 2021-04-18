//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { FlatList } from "react-native-gesture-handler"
import menu from '../../data/drink'

import HeaderComponents from "../components/HeaderComponents";


// create a component
const Bag = ({navigation}) => {
    const ItemMenu = ({item}) => {
        return(
            <View style={styles.cartCard}>
                <Image source={item.image} style={{height: 80, width: 80}}/>
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>{item.price} VNĐ</Text>
                </View>
                <View style={{marginRight: 20, alignItems: 'center'}}>
                    <View >
                        <Text style={styles.amount}>0</Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <>
        <HeaderComponents title="Order Screen" backBtn />
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={menu}
                renderItem={({item}) => <ItemMenu item={item} />}
            />
            <View style={{marginBottom: 10, paddingHorizontal: 20, backgroundColor: '#8A388F', paddingBottom: 10, }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 15,
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Tổng:</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>0 VNĐ</Text>
                </View>
                <View style={{ marginHorizontal: 30 }}>
                    <TouchableOpacity style={styles.orderButton}>
                        <Text style={{ margin: 10, color: "#8A388F", fontWeight: 'bold' }}>THANH TOÁN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
      cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      amount:{
        fontWeight: 'bold', 
        fontSize: 18, 
        backgroundColor: 'white', 
        height: 30,
        width: 30, 
        textAlign: 'center'
      },
      orderButton:{
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
      }
    });
//make this component available to the app
export default Bag;
