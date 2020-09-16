import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Navigator, Utils} from '../Utils';
import Logo from '../images/logo.png';

export default class AppLoading extends Component {
  constructor(props) {
    super(props);

    this.init();
  }

  init = async () => {
    console.log(await Utils.getUsers(), 'users ===================');
    // await Utils.clearStorage();
    setTimeout(async () => {
      let isUser = await Utils.getLoggedInUser();

      global.isUserLoggedIn = true;
      global.userData = isUser;

      if (isUser) {
        Navigator.navigateAndReset('Track');
      } else {
        Navigator.navigateAndReset('Login');
      }
    }, 2000);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    height: '50%',
  },
});
