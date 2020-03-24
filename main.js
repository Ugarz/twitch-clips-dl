const helpers = require('./helpers/twitch')

helpers.authenticate()
  .then(({ authInfos, userInfos }) => {
    console.log('\nFIN', authInfos, userInfos)
    // helpers.getAllClips('1234', authInfos)
    //   .then(clips => console.log('Clips', clips))
    //   .catch(e => console.log(e))
  })

// TODO: fetch list of clips
// TODO: use puppeteer to fetch url in DOM
// TODO: dl clips in folder
