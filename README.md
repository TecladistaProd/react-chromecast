![React-Chromecast Icon](https://raw.githubusercontent.com/gist/TecladistaProd/8594d63e85854f35432d3262365aea6b/raw/c280e16d8ae4c4443b99a1b7facc3600b7ffdcdb/react-chromecast.svg)

# react-chromecast

**react-chromecast** is abstraction to cast_sender and cast_receiver (chromecast libs) of google.

> This lib just work in **chrome** and chrome based browsers like the new **Edge**.
> This lib use react hooks.
> This is a working in progress lib then could have some bugs and not have some functions.

# Features

  - Connect browser with chromecast
  - Send url media to chromecast play
  - add more url media to chromecast queue
  - play
  - pause
  - jump to specified second
  - jumpt to next media in queue
  - jump to prev media in queue
 
### How to use

First you need to install the lib using using npm `npm install react-chromecast` or using yarn `yarn add react-chromecast`

Second, every __react-chromecast__ hooks should by a component inside **CastProvider**

```jsx
import React from 'react';
import CastProvider from 'react-chromecast';

function App () {
    return (
        <CastProvider>
            {
                // your components goes here
            }
        </CastProvider>
    )
}
```

after that you can use the **useCast** and **useMedia** react-chromecast hooks inside your components.

Usage Example:

#### useCast
useCast function, you could pass an object argument with 2 properties `initialize_media_player` where you pass media receiver id or `"DEFAULT_MEDIA_RECEIVER_APP_ID"` to use default media receiver player, and `auto_initialize` where you pass a boolean value, if you not pass this you should initialize cast media player receiver by your self using `cast.initiliazeCast` function, passing the media receiver id, if you pass true value you should pass `initialize_media_player`.

```jsx
// CastButton component
import React, { useCallback } from 'react';
import { useCast } from 'react-chromecast';

function CastButton () {
    const cast = useCast({
        initialize_media_player: "DEFAULT_MEDIA_RECEIVER_APP_ID",
        auto_initialize: true,
    })
    const handleClick = useCallback(async () => {
        if(cast.castReceiver) {
            await cast.handleConnection();
        }
    }, [cast.castReceiver, cast.handleConnection])
    return (
        <button onClick={handleClick}>castIcon</button>
    )
}
```

useCast will return an object with `castReceiver`, `castSender`, `isConnect`, `initializeCast`, `handleConnection`.

- **castReceiver**: is undefined until the CastProvider provide castReceiver from window.chrome.cast, you could use to do everything by yourself. documentation [here](https://developers.google.com/cast/docs/reference/chrome/chrome.cast).
- **castSender**: is undefined until the CastProvider provide castSender from window.cast.framework, you could use to do everything by yourself. documentation [here](https://developers.google.com/cast/docs/reference/chrome/cast.framework).
- **isConnect**: is a boolean indicating if the page is connect with chromecast.
- **initializeCast**: if auto_initialize was passe with `true` value, this will be undefined, if not, will be an async function to initialize cast media player, you should pass media receiver id like parameter.
- **handleConnection**: async function to connect and disconnect page with chromecast

#### useMedia

```jsx
// Videocomponent
import React, { useCallback } from 'react';
import { useMedia } from 'react-chromecast';

const mediaSrc = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"

function Video() {
    const media = useMedia()
    const playVideo = useCallback(async () => {
    if (media) {
      await media.playMedia(mediaSrc);
    }
  }, [media]);
  return (
    <>
        <button onClick={playVideo}>Play</button>
    </>
  )
}
```

useMedia will return an object with `playMedia`, `addMedia`, `play`, `pause`, `isMedia`, `next`, `prev`, `to`.

- **playMedia**: async function to play an media url on chromecast, you should pass an media url like function parameter
- **addMedia**: async function to add an media url to chromecast queue, you should pass an media url like function parameter
- **play**: async function to play actual chromecast media
- **pause**: async function to pause actual chromecast media 
- **isMedia**: boolean to indicate if chromecast is playing an media (when connected)
- **next**: async function to jump to next video in chromecast queue
- **prev**: async function to jump to prev video in chromecast queue
- **to`**: async function to jump to second passed in parameter

> media url should be an url accessible to chromecast like an external url eg: `"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"`, or an internal server accessible in the same network.
> actually you need to use playMedia before use other functions like (addMedia).

## Help this Project
****

You can **help** this project supporting us in the button below.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HHWEKX97SKYAQ)