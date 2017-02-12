'use strict'

import React, { Component } from 'react'
import buffer from 'buffer'
import {
  StyleSheet,
  Text,
  View,
	Image,
	TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      showProgress: false
    }
  }

  render() {
    console.log(this.state.showProgress)
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
    console.log("Login press, Username is " + this.state.username + " and Password is " + this.state.password)
    let b = new buffer.Buffer('hello')
    console.log(b.toString('base64'))
    // this.setState({ showProgress: true })
    // fetch('https://api.github.com/search/repositories?q=react')
    // .then((response) => {
    //   return response.json()
    // })
    // .then((results) => {
    //   console.log(results)
    // })
    //
    // this.setState({ showProgress: false })

  }
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10
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
  }
})

module.exports = Login
