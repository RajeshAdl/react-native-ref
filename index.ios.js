/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var Login = require('./Login')

export default class tutorial extends Component {
  render() {
    return (
      <View>
        <Login />
      </View>
    )
  }
}

AppRegistry.registerComponent('tutorial', () => tutorial);
