/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: "/",

  // Remove moment.js from chart.js
  configureWebpack: (config) => {
    return {
      externals: {
        moment: "moment",
      },
    };
  },
};
