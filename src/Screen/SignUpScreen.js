import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'hg.db', createFromLocation: '~hg.db' });

const SignUpScreen = ({navigation}) => {
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [conpass, setconpass] = useState('');
  const [email, setemail] = useState('');

  const register = () => {
    if (!user) {
      alert('Vui lòng nhập tên đăng nhập');
      return;
    } else if (!pass) {
      alert('Vui lòng nhập mật khẩu');
      return;
    } else if (!conpass) {
      alert('Vui lòng nhập lại mật khẩu');
      return;
    } else if (!email) {
      alert('Vui lòng nhập email');
      return;
    } else if (pass != conpass) {
      alert('Mật khẩu nhập lại không trùng');
      return;
    } else {
      db.transaction(tx => {
        var sql =
          "SELECT username, password FROM user where username = '" +user +"'";
        tx.executeSql(sql, [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            Alert.alert('Tài khoản đã tồn tại');
          } else {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO user (username, password, status, email) VALUES (?,?,?,?)',
                [user, pass, 1,email],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'Đăng ký thành công',
                      [
                        {
                          text: 'Ok',
                          onPress: () => navigation.navigate('SignInScreen'),
                        },
                      ],
                      {cancelable: false},
                    );
                  } else alert('Đăng ký thất bại');
                },
              );
            });
          }
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../asset/logo.png')}
          style={styles.logo}
          resizeMode={'stretch'}
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>TÊN ĐĂNG NHẬP</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color="#8A388F" />
          <TextInput
            placeholder="Tên đăng nhập"
            style={styles.textinput}
            onChangeText={text => setuser(text)}
          />
          {/* {this.state.check_textInputChange ? */}
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" size={20} color="green" />
          </Animatable.View>
          {/* : null} */}
        </View>
        <Text style={[styles.text_footer, {marginTop: 30}]}>MẬT KHẨU</Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#8A388F" />
          {/* {this.state.secureTextEntry ? */}
          {/* <TextInput
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        style={styles.textinput}
                        // value={this.state.password}
                        // onChangeText={(text)=> this.setState({
                        //     password: text
                        // })}
                    /> */}
          {/* : */}
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry={true}
            style={styles.textinput}
            // value={this.state.password}
            onChangeText={text => setpass(text)}
            // })}
          />
          {/* } */}
          <TouchableOpacity
          // onPress={()=> this.secureTextEntry()}
          >
            {/* {this.state.secureTextEntry ? */}
            {/* <Feather name="eye-off" size={20} color="gray"/>  */}
            {/* : */}
            <Feather name="eye" size={20} color="gray" />
            {/* } */}
          </TouchableOpacity>
        </View>

        <Text style={[styles.text_footer, {marginTop: 30}]}>
          NHẬP LẠI MẬT KHẨU
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#8A388F" />
          {/* {this.state.secureTextEntry_cf ? */}
          {/* <TextInput
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={true}
                        style={styles.textinput}
                        // value={this.state.password_cf}
                        // onChangeText={(text)=> this.setState({
                        //     password_cf: text
                        // })}
                    /> */}
          {/* : */}
          <TextInput
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={true}
            style={styles.textinput}
            // value={this.state.password_cf}
            onChangeText={text => setconpass(text)}
          />
          {/* } */}
          <TouchableOpacity
          // onPress={()=> this.secureTextEntry_cf()}
          >
            {/* {this.state.secureTextEntry_cf ? */}
            {/* <Feather name="eye-off" size={20} color="gray"/>  */}
            {/* : */}
            <Feather name="eye" size={20} color="gray" />
            {/* } */}
          </TouchableOpacity>
        </View>
        <Text style={[styles.text_footer, {marginTop: 30}]}>E-MAIL</Text>
        <View style={styles.action}>
          <FontAwesome5 name="envelope" size={20} color="#8A388F" />
          <TextInput
            autoCompleteType="email"
            placeholder="Email"
            style={styles.textinput}
            onChangeText={text => setemail(text)}
          />
          {/* {this.state.check_textInputChange ?
                    <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" size={20} color="green" /></Animatable.View> : null} */}
        </View>
        <TouchableOpacity
          // onPress={() => navigation.navigate("SignInScreen")}
          onPress={register}
          style={[
            styles.signIn,
            {
              backgroundColor: '#8A388F',
              marginTop: 10,
            },
          ]}>
          <Text
            style={([styles.textSign], {color: 'white', fontWeight: 'bold'})}>
            ĐĂNG KÝ
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );

  // return (
  //   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //     <Button
  //       title="Go to home"
  //       onPress={() => navigation.navigate("HomeScreen")}
  //     />
  //     <Button title="Go back" onPress={() => navigation.goBack()} />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A388F',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: '#8A388F',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textinput: {
    flex: 1,
    paddingLeft: 10,
    color: '#8A388F',
  },
  button: {
    alignContent: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    height: 200,
    width: 200,
  },
});

export default SignUpScreen;
