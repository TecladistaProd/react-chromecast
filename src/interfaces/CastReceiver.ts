type Constructor = new (...args: any[]) => any;

export default interface CastReceiver {
  SessionRequest: new (...args: Array<any>) => any;
  media: {
    MediaInfo: new (p: string) => any;
    LoadRequest: new (p: string) => any;
    [key: string]: any;
  };
  Capability: {
    [key: string]: string;
  };
  ApiConfig: new (...args: Array<any>) => any;
  initialize: (
    ApiConfig: any,
    initSucess: (e: any) => void,
    initError: (e: any) => void
  ) => void;
  requestSession: (
    initSucess: (e: any) => void,
    initError: (e: any) => void
  ) => void;
}
