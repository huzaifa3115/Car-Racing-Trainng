import {Platform} from 'react-native';
import {_} from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {Navigator} from '../Utils';

class Utils {
  constructor() {}

  isPlatformAndroid() {
    return Platform.OS === 'android';
  }

  isPlatformIOS() {
    return Platform.OS === 'ios';
  }

  isEmpty(data: any) {
    return _.isEmpty(data, true);
  }

  async getUsers() {
    let usersInStore = await AsyncStorage.getItem('data');
    let __userInStore = JSON.parse(usersInStore);

    return __userInStore;
  }

  async getUserByEmail(email) {
    let users = await this.getUsers();

    let user = _.filter(users, {email: email});
    return this.isEmpty(user) ? false : user;
  }

  async registerUser(payload) {
    let storedData = await AsyncStorage.getItem('data');
    let __storedData = JSON.parse(storedData);

    let data = [];

    if (__storedData) {
      data = __storedData.push(payload);
    } else {
      data.push(payload);
    }
    global.userData = payload;
    AsyncStorage.setItem('data', JSON.stringify(data));
  }

  async logout() {
    let users = await this.getUsers();
    if (users) {
      users.find((o) => o.isLoggedIn === true).isLoggedIn = false;
      await this.updateUsers(users);
      Navigator.navigateAndReset('Login');
    }
  }

  async updateUsers(payload) {
    AsyncStorage.setItem('data', JSON.stringify(payload));
  }

  async getLoggedInUser() {
    let users = await this.getUsers();

    let user = _.filter(users, {isLoggedIn: true});
    return this.isEmpty(user) ? null : user[0];
  }

  async authLogin(email, password) {
    let users = await this.getUsers();
    console.log(users, 'users');
    let newUser = _.filter(users, function (item) {
      return item.email === email && item.password === password;
    });

    return this.isEmpty(newUser) ? false : newUser;
  }

  async setUserLogin(email) {
    let users = await this.getUsers();
    if (users) {
      users.find((o) => o.email === email).isLoggedIn = true;
      await this.updateUsers(users);

      global.userData = users.find((o) => o.email === email);

      Navigator.navigateAndReset('Track');
    }

    return false;
  }

  async clearStorage() {
    AsyncStorage.clear();
  }
}

export default new Utils();
