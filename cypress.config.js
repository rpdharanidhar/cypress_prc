// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   defaultCommandTimeout: 200000,
//   e2e: {
//     viewportWidth: 1920,
//     viewportHeight: 1080,
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     downloadsFolder: "cypress/downloads", // Custom downloads folder      
//   },
// });

const { defineConfig } = require("cypress");
 
const fs = require("fs");
const path = require("path");
 
 
 
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
        on("after:screenshot", (details) => {
          const randomFileName = `screenshot_${Date.now()}.png`;
          const newPath = path.join(path.dirname(details.path), randomFileName);
          return new Promise((resolve, reject) => {
            fs.rename(details.path, newPath, (err) => {
              if (err) {
                console.error("Error renaming screenshot:", err);
                return reject(err);
              }
              console.log(`Screenshot renamed to: ${randomFileName}`);
              resolve({ path: newPath });
            });
          });
        });
    },
    defaultCommandTimeout: 1000000,
    requestTimeout: 1000000,
    // experimentalSessionAndOrigin: true0,
    chromeWebSecurity: false,
    // viewportWidth: 1280,
    // viewportHeight: 720,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  video: true,
  videoCompression: 2,
  viewportWidth: 1920,
  viewportHeight: 1080,
});