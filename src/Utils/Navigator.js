import {
  CommonActions,
  StackActions,
  CommonNavigationAction,
} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  console.log('dadadadsad', navigatorRef);
  navigator = navigatorRef;
}

function navigate(routeName, params = {}) {
  navigator.navigate(routeName);
}

function navigateAndReset(routeName, params = {}) {
  navigator.reset({
    index: 0,
    key: null,
    routes: [{name: routeName, params}],
  });
}

function goBack() {
  navigator.goBack();
}

export default {
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
  goBack,
};
