import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Styles, Data} from '../Common';

export default class Track extends React.Component {
  state = {
    data: Data,
    activeTrack: null,
    currentUser: global.userData,
  };

  __onPressRegister = (id, index) => {
    let {data, currentUser, activeTrack} = this.state;
    let __activeUsers = data[index].activeUsers;
    let __limit = data[index].limit;
    let trackName = data[index].name;
    let currentUserTrackid = currentUser.trackId;

    if (currentUserTrackid === id) {
      currentUser.trackId = null;
      currentUser.isRacing = false;
      data[index].activeUsers = __activeUsers - 1;
      activeTrack = null;
    } else {
      if (__limit > __activeUsers && !currentUser.isRacing) {
        data[index].activeUsers = __activeUsers + 1;
        currentUser.trackId = id;
        currentUser.isRacing = true;
        activeTrack = __limit === __activeUsers + 1 ? trackName : null;
      }
    }
    this.setState({data, currentUser, activeTrack});

    console.log(__limit, __activeUsers);
  };

  __renderItem = ({index, item}) => {
    let {activeUsers, limit, id} = item;
    let {currentUser} = this.state;
    let isRegistered = limit === activeUsers && currentUser.trackId === id;

    console.log(isRegistered, 'isRegistered');
    return (
      <View style={styles.cardItemContainer}>
        <View style={styles.cardItemView}>
          <Text>{item.name}</Text>
          <Text>{`${item.activeUsers} / ${item.limit}`}</Text>
        </View>
        <View style={styles.cardItemView}>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <TouchableOpacity
            onPress={() => this.__onPressRegister(id, index)}
            style={styles.registerBtnView}>
            <Text style={styles.registerBtnText}>
              {isRegistered ? 'Leave' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {data, activeTrack} = this.state;
    return (
      <View style={Styles.mainContainer}>
        <View style={styles.cardContainer}>
          <FlatList
            data={data}
            renderItem={this.__renderItem}
            extraData={this.state}
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerTitleText}>{`Currently Racing in: ${
            activeTrack ? activeTrack : 'NONE'
          }`}</Text>
          {activeTrack && (
            <Text style={styles.warningText}>
              Note ! Your not allowed to race until you finishes off from here
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  cardContainer: {
    paddingHorizontal: 10,
  },
  cardItemContainer: {
    borderWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  cardItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  descriptionText: {
    color: 'grey',
    fontSize: 10,
    flex: 0.8,
  },
  registerBtnView: {
    backgroundColor: 'green',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  footerContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  footerTitleText: {
    fontSize: 20,
  },
  registerBtnText: {
    color: '#fff',
  },
  warningText: {
    fontSize: 18,
    color: 'red',
  },
};
