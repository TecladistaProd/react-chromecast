import React, { useCallback } from 'react';

import { useCast, useMedia } from '../../src';

export default function HookTest() {
  const cast = useCast({
    initialize_media_player: 'DEFAULT_MEDIA_RECEIVER_APP_ID',
    auto_initialize: true,
  });

  const handleconnect = useCallback(async () => {
    if (cast.castReceiver) {
      await cast.handleConnection();
    }
  }, [cast.castReceiver, cast.handleConnection]);

  const media = useMedia();

  const handleitem = useCallback(async () => {
    await media.addMedia(
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    );
  }, [media.isMedia]);

  const handleprev = useCallback(async () => {
    await media.prev();
  }, [media.isMedia]);

  const handlenext = useCallback(async () => {
    await media.next();
  }, [media.isMedia]);

  const handleplay = useCallback(async () => {
    if (!media.isMedia && cast.isConnect) {
      await media.playMedia(
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      );
    } else {
      await media.play();
    }
  }, [media.isMedia, cast.isConnect]);

  const handlepause = useCallback(async () => {
    if (media.isMedia) {
      await media.pause();
    }
  }, [media.isMedia, cast.isConnect]);

  const handleto = useCallback(async () => {
    if (media.isMedia) {
      await media.to(120);
    }
  }, [media.isMedia, cast.isConnect]);

  return (
    <>
      <h1 style={{ color: '#fff' }}>Hello World</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
        }}
      >
        <button
          style={{
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#7159c1',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handleconnect}
        >
          Connect
        </button>
        <button
          style={{
            display: 'block',
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#715991',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handleplay}
        >
          Play
        </button>
        <button
          style={{
            display: 'block',
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#715991',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handlepause}
        >
          Pause
        </button>
        <button
          style={{
            display: 'block',
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#715991',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handleitem}
        >
          Add Item
        </button>
        <button
          style={{
            display: 'block',
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#715991',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handlenext}
        >
          Next
        </button>
        <button
          style={{
            display: 'block',
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#715991',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handleprev}
        >
          Prev
        </button>
        <button
          style={{
            display: 'block',
            margin: '0 10px',
            padding: '1rem',
            border: 'none',
            background: '#715991',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          onClick={handleto}
        >
          To
        </button>
      </div>
    </>
  );
}
