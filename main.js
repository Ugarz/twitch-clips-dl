const helpers = require('./helpers/twitch')

helpers.authenticate()
  .then(({ authInfos, userInfos }) => {
    console.log('authInfos', authInfos)
    console.log('userInfos', userInfos)

    helpers.getAllClips(authInfos, userInfos.id)
      .then(clips => {
        console.log(`Il y a ${clips.length} clips`)
        clips.forEach(clip => {
          // TODO: use puppeteer to fetch url in DOM
          // TODO: dl clips in folder
          console.log(clip)
        });
      })
  })
  .catch(error => console.log(error))
