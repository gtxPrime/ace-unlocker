<div align="center">

# 🔓 Ace Editor Unlocker

### *Restore your locked Ace code editor: locally, safely, instantly.*

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://www.tampermonkey.net/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](#)
[![Maintained by](https://img.shields.io/badge/maintained%20by-%40gtxPrime-8A2BE2?style=for-the-badge)](https://github.com/gtxPrime)

</div>

---

## ✨ What is this?

A lightweight Tampermonkey userscript that fixes **locked Ace editors**; the kind you'll find embedded in coding platforms, sandboxes, and internal tools; when the page has disabled editing or pasting.

It works entirely **client-side**, in your own browser. Nothing is sent to any server, and no submit/save action is ever triggered. It simply restores your local view of the editor so you can keep reading, testing, and pasting into it.

> ⚠️ **Use responsibly.** This tool is meant for editors you own, personal sandboxes, or practice environments where no live grading/anti-cheat policy applies. Don't use it to bypass integrity controls on a live exam, assessment, or interview.

> 🚧 **Caution: Use at your own risk.** This project was built strictly for **educational and learning purposes** to understand how Ace Editor's read-only state and clipboard event handling work under the hood. The author (**@gtxPrime**) takes no responsibility for any misuse, consequences, or violations of third-party terms of service resulting from the use of this script. Use it ethically and only on systems/editors you have the right to modify.

---

## 🧩 Features

| Feature | Description |
|---|---|
| 🔍 **Auto-detection** | Automatically finds the Ace editor instance inside `.editor-wrapper`, even in SPA apps where it loads late |
| 🔓 **Read-only unlock** | Calls Ace's own `setReadOnly(false)` API (not just DOM attribute stripping) so the fix actually sticks |
| 📋 **Paste re-enabler** | Removes blocked `paste`/`copy`/`cut` listeners and restores native clipboard behavior |
| 🔁 **Persistent** | Re-checks every 2 seconds in case the host page tries to re-lock the editor |
| 🧼 **Zero network calls** | Runs 100% locally; does not touch your account, session, or any remote endpoint |

---

## 📦 Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension (Chrome, Firefox, Edge, Brave, and Safari are all supported).
2. Click on the Tampermonkey icon → **Create a new script**.
3. Delete the default template and paste in the contents of [`ace-unlocker.user.js`](./ace-unlocker.user.js).
4. Save with `Ctrl+S` / `Cmd+S`.
5. Make sure the script is **enabled** in your Tampermonkey dashboard.

---

## 🚀 Usage

1. Navigate to the page containing your locked Ace editor.
2. The script activates automatically once `.editor-wrapper` and the Ace instance are detected on the page.
3. Click into the editor; it should now be:
   - ✅ Editable
   - ✅ Paste-enabled (`Ctrl+V` / right-click → Paste)
4. If the page tries to re-lock the editor later (e.g. on a timer), the script will silently unlock it again in the background.

No configuration, no build step, no setup: just install and load the page.

---

## 🛠️ How it works

Most "locked" Ace editors aren't actually broken; they're intentionally set to read-only mode via Ace's internal API (`editor.setReadOnly(true)`), and paste events are blocked by a capture-phase event listener somewhere up the DOM tree.

This script:

1. Locates the live Ace editor instance (`editor.env.editor` or via `window.ace.edit()`).
2. Flips the internal read-only flag back with Ace's own API, so it doesn't get silently re-applied on the next re-render.
3. Clones the underlying `<textarea>` to strip any inline blocking listeners.
4. Installs a capture-phase guard on `paste` / `copy` / `cut` so no ancestor element can intercept the event first.

---

## 📁 File Structure

```
ace-unlocker/
├── ace-unlocker.user.js   # The Tampermonkey script
└── README.md              # You're here
```

---

## ⚠️ Disclaimer

This project modifies the local rendering of a webpage in your own browser only. It does not interact with any backend, submit any data, or alter anything on the server side. It is intended for use on editors you own or control, or in non-graded practice/sandbox environments.

This script is provided **"as is," for educational and learning purposes only**, with no warranty of any kind. **Use at your own risk.** The author (**@gtxPrime**) is not liable for any misuse, damages, or policy violations arising from its use. You are solely responsible for how and where you use it, and for complying with the terms of service of any website you use it on.

---

<div align="center">

Made with 🛠️ by **[@gtxPrime](https://github.com/gtxPrime)**

If this helped you, consider dropping a ⭐ on the repo!

</div>