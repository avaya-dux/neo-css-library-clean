import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)

    },
    baseUrl: "http://127.0.0.1:3000/",
    video: false,
    defaultCommandTimeout: 10000, // default is 4000
    viewportHeight: 720,
    viewportWidth: 1280,
    
  },
});
