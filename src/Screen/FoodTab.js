//import liraries
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler"
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'hgfood.db' });

const OrderScreen = () => {
    const [items, setItems] = useState([]);
        useEffect(() => {
            db.transaction((tx) => {
              tx.executeSql(
                'SELECT * FROM table_food',
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
    const ItemMenu = ({item}) => {
        const [count, setcount] = useState(0)
        const cong = () => setcount(x => x + 1)
        const tru = () => setcount(x => x - 1)
    
        return(
            <View style={styles.cartCard}>
                <Image source={require("../images/food1.png")} style={{height: 80, width: 80}}/>
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name_food}</Text>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>{item.price} VNĐ</Text>
                </View>
                <View style={{marginRight: 20, alignItems: 'center'}}>
                    <View style={styles.actionBtn}>
                        <TouchableOpacity onPress={tru}>
                            <Ionicons name="remove" size={25} color="white" />
                        </TouchableOpacity>
                            <Text style={styles.amount}>{count}</Text>
                        <TouchableOpacity onPress={cong}>
                            <Feather name="plus" size={25} color="white" />    
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={items}
                keyExtractor={(item) => item.id_food}
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
                        <Text style={{ margin: 10, color: "#8A388F", fontWeight: 'bold' }}>THÊM </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


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
      actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: '#8A388F',
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
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


export default OrderScreen;
