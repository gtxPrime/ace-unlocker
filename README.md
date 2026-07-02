<div align="center">

# 🔓 Ace Editor Unlocker

### *Restore your locked Ace code editor: locally, safely, instantly.*

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://www.tampermonkey.net/)
[![Violentmonkey](https://img.shields.io/badge/Violentmonkey-008080?style=for-the-badge&logo=greasemonkey&logoColor=white)](https://violentmonkey.github.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](#)
[![Maintained by](https://img.shields.io/badge/maintained%20by-%40gtxPrime-8A2BE2?style=for-the-badge)](https://github.com/gtxPrime)

<br/>

## 📥 [Click Here to Install Ace Editor Unlocker](https://raw.githubusercontent.com/gtxPrime/ace-unlocker/main/ace-unlocker.user.js)

*(Requires Tampermonkey or Violentmonkey installed first)*

</div>

> [!WARNING]
> ## ⚠️ Critical Disclaimer & Usage Warning
> This project was built strictly for **educational and learning purposes** to understand how Ace Editor's read-only state and clipboard event handling work under the hood. 
> 
> * **Client-Side Only**: This script only modifies the local rendering of a webpage in your own browser. It does **not** interact with any backend, submit any data, bypass remote validation, or alter anything server-side.
> * **Ethical Use**: Use responsibly. This tool is meant for personal sandboxes, editors you own, or practice environments. Do **NOT** use it to bypass integrity controls on live exams, assessments, interviews, or graded tasks.
> * **No Liability**: This script is provided **"as is"** with no warranty of any kind. The author (**@gtxPrime**) takes no responsibility and is not liable for any misuse, consequences, account suspensions, or violations of third-party terms of service resulting from the use of this script. **Use entirely at your own risk.**

## ✨ What is this?

A lightweight Tampermonkey/Violentmonkey userscript that fixes **locked Ace editors**; the kind you'll find embedded in coding platforms, sandboxes, and internal tools; when the page has disabled editing or pasting.

It works entirely **client-side**, in your own browser. Nothing is sent to any server, and no submit/save action is ever triggered. It simply restores your local view of the editor so you can keep reading, testing, and pasting into it.

## 🧩 Features

| Feature | Description |
|---|---|
| 🔍 **Auto-detection** | Automatically finds the Ace editor instance inside `.editor-wrapper`, even in SPA apps where it loads late |
| 🔓 **Read-only unlock** | Calls Ace's own `setReadOnly(false)` API (not just DOM attribute stripping) so the fix actually sticks |
| 📋 **Paste re-enabler** | Removes blocked `paste`/`copy`/`cut` listeners and restores native clipboard behavior |
| 🔁 **Persistent** | Re-checks every 2500ms in case the host page tries to re-lock the editor |
| 🧼 **Zero network calls** | Runs 100% locally; does not touch your account, session, or any remote endpoint |

## 📦 Installation

To use this userscript, you must first install a userscript manager browser extension:

1. **Install a Userscript Manager:**
   - **Tampermonkey:** [Download for Chrome/Brave/Edge](https://www.tampermonkey.net/) | [Download for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - **Violentmonkey:** [Download for Chrome/Brave/Edge](https://violentmonkey.github.io/get-it/) | [Download for Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)

2. **Install the Script:**
   - Click the link below to directly install the script:
     👉 **[Direct Install Link](https://raw.githubusercontent.com/gtxPrime/ace-unlocker/main/ace-unlocker.user.js)**
   - Your userscript manager will automatically open a tab prompting you to click **Install**.

## 🚀 Usage

1. Navigate to the page containing your locked Ace editor.
2. The script activates automatically once `.editor-wrapper` or `.ace_editor` is detected on the page.
3. Click into the editor; it should now be:
   - ✅ Editable
   - ✅ Paste-enabled (`Ctrl+V` / right-click → Paste)
4. If the page tries to re-lock the editor later (e.g. on a timer), the script will silently unlock it again in the background.

No configuration, no build step, no setup: just install and load the page.

## 🛠️ How it works

Most "locked" Ace editors aren't actually broken; they're intentionally set to read-only mode via Ace's internal API (`editor.setReadOnly(true)`), and paste events are blocked by a capture-phase event listener somewhere up the DOM tree.

This script:

1. Locates the live Ace editor instance (`editor.env.editor` or via `window.ace.edit()`).
2. Flips the internal read-only flag back with Ace's own API, so it doesn't get silently re-applied on the next re-render.
3. Clones the underlying `<textarea>` to strip any inline blocking listeners.
4. Installs a capture-phase guard on `paste` / `copy` / `cut` so no ancestor element can intercept the event first.

## 📁 File Structure

```
ace-unlocker/
├── ace-unlocker.user.js   # The Tampermonkey/Violentmonkey script
└── README.md              # You're here
```

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=gtxPrime/ace-unlocker&type=Date)](https://star-history.com/#gtxPrime/ace-unlocker&Date)

<div align="center">

Made with 🛠️ by **[@gtxPrime](https://github.com/gtxPrime)**

If this helped you, consider dropping a ⭐ on the repo!

</div>