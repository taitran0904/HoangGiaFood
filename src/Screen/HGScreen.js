import React, {useEffect, useState} from 'react'
import {View, Text, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native'
import { FlatList, TouchableHighlight } from "react-native-gesture-handler"
import {Picker} from '@react-native-community/picker'

import {Header} from "react-native-elements"

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'hg.db', createFromLocation: '~hg.db' });


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HGSCreen = ({navigation}) => {

    const [selectedValue,setSelectedValue] = useState("1");
    const [items, setItems] = useState([]);
useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM "table"',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
        }
      );
        
    });
  }, []);

    const EatTable = ({item}) => {
        return(
            <TouchableHighlight
                underlayColor="#ffffff"
                activeOpacity={0.9}
                onPress={() => navigation.navigate("OrderScreen")}
                >
                {item.id_zones == selectedValue && 
                    (item.status == '0' ? 
                    <View style={[styles.eattable,{backgroundColor: 'white'}]}>
                        <View style={styles.etContainer}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#8A388F'}}>{item.table_name}</Text>
                        </View>
                    </View> 
                    :
                    <View style={[styles.eattable,{backgroundColor: '#8A388F'}]}>
                        <View style={styles.etContainer}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{item.table_name}</Text>
                        </View>
                    </View>) 
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
        <View style={{alignItems: 'center'}}>
            <Picker
                style={{width:'40%'}}
                selectedValue={selectedValue}
                onValueChange={(itemValue,itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.item label="Khu A" value="1"/>
                <Picker.item label="Khu B" value="2"/>
            </Picker>
        </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={items}
                renderItem={({item}) => <EatTable item={item} />}
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

