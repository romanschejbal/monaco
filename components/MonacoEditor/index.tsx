import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    const path = `/_next/static/${process.env.BUILD_ID}/monaco/`;
    if (label === "json") {
      return path + "json.worker.js";
    }
    if (label === "css") {
      return path + "css.worker.js";
    }
    if (label === "html") {
      return path + "html.worker.js";
    }
    if (label === "typescript" || label === "javascript") {
      return path + "ts.worker.js";
    }
    return path + "editor.worker.js";
  }
};

export default function MonacoEditor() {
  const target = useRef(null);
  useEffect(() => {
    monaco.editor.create(target.current, {
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
        "\n"
      ),
      language: "javascript"
    });
  });

  return <div ref={target} style={{ height: "100vh" }} />;
}
