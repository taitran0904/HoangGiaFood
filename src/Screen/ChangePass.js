import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather  from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable'	
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'hg.db', createFromLocation: '~hg.db' });

const ChangePass = ({ navigation }) => {
    const [cemail, setcemail] = useState();
    const [pass, setpass] = useState();
    const [cpass, setcpass] = useState()

      let cfEmail = () => {
        if (!cemail) {
            alert('Vui lòng nhập tên đăng nhập');
            return;
          } else if (!pass) {
            alert('Vui lòng nhập mật khẩu');
            return;
          } else if (!cpass) {
            alert('Vui lòng nhập lại mật khẩu');
            return;
          } else if (pass != cpass) {
            alert('Mật khẩu nhập lại không trùng');
            return;
        }
        else
        db.transaction((tx) => {
            var sql = 'SELECT username, password FROM user where email = \''+cemail+'\'';
          tx.executeSql(sql,[],
            (tx, results) => {
                var len = results.rows.length;
                if(len==0)
                    Alert.alert("Email không tồn tại");
                else{
                        // navigation.navigate('SignInScreen');
                        db.transaction(function (tx) {
                            var sqll = 'UPDATE user SET password = ? WHERE email = ?';
                            tx.executeSql(sqll,[pass,cemail],(tx, results) => {
                                console.log('Results', results.rowsAffected);
                                if (results.rowsAffected > 0){
                                    Alert.alert(
                                        'Success',
                                        'Mật khẩu đã được thay đổi',
                                        [
                                          {
                                            text: 'Ok',
                                            onPress: () => navigation.navigate('SignInScreen'),
                                          },
                                        ],
                                        {cancelable: false},
                                      );
                                }
                                else alert('Thất bại');
                            })
                        })
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
                    <Text style={styles.text_footer}>EMAIL</Text>
                    <View style={styles.action}>
                    <FontAwesome5 name="envelope" size={20} color="#8A388F" />
                        <TextInput
                            placeholder="Nhập email"
                            style={styles.textinput}
                            onChangeText={(text)=> setcemail(text)}
                            value={cemail}
                        />
                    </View>
                    <Text style={styles.text_footer}>MẬT KHẨU</Text>
                    <View style={styles.action}>
                    <Feather name="lock" size={20} color="#8A388F" />
                        <TextInput
                            placeholder="Mật khẩu"
                            style={styles.textinput}
                            onChangeText={(text)=> setpass(text)}
                            secureTextEntry={true}
                            value={pass}
                        />
                    </View>
                    <Text style={styles.text_footer}>NHẬP LẠI MẬT KHẨU</Text>
                    <View style={styles.action}>
                    <Feather name="lock" size={20} color="#8A388F" />
                        <TextInput
                            placeholder="Nhập lại mật khẩu"
                            style={styles.textinput}
                            onChangeText={(text)=> setcpass(text)}
                            secureTextEntry={true}
                            value={cpass}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={cfEmail}
                            style={[styles.signIn,{
                                backgroundColor: "#8A388F",
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign],
                                {color: "white",
                                fontWeight: 'bold'
                            }}>OK</Text>
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



export default ChangePass