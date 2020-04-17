import React, { useEffect, useCallback } from "react";

import { storiesOf } from "@storybook/react";

import CastProvider, { useCast } from "../src";

function HookTest() {
  const cast = useCast({
    initialize_media_player: "DEFAULT_MEDIA_RECEIVER_APP_ID",
    auto_initialize: true,
  });

  const handleconnect = useCallback(async () => {
    if (cast.castReceiver) {
      await cast.handleConnection();
    }
  }, [cast.castReceiver, cast.handleConnection]);

  return (
    <>
      <h1 style={{ color: "#fff" }}>Hello World</h1>
      <button
        style={{
          marginTop: "10px",
          padding: "1rem",
          border: "none",
          background: "#7159c1",
          fontWeight: "bold",
          color: "#fff",
          fontSize: "1.2rem",
        }}
        onClick={handleconnect}
      >
        Connect
      </button>
    </>
  );
}

storiesOf("useCast", module).add("Default", () => (
  <CastProvider>
    <HookTest />
  </CastProvider>
));
