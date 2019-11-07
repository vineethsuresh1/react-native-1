import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import Signup from './src/pages/Signup'
import Login from './src/pages/Login'
import Profile from './src/pages/Profile'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('loginScreen')}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('signScreen')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const AppNavigator = createStackNavigator({
  homeScreen: {
    screen: App,
  },
  loginScreen:{
    screen: Login,
  },
  signScreen:{
    screen: Signup,
  },
  profileScreen:{
    screen: Profile
  },
});
export default createAppContainer(AppNavigator);
