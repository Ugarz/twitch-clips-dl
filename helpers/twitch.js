const dotenv = require('dotenv').config()
const axios = require('axios')
const qs = require('qs');

const auth = async () => {
  try {
    const url = 'https://id.twitch.tv/oauth2/token'

    const authParams = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }

    const res = await axios.post(url, qs.stringify(authParams));
    console.log('AuthInfos', res.data)
    axios.defaults.headers.common = { 'authorization': `${res.data.token_type} ${res.data.access_token}` }
    console.log(axios.defaults.headers)
    return res.data;
  } catch (error) {
    console.log('Error while authentication', error)
  }
}

const getUser = async (token) => {
  try {
    const url = 'https://api.twitch.tv/helix/users?login=carbow'
    const config = {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }
    const res = await axios.post(url, {}, config);
    return res.data;
  } catch (error) {
    console.log('Error data', error.response.data)
  }
}


const init = async () => {
  try {
    
    const authInfos = await auth()
    console.log('Init authInfos', authInfos)

    const userInfos = await getUser(authInfos.access_token)
    console.log('Init userInfos', userInfos)

    return {authInfos, userInfos};
  } catch (error) {
    console.log('\nError request headers', error.response.config)
    console.log('Error data', error.response.data)
  }
}



function getAllClips(broadcaster_id, authInfos) {
  console.log('Get clips for', broadcaster_id)
  return axios
    .post('https://api.twitch.tv/helix/clips', qs.stringify({ 'broadcaster_id': broadcaster_id }),
      { headers: `${authInfos.token_type} ${authInfos.access_token}`})    .then(result => {
      console.log(result)
      return result
    })
    .catch(e => console.log(e))
}


module.exports = {
  authenticate: init,
  getAllClips
}