const dotenv = require('dotenv').config()
const axios = require('axios')
const qs = require('qs');
require('axios-debug-log')
/**
 * Twitch Authentication
 */
const auth = async () => {
  try {
    const url = 'https://id.twitch.tv/oauth2/token'

    const authParams = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }

    const res = await axios.post(url, qs.stringify(authParams));

    return res.data;
  } catch (error) {
    console.log('Error while authentication', error)
    throw error
  }
}

/**
 * Get User's informations
 * @param {String} token Twitch api access_token
 * @param {String} userNickName The broadcaster's Name
 */
const getUser = async (token, userNickName) => {
  try {
    const url = 'https://api.twitch.tv/helix/users'

    const config = {
      params: { login: userNickName || 'carbow' },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.twitchtv.v5+json",
        "Client-ID": process.env.CLIENT_ID
      }
    }

    const res = await axios.get(url, config);

    return res.data.data[0];
  } catch (error) {
    console.log('Error data', error.response.data)
  }
}

/**
 * Authentication and fetch user's informations
 */
const authenticate = async () => {
  try {
    const authInfos = await auth()
    const userInfos = await getUser(authInfos.access_token)

    return { authInfos, userInfos };
  } catch (error) {
    console.log('\nError request headers', error.response.config)
    console.log('Error data', error.response.data)
    throw error;
  }
}


/**
 * Fetch clips for a broadcaster
 * @param {Object} authInfos Authentication informations
 * @param {String} broadcaster_id Broadcaster identifier
 */
const getAllClips = async (authInfos, broadcaster_id) => {
  console.log('Get clips for', authInfos, broadcaster_id)
  const config = {
    params: { broadcaster_id },
    headers: {
      "authorization": `Bearer ${authInfos.access_token}`,
      "Client-ID": process.env.CLIENT_ID
    }
  }
  const clips = await axios.get('https://api.twitch.tv/helix/clips', config)
  return clips.data.data;
}


module.exports = {
  authenticate,
  getAllClips
}