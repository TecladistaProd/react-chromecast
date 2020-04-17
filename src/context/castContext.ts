import { createContext } from "react";

import CastReceiver from "../interfaces/CastReceiver";

const castContext = createContext<{
  castReceiver?: CastReceiver;
  castSender?: any;
  setSession?: (p: any) => void;
  session?: any;
}>({});

export default castContext;
