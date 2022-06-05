/**
 * The browser will render raw code in a <pre> element by default. We look for a
 * lone <pre> element to determine whether to bootstrap the viewer. If there is a
 * lone <pre> element, we bootstrap the viewer by removing the default viewer and
 * adding the VS Code viewer. The VS Code viewer is run in an iframe with
 * configuration passed using `window.postMessage`.
 */

import "./popup.html";

type VsCodeViewerConfig = {
  content: string;
  contentType: string;
  fileExtension: string;
  prefersDarkTheme: boolean;
};

class VsCodeViewerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const getPreElement = () => {
  const preElement = document.querySelector("pre");

  if (!preElement) {
    throw new VsCodeViewerError("No <pre> element found.");
  }

  return preElement;
};

const isDefaultViewer = () => {
  const unexpectedElements = document.querySelectorAll(
    "body>*:not(pre), body>*>*"
  );
  const valueContainer = document.querySelector("body>pre");

  return Boolean(!unexpectedElements.length && valueContainer);
};

const removeDefautViewer = () => {
  const preElement = getPreElement();
  document.body.removeChild(preElement);

  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
};

const addVsCodeViewer = (config: VsCodeViewerConfig) => {
  const receiveMessage = (event: MessageEvent) => {
    console.log("MessageEvent", event);

    if (event.data.ready) {
      const { contentWindow } = iframe;

      if (!contentWindow) {
        throw new VsCodeViewerError("No contentWindow found.");
      }

      contentWindow.postMessage({ config }, "*");
    }
  };

  const url = chrome.runtime.getURL("srv/index.html");
  console.log(url);

  window.addEventListener("message", receiveMessage, false);

  const iframe = document.createElement("iframe");
  iframe.sandbox.add("allow-scripts", "allow-same-origin");
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.display = "block";
  iframe.style.overflow = "hidden";
  iframe.style.border = "none";
  iframe.src = url;
  document.body.appendChild(iframe);
};

/**
 * Main
 */

if (isDefaultViewer()) {
  const preElement = getPreElement();

  addVsCodeViewer({
    content: preElement.innerText,
    contentType: document.contentType.toLowerCase(),
    prefersDarkTheme:
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    fileExtension: "." + document.location.pathname.split(".").pop(),
  });

  removeDefautViewer();
}
