'use strict'

import moment from 'moment'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
	Image,
	TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Text,
	ListView
} from 'react-native'


class Feed extends Component {
  constructor(props){
    super(props)

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1!=r2
		})
		this.state = {
			dataSource: ds,
			showProgress: true
		}
  }

	componentDidMount() {
			this.fetchFeed()
	}

	fetchFeed() {
		require('./AuthService').getAuthInfo((err, authInfo) => {
			let url = 'https://api.github.com/users/'
					+ authInfo.user.login
					+ '/received_events'
			fetch(url, {
				headers: authInfo.header
			})
			.then((response) => response.json())
			.then((responseData) => {
				//let feedItems = responseData.filter((ev) => ev.type == 'PushEvent')
				let feedItems = responseData
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(feedItems),
					showProgress: false
				})
			})
		})
	}

  pressRow(rowData) {
    console.log(rowData.actor.login)
  }

	renderRow(rowData) {
		return (
      <TouchableHighlight onPress={() => this.pressRow(rowData)} underlayColor='#ddd'>
        <View style={{
    			flex: 1,
    			flexDirection: 'row',
    			padding: 20,
    			alignItems: 'center',
    			borderColor: '#D7D7D7',
    			borderBottomWidth: 1
    		}}>
  			<Image
  				source={{uri: rowData.actor.avatar_url}}
  				style={{
  					height: 36,
  					width: 36,
  					borderRadius: 18
  				}}/>
  				<View style={{paddingLeft: 20}}>
  					<Text>{moment(rowData.created_at).fromNow()}</Text>
  					<Text>{rowData.actor.login}</Text>
  					<Text>{rowData.repo.name}</Text>
  					<Text style={{fontWeight: 'bold'}}>{rowData.payload.action}</Text>
  				</View>
  		</View>
    </TouchableHighlight>
	)}

  render() {
		if(this.state.showProgress) {
			return (
				<View style={{
					flex: 1,
					justifyContent: 'center'
				}}>
					<ActivityIndicator size='large' animating={ true } />
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	listRow: {
		color: '#333',
		alignSelf: 'center'
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
	LogoutButton: {
		height: 100,
		backgroundColor: '#48BBEC',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center',
    marginBottom:50
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

module.exports = Feed
