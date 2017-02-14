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

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      showProgress: false
    }
  }

  render() {
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
        <ActivityIndicator animating={ this.state.showProgress } size="large" style={styles.loader}/>
			</View>
    )
  }

  onLoginPress() {
    console.log("Attempting to log in " + this.state.username + " with Password " + this.state.password)
    this.setState({ showProgress: true })
    let b = new buffer.Buffer(this.state.username+':'+this.state.password)
    let encodedAuth = b.toString('base64')
    fetch('https://api.github.com/user',{
      headers: {
        Authorization: 'Basic '+encodedAuth
      }
    })
    .then((response) => {
      console.log(response.status)
      if(response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((results) => {
      this.setState({ showProgress: false })
    })
    .catch((err) => {
      console.log(err)
      this.setState(err)
    })
    .finally(() => {
      this.setState({ showProgress: false })
    })
  }
}

var styles = StyleSheet.create({
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
		fontSize: 30,
		marginTop: 10,
    height: 30
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
})

module.exports = Login
