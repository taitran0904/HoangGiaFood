import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const HeaderComponents = ({ title, backBtn }) => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: "#8A388F", paddingTop: 20 }}>
            <View
                style={[
                    {
                        paddingVertical: 15,
                        paddingHorizontal: 18,
                        justifyContent: "center",
                    },
                    backBtn && { alignItems: "center" },
                ]}
            >
                {backBtn && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            position: "absolute",
                            left: 16,
                            top: 15,
                        }}>
                        <Ionicons name="chevron-back" size={20} color="white" />
                    </TouchableOpacity>
                )}
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {title}
                </Text>
            </View>
            <View
                style={{
                    position: "absolute",
                    right: 16,
                    top: 35,
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Bag")}
                >
                    <View style={{  
                        position:'absolute',
                        height: 17, 
                        width: 17,
                        borderRadius: 15,
                        backgroundColor: 'white', 
                        right:15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000 
                        }}>
                        <Text style={{color: '#8A388F', fontSize: 13}}>0</Text>
                    </View>
                    <SimpleLineIcons name="handbag" size={24} color="white" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

export default HeaderComponents;

const styles = StyleSheet.create({});
