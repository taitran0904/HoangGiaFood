import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'hg.db', createFromLocation: '~hg.db'});

const SignInScreen = ({navigation}) => {
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [isSecureEntry, setisSecureEntry] = useState(true);

  let login = () => {
    if (user == '' || pass == ''){
      
      Alert.alert('Vui lòng nhập tên đăng nhập hoặc mật khẩu');
      
    }
      
    else
      db.transaction(tx => {
        var sql =
          'SELECT username, password FROM user where username = ? and password = ?';
        tx.executeSql(sql, [user, pass], (tx, results) => {
          var len = results.rows.length;
          if (len == 0) Alert.alert('Tên đăng nhập hoặc mật khẩu sai');
          else {
            navigation.navigate('HomeScreen');
          }
        });
      });
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
            value={user}
          />
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>MẬT KHẨU</Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#8A388F" />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry={isSecureEntry}
            style={styles.textinput}
            onChangeText={text => setpass(text)}
            value={pass}
          />

          <TouchableOpacity
            onPress={() => {
              setisSecureEntry(prev => !prev);
            }}>
            {isSecureEntry ? (
              <Feather name="eye-off" size={20} color="#8A388F" />
            ) : (
              <Feather name="eye" size={20} color="#8A388F" />
            )}
          </TouchableOpacity>
        </View>
        <Text
          style={{color: '#8A388F', marginTop: 15}}
          onPress={() => navigation.navigate('ChangePass')}>
          Quên mật khẩu
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={login}
            style={[
              styles.signIn,
              {
                backgroundColor: '#8A388F',
                marginTop: 15,
              },
            ]}>
            <Text
              style={([styles.textSign], {color: 'white', fontWeight: 'bold'})}>
              ĐĂNG NHẬP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                marginTop: 15,
                backgroundColor: '#8A388F',
              },
            ]}>
            <Text
              style={([styles.textSign], {color: 'white', fontWeight: 'bold'})}>
              ĐĂNG KÝ
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
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
    marginTop: 10,
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

export default SignInScreen;
