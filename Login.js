'use strict'

import React, { Component } from 'react'
import buffer from 'buffer/'
import {
  StyleSheet,
  View,
	Image,
	TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Text
} from 'react-native'

let authService = require('./AuthService')

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      showProgress: false
    }
  }

  render() {
    let errorCtrl = <View />
    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        The username and password combination did not work
      </Text>
    }
    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        Unknown error
      </Text>
    }
    return (
			<View style={styles.container}>
				<Image style={styles.logo}
					source={require('./images/Octocat.png')}/>
				<Text style={styles.heading}>
					Github browser
				</Text>
				<TextInput style={styles.input} placeholder="Github username"
          onChangeText={text => this.setState({username: text})}
        />
				<TextInput style={styles.input} placeholder="Github password" secureTextEntry={ true }
          onChangeText={text => this.setState({password: text})}
        />
				<TouchableHighlight onPress={this.onLoginPress.bind(this)} style={styles.button}>
					<Text style={styles.buttonText}>
						Log in
					</Text>
				</TouchableHighlight>
        {errorCtrl}
        <ActivityIndicator animating={ this.state.showProgress } size="large" style={styles.loader}/>
			</View>
    )
  }

  onLoginPress() {
    this.setState({ showProgress: true })
    authService.login({username: this.state.username, password: this.state.password}, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results))
      if(this.state.success && this.props.onLogin()) {
        this.props.onLogin()
      }
    })
  }
}

var styles = StyleSheet.create({
	container: {
    //flex: 1,
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
		fontSize: 30,
		marginTop: 10,
    height: 30,
    marginBottom: 20
	},
	input: {
		height: 50,
		padding: 4,
		marginTop: 10,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC'
	},
	button: {
		height: 50,
		backgroundColor: '#48BBEC',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	},
  loader: {
    marginTop: 30
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 10,
    height: 10
  }
})

module.exports = Login
