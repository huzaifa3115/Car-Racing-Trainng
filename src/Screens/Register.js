import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Styles} from '../Common';
import {Input, Button} from '../Components';
import {Navigator, Utils} from '../Utils';

export default class Register extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  __onRegister = async () => {
    const {username, email, password} = this.state;
    if (!Utils.isEmpty(username) && email && !Utils.isEmpty(password)) {
      let user = {
        ...this.state,
        isLoggedIn: true,
        isRacing: false,
        trackId: null,
      };

      let isEmailExist = await Utils.getUserByEmail(email);
      if (!isEmailExist) {
        await Utils.registerUser(user);
        Navigator.navigateAndReset('Track');
      } else {
        alert('Email already in use');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  render() {
    const {username, email, password} = this.state;

    return (
      <View style={[Styles.mainContainer, styles.container]}>
        <View style={[Styles.fieldsContainer, {marginTop: 20}]}>
          <Input
            placeholder={'Username'}
            onChangeText={(username) => this.setState({username})}
            value={username}
          />
          <Input
            onChangeText={(email) => this.setState({email})}
            placeholder={'Email'}
            keyboardType={'email-address'}
            value={email}
          />
          <Input
            onChangeText={(password) => this.setState({password})}
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
          />
          <Button label={'Register'} onPress={this.__onRegister} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
