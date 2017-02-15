import buffer from 'buffer/'
import { AsyncStorage } from 'react-native'

const authKey = 'auth'
const userKey = 'user'

class AuthService {
	 objectify(array) {
    return array.reduce(function(result, currentArray) {
        result[currentArray[0]] = currentArray[1];
        return result;
    }, {});
	}

	getAuthInfo(cb) {
		AsyncStorage.multiGet([authKey, userKey], (err, val) => {

			if(err) {
				return cb(err)
			}
			if(!val) {
				return cb()
			}

			let zippedObj = this.objectify(val)
			console.log('Authentication key '+zippedObj[authKey])
			console.log(zippedObj)

			if(!zippedObj[authKey]) {
				return cb()
			}
			//return cb() //Remember to remove it

			let authInfo = {
				header: {
					Authorization: 'Basic '+zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			}
			console.log('Authentication info '+authInfo)
			return cb(null, authInfo)
		})
	}

	login(creds, cb) {
		let b = new buffer.Buffer(creds.username+':'+creds.password)
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
        unknownError: response.status != 401,
        success: false
      }
    })
    .then((response) => {
			return response.json()
    })
		.then((results) => {
			AsyncStorage.multiSet([
				[authKey, encodedAuth],
				[userKey, JSON.stringify(results)]
			], (err) => {
				if(err) {
					throw err
				}
				console.log("Inserted auth values")
				return cb({success: true})
			})
		})
    .catch((err) => {
			return cb(err)
    })
	}
}

module.exports = new AuthService()
