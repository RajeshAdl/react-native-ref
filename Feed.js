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

	renderRow(rowData) {
		console.log(rowData)
		return <View style={{
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
	}

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
	}
})

module.exports = Feed
