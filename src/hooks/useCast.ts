import { useEffect, useContext, useCallback, useState } from "react";

import castCtx from "../context/castContext";

import CastReceiver from "../interfaces/CastReceiver";

interface Props {
  /**
   * @param initialize_media_player - is media_receiver id
   *
   * if you pass auto_initialize as true you should pass this
   *
   * you should pass media_receiver id or 'DEFAULT_MEDIA_RECEIVER_APP_ID' to use default media receiver
   */
  initialize_media_player?: string;
  /**
   * @param auto_initialize - you can use this to auto initialize cast media player when castReceiver was define
   *
   * you not need to pass nothing to this if you go initialize by yourself
   */
  auto_initialize?: boolean;
}

interface Cast {
  /**
   * Function to initialize cast player before connect to chromecast
   *
   * This function should wait for castReceiver
   *
   * @param media_player - you should pass media_receiver id or 'DEFAULT_MEDIA_RECEIVER_APP_ID' to use default media receiver
   *
   * Example:
   * ```jsx
   *  const cast = useCast()
   *  useEffect(() => {
   *    if(cast.castReceiver){
   *      cast.initializeCast('DEFAULT_MEDIA_RECEIVER_APP_ID')
   *    }
   *  }, [cast.castReceiver])
   * ```
   */
  initializeCast?: (media_player: string) => void;
  /**
   * Function to connect and disconnect client to chromecast
   */
  handleConnection: () => Promise<any>;
  /**
   * castReceiver object, from cast_receiver google lib
   */
  castReceiver?: CastReceiver;
  /**
   * castSender object, from cast_sender google lib
   */
  castSender?: any;
  /**
   * this inidicate if client is connected with chromecast or not
   */
  isConnect: boolean;
}

function useCast(props?: Props) {
  const { initialize_media_player, auto_initialize } = props || {};

  const { castReceiver, castSender, setSession } = useContext(castCtx);
  const [cast, setCast] = useState({});
  const [isConnect, setIsConnect] = useState(false);
  const initiliazeCast = useCallback(
    (media_player: string) => {
      if (!castReceiver) return;
      const sessionRequest = new castReceiver.SessionRequest(
        castReceiver.media[media_player]
      );
      const apiConfig = new castReceiver.ApiConfig(
        // @ts-ignore
        sessionRequest,
        (e: any) => {
          // console.log("ss listener", e);
          if (setSession) setSession(e);
          setIsConnect(true);
        },
        (e: any) => {
          // console.log("rc listener", e);
        }
      );
      castReceiver.initialize(
        apiConfig,
        (e: any) => {
          // console.log("init success", e);
        },
        (e: any) => {
          // console.log("init error", e);
        }
      );
      setCast({
        castReceiver,
      });
    },
    [castReceiver, setSession]
  );

  const handleConnection = useCallback(
    () =>
      new Promise((res, rej) => {
        if (castReceiver) {
          // @ts-ignore
          castReceiver.requestSession(
            (e: any) => {
              if (setSession) setSession(e);
              setIsConnect(true);
              res(e);
            },
            (e: any) => {
              setIsConnect(false);
              if (!isConnect) return rej(e);
              return res(null);
            }
          );
        }
      }),
    [castReceiver, setSession]
  );

  useEffect(() => {
    if (castReceiver) {
      setCast({ castReceiver });
      if (auto_initialize && !initialize_media_player)
        throw new Error(
          "if you pass auto_initialize: true, you should pass initialize_media_player"
        );
      else if (auto_initialize && initialize_media_player)
        initiliazeCast(initialize_media_player);
    }
  }, [castReceiver, castSender]);

  const Cast = { ...cast, handleConnection, isConnect } as Cast;

  if (!auto_initialize) {
    Cast["initializeCast"] = initiliazeCast;
  }

  return Cast;
}

export default useCast;
