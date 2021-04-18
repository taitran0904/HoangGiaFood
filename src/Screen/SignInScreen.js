import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather  from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable'	
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'hgfood.db' });

const SignInScreen = ({ navigation }) => {
    const [user, setuser] = useState('')
    const [pass, setpass] = useState('')

    

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_food'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20), password VARCHAR(20), email VARCHAR(20))',
                  []
                );
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_drink(id_drink INTEGER PRIMARY KEY AUTOINCREMENT, name_drink NVARCHAR(20), price NVARCHAR(20), image TEXT);',
                  []
                );
                txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS table_food(id_food INTEGER PRIMARY KEY AUTOINCREMENT, name_food NVARCHAR(20), price NVARCHAR(20), image TEXT);',
                    []
                  );
              }
              
            //   txn.executeSql(
            //     'INSERT INTO table_food (id_food,name_food,price,image) VALUES (?,?,?,?)',
            //     [1,'Cơm tấm','15.000','require("../images/food1.png")']
            //   );
            //   txn.executeSql(
            //     'INSERT INTO table_food (id_food,name_food,price,image) VALUES (?,?,?,?)',
            //     [2,'Bún','15.000','require("../images/food2.png")']
            //   );
            //   txn.executeSql(
            //     'INSERT INTO table_food (id_food,name_food,price,image) VALUES (?,?,?,?)',
            //     [3,'Lẩu','15.000','require("../images/food3.png")']
            //   );
            //   txn.executeSql(
            //     'INSERT INTO table_food (id_food,name_food,price,image) VALUES (?,?,?,?)',
            //     [4,'Gà nướng','15.000','require("../images/food4.png")']
            //   );
            //   txn.executeSql(
            //     'INSERT INTO table_food (id_food,name_food,price,image) VALUES (?,?,?,?)',
            //     [5,'Hủ tiếu','15.000','require("../images/food5.png")']
            //   );
            }
          );
        });
      }, []);

      let login = () => {
        if(user==''||pass=='')
        Alert.alert("Vui lòng nhập tên đăng nhập hoặc mật khẩu")
        else
        db.transaction((tx) => {
            var sql = 'SELECT username, password FROM table_user where username = \''+user+'\'';
          tx.executeSql(sql,[],
            (tx, results) => {
                var len = results.rows.length;
                if(len==0)
                    Alert.alert("Tài khoản không tồn tại");
                else{
                    var row = results.rows.item(0);
                    if(pass == row.password)
                        navigation.navigate('HomeScreen');
                       
                }
            }
          );
        });
      };

    return(
        <View style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Image
                        animation="bounceIn"
                        duration={1500}
                        source={require('../asset/logo.png')}
                        style={styles.logo}
                        resizeMode={"stretch"}
                    />
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}>
                    <Text style={styles.text_footer}>TÊN ĐĂNG NHẬP</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={20} color="#8A388F" />
                        <TextInput
                            placeholder="Tên đăng nhập"
                            style={styles.textinput}
                            onChangeText={(text)=> setuser(text)}
                            value={user}
                        />
                        {/* {this.state.check_textInputChange ? */}
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" size={20} color="green" />
                        </Animatable.View>
                        {/* : null} */}
                    </View>
                    <Text style={[styles.text_footer,{marginTop: 35}]}>MẬT KHẨU</Text>
                    <View style={styles.action}>
                        <Feather name="lock" size={20} color="#8A388F" />
                        {/* {this.state.secureTextEntry ? */}
                        <TextInput
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            style={styles.textinput}
                            onChangeText={(text) => setpass(text)}
                            value={pass}
                        />
                        {/* : */}
                        {/* <TextInput
                            placeholder="Mật khẩu"
                            secureTextEntry={false}
                            style={styles.textinput} */}
                            {/* value={this.state.password}
                            onChangeText={(text)=> this.setState({ */}
                            {/* //     password: text
                            // })} */}
                        {/* /> */}
                        {/* } */}
                        <TouchableOpacity
                        // onPress={()=> this.secureTextEntry()}
                        >
                            {/* {this.state.secureTextEntry ?
                                <Feather name="eye-off" size={20} color="gray"/>
                                : */}
                                <Feather name="eye" size={20} color="gray"/>
                            {/* } */}
                        </TouchableOpacity>
                    </View>
                    <Text style={{color:'#8A388F', marginTop: 15}}>Quên mật khẩu</Text>
                    <View style={styles.button}>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate("HomeScreen")}
                            onPress={login}
                            style={[styles.signIn,{
                                backgroundColor: "#8A388F",
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign],
                                {color: "white",
                                fontWeight: 'bold'
                            }}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignUpScreen")}
                           
                            style={[styles.signIn,{
                                marginTop: 15,
                                backgroundColor: "#8A388F",
                            }]}
                        >
                            <Text style={[styles.textSign],
                                {color: "white",
                                fontWeight: 'bold'
                            }}>ĐĂNG KÝ</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
    )
  };

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#8A388F",
    },
    header:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    footer:{
        flex: 3,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_footer:{
        color:"#8A388F",
        fontSize: 18
    },
    action:{
        flexDirection: "row",
        marginTop:10,
        borderBottomWidth: 1,
        borderBottomColor:"#f2f2f2",
        paddingBottom: 5
    },
    textinput:{
        flex:1,
        paddingLeft: 10,
        color: '#8A388F',   
    },
    button:{
        alignContent: "center",
        marginTop: 50
    },
    signIn:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo:{
        height: 200,
        width: 200  
    }
})



export default SignInScreen