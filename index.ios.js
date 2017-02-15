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
  ActivityIndicator
} from 'react-native';


import Login from './Login'
import AuthService from './AuthService'
import AppContainer from './AppContainer'

export default class tutorial extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedin: false,
      checkingAuth: true
    }
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedin: authInfo!=null
      })
    })
  }
  render() {
    if(this.state.checkingAuth) {
      console.log('Authorizing '+this.state.checkingAuth)
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={ true }
            size='large'
            style={styles.loader}
          />
        </View>
      )
    }
    if(this.state.isLoggedin) {
        return (
          <AppContainer />
        )
    }
    else {
      return (
        <View>
          <Login onLogin={this.onLogin.bind(this)}/>
        </View>
      )
    }
  }
  onLogin() {
    this.setState({ isLoggedin: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		alignItems: 'center',
		padding: 10,
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 20,
		marginTop: 10,
    height: 30,
    marginBottom: 20
	},
})

AppRegistry.registerComponent('tutorial', () => tutorial);
