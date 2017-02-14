import buffer from 'buffer/'

class AuthService {
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
			return cb({success: true})
		})
    .catch((err) => {
			return cb(err)
    })
	}
}

module.exports = new AuthService()
