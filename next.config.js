const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");


const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withCSS({
  cssModules: true,
  url: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    })
  ),
});
// module.exports = () => {
//   /* eslint-disable */
//   const withLess = require('@zeit/next-less')
//   const lessToJS = require('less-vars-to-js')
//   const fs = require('fs')
//   const path = require('path')

//   const themeVariables = lessToJS(
//     fs.readFileSync(path.resolve(__dirname, './public/antd-custom.less'), 'utf8')
//   )
//   // fix: prevents error when .less files are required by node
//   if (typeof require !== 'undefined') {
//     require.extensions['.less'] = file => {}
//   }
//   return withLess({
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//       modifyVars: themeVariables // make your antd custom effective
//     }
//   })
// };