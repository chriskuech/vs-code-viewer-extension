// import { editor, languages } from "monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/monaco.contribution.js";
import "./index.html";

type Language = monaco.languages.ILanguageExtensionPoint;

const receiveMessageEvent = (event: MessageEvent) => {
  console.log("MessageEvent", event);

  if (event.data.config) {
    const { content, contentType, fileExtension, prefersDarkTheme } =
      event.data.config;

    const languages = monaco.languages.getLanguages();
    const byExt = (language: Language) =>
      language.extensions?.includes(fileExtension);
    const byType = (language: Language) =>
      language.mimetypes?.includes(contentType);

    const instance = monaco.editor.create(document.body, {
      value: content,
      language:
        languages.find(byExt)?.id || languages.find(byType)?.id || undefined,
      theme: prefersDarkTheme ? "vs-dark" : "vs",
    });

    window.addEventListener("resize", () => instance.layout(), false);
  }
};

window.addEventListener("message", receiveMessageEvent, false);

window.parent.postMessage({ ready: true }, "*");
