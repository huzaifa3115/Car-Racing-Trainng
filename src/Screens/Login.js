import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Input, Button} from '../Components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Styles} from '../Common';
import Logo from '../images/logo.png';
import {Navigator, Utils} from '../Utils';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  __onLogin = async () => {
    const {username, password} = this.state;
    if (!Utils.isEmpty(username) && !Utils.isEmpty(password)) {
      let newUser = await Utils.authLogin(username, password);
      if (newUser) {
        await Utils.setUserLogin();
      } else {
        alert('Invalid name or password');
      }
    } else {
      alert('Please enter correct credentials');
    }
  };

  __goToRegister = () => {
    Navigator.navigate('Register');
  };

  render() {
    return (
      <View style={[styles.container, Styles.mainContainer]}>
        <Image source={Logo} style={styles.logo} />
        <View style={styles.fieldsContainer}>
          <Input
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            placeholder={'Username'}
          />
          <Input
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <Button label={'Login'} onPress={this.__onLogin} />
          <Button
            onPress={this.__goToRegister}
            label={'Create an account?'}
            btnStyle={styles.labelBtnStyle}
            labelStyle={styles.labelBtnText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 0.5,
    width: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    height: '50%',
  },
  fieldsContainer: {
    flex: 1,
    // justifyContent: 'center',
    width: '80%',
  },
  labelBtnStyle: {
    backgroundColor: null,
  },
  labelBtnText: {
    color: '#000',
  },
});
