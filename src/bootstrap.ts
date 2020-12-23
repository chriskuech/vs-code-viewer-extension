
const isDefaultViewer = () => {
    const unexpectedElements = document.querySelectorAll("body>*:not(pre), body>*>*");
    const valueContainer = document.querySelector("body>pre");

    return Boolean(!unexpectedElements.length && valueContainer);
};

const removeDefautViewer = () => {
    document.body.removeChild(document.querySelector("pre"));

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
}

const addVsCodeViewer = (config) => {
    const receiveMessage = (event: MessageEvent) => {
        console.log("MessageEvent", event);

        if (event.data.ready) {
            iframe.contentWindow.postMessage({ config }, "*");
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
}

if (isDefaultViewer()) {
    addVsCodeViewer({
        content: document.querySelector("pre").innerText,
        contentType: document.contentType.toLowerCase(),
        prefersDarkTheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        fileExtension: "." + document.location.pathname.split('.').pop(),
    });

    removeDefautViewer();
}
