'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
	Image,
	TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Text,
	TabBarIOS
} from 'react-native'

import Feed from './Feed'

class AppContainer extends Component {
  constructor(props){
    super(props)

		this.state = {
			selectedTab: 'feed'
		}
  }

  render() {
		return (
			<TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          icon={require('./images/inbox.png')}
          selected={this.state.selectedTab === 'feed'}
          onPress={() => {
            this.setState({
              selectedTab: 'feed',
            });
          }}>
          <Feed />
        </TabBarIOS.Item>
				<TabBarIOS.Item
          title="Feed"
          icon={require('./images/search.png')}
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          <Text style={styles.welcome}> Feed 2 </Text>
        </TabBarIOS.Item>
			</TabBarIOS>
		)
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
	welcome: {
		fontSize: 20,
		marginTop: 10,
    height: 30,
    marginBottom: 20
	},
})

module.exports = AppContainer
