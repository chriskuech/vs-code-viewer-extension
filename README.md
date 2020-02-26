
VS Code Viewer is an unofficial port of [VS Code's editor component](https://github.com/microsoft/monaco-editor) to a browser extension for automatically viewing programming language files and data files with VS Code's default language support. 

## Zero-Conf

* Theme is inferred from your browser/OS theme.
* Language is automatically inferred from content type and file extension.

## Limitations

* **No extension support.** Extensions can't be supported until [Monaco](https://github.com/microsoft/monaco-editor) supports extensions.
* **Allow scripts.** The extension is served in an iframe within the parent page, so the page must allow scripts.  Some sites (like GitHub) prevent viewing raw code with scripts for security reasons.
