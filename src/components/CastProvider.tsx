import * as React from 'react';

import { Helmet } from 'react-helmet';
import castContext from '../context/castContext';

import CastReceiver from '../interfaces/CastReceiver';

import toWait from '../helpers/toWait';

const { useState, useEffect } = React;

/**
 * CastProvider is a component to use arround every component you go use with `react-chromecast` hooks
 *
 * Ex:
 * ```jsx
 *  import CastProvider from 'react-chromecast'
 *  function App () {
 *    return (
 *      <CastProvider>
 *        {
 *          // your components using react-chromecast hooks goes here
 *        }
 *      </CastProvider>
 *    )
 *  }
 * ```
 */
function CastProvider({ children }: { children: any }) {
  const [cast, setCast] = useState<{
    castReceiver?: CastReceiver;
    castSender?: any;
  }>({});
  const [session, setSession] = useState<any>({});
  useEffect(() => {
    (async () => {
      let toBreak = false;
      let tries = 15;
      let castReceiver: CastReceiver;
      let castSender: any;
      while (true) {
        try {
          // @ts-ignore
          castReceiver = window.chrome.cast as CastReceiver;
          // @ts-ignore
          castSender = window.cast.framework as any;
          toBreak = true;
        } catch (err) {
          tries--;
          if (!tries) {
            toBreak = true;
          }
        } finally {
          if (toBreak) break;
        }
        await toWait(95);
      }
      // @ts-ignore
      if (tries !== 0 && !!castReceiver) {
        setCast({
          castReceiver,
          castSender,
        });
      } else {
        throw new Error("Can't Load castReceiver and\\or castSender");
      }
    })();
  }, []);
  return (
    <>
      <Helmet>
        <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
        <script src="//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js" />
      </Helmet>
      <castContext.Provider
        value={{
          ...cast,
          session,
          setSession,
        }}
      >
        {children}
      </castContext.Provider>
    </>
  );
}

export default CastProvider;
