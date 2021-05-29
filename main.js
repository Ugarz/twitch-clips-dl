const { twitch, pup } = require('./helpers')

const { EventEmitter, setMaxListeners } = require('events')

const video = new EventEmitter()

setMaxListeners(20)

video.on('getVideo', async (url, index) => {
  console.log(':: getvideo', url, index)
  pup.getVideo(url, index)
});


twitch.authenticate()
  .then(({ authInfos, userInfos }) => {
    console.log('authInfos', authInfos)
    console.log('userInfos', userInfos)

    twitch.getAllClips(authInfos, userInfos.id)
      .then(clips => {
        console.log(clips)
        console.log(`:: Il y a ${clips.length} clips`)

        clips.reduce((clips, clip, index) => {
          pup.getVideo(clip.url, clip.title, index)
          return clips;
        }, [])

        // clips.forEach((clip, index) => {
        //   // TODO: use puppeteer to fetch url in DOM
        //   video.emit("getVideo", clip.url, index)
        // });
      })
  })
  .catch(error => console.log(error))
