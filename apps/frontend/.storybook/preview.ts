import { initialize, mswLoader } from "msw-storybook-addon";
// import handlers from "../src/mocks/handlers";

initialize({
  // serviceWorker: {
  //   url: "../public/mockServiceWorker.js",
  // },
  onUnhandledRequest: "bypass",
});

export const loaders = [mswLoader];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // msw: { handlers }, // Global handler
};
