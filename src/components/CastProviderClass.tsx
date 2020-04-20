import React from 'react';

import { Helmet } from 'react-helmet';
import castContext from '../context/castContext';

import CastReceiver from '../interfaces/CastReceiver';

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
class CastProvider extends React.PureComponent<
  {},
  {
    cast: {
      castReceiver?: CastReceiver;
      castSender?: any;
    };
    session: any;
  }
> {
  constructor(props: any[]) {
    super(props);
    this.state = {
      cast: {},
      session: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // @ts-ignore
      const castReceiver = window.chrome.cast as CastReceiver;

      // @ts-ignore
      const castSender = window.cast.framework as any;
      this.setState({
        cast: {
          castReceiver,
          castSender,
        },
      });
    }, 600);
  }

  setSession = (value: any) => {
    this.setState({ session: value });
  };

  render() {
    return (
      <>
        <Helmet>
          <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
          <script src="//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js" />
        </Helmet>
        <castContext.Provider
          value={{
            ...this.state.cast,
            session: this.state.session,
            setSession: this.setSession,
          }}
        >
          {this.props.children}
        </castContext.Provider>
      </>
    );
  }
}

export default CastProvider;
