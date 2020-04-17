import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import castContext from "../context/castContext";

import CastReceiver from "../interfaces/CastReceiver";

/**
 * CastProvider is a component to use arround every component you go use with `react-cast` hooks
 *
 * Ex:
 * ```jsx
 *  import CastProvider from 'react-cast'
 *  function App () {
 *    return (
 *      <CastProvider>
 *        {
 *          // your components using react-cast hooks goes here
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
    setTimeout(() => {
      // @ts-ignore
      const castReceiver = window.chrome.cast as CastReceiver;

      // @ts-ignore
      const castSender = window.cast.framework as any;
      setCast({
        castReceiver,
        castSender,
      });
    }, 600);
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
