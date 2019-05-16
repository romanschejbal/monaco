const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const webpack = require("webpack");
module.exports = withCSS(
  withTypescript({
    webpack(config, options) {
      const originalEntry = config.entry;
      const { buildId } = options;
      config.entry = async (...args) => {
        const entries = await originalEntry(...args);
        return {
          ...entries,
          ["static/" +
          buildId +
          "/monaco/editor.worker"]: "monaco-editor/esm/vs/editor/editor.worker.js",
          ["static/" +
          buildId +
          "/monaco/json.worker"]: "monaco-editor/esm/vs/language/json/json.worker",
          ["static/" +
          buildId +
          "/monaco/css.worker"]: "monaco-editor/esm/vs/language/css/css.worker",
          ["static/" +
          buildId +
          "/monaco/html.worker"]: "monaco-editor/esm/vs/language/html/html.worker",
          ["static/" +
          buildId +
          "/monaco/ts.worker"]: "monaco-editor/esm/vs/language/typescript/ts.worker"
        };
      };
      config.output.globalObject = "self";
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.BUILD_ID": JSON.stringify(buildId)
        })
      );
      return config;
    }
  })
);
