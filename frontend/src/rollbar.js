import Rollbar from "rollbar";

const rollbar = new Rollbar({
  accessToken: "aa9f1ac615ee4f3f9e57df31a5fefdf3",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
});

export default rollbar;
