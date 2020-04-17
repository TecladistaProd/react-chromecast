import React from "react";

import { storiesOf } from "@storybook/react";

import CastProvider from "../src";

import MediaTest from "./components/MediaTest";

storiesOf("useMedia", module).add("Default", () => (
  <CastProvider>
    <MediaTest />
  </CastProvider>
));
