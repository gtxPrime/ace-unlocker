<div align="center">

# 🔓 Ace Editor Unlocker

### *Restore your locked Ace code editor: locally, safely, instantly.*

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://www.tampermonkey.net/)
[![Violentmonkey](https://img.shields.io/badge/Violentmonkey-008080?style=for-the-badge&logo=greasemonkey&logoColor=white)](https://violentmonkey.github.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.1.0-blue?style=for-the-badge)](#)
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
| 🔍 **Auto-detection** | Automatically finds the Ace editor instance, even in single-page apps (SPAs) where it loads dynamically |
| 🔓 **Read-only unlock** | Invokes Ace's native `setReadOnly(false)` API and removes DOM constraints so the changes stick |
| 📋 **Universal Paste Unblocker** | Bypasses event listener blocks on copy/paste/cut/contextmenu/selectstart/dragstart/drop globally |
| 🔐 **Prototype Interception** | Intercepts `addEventListener` registrations and inline handlers before page scripts run (`document-start`) |
| 🎨 **CSS user-select Reset** | Undoes any styling tricks (like `user-select: none` or pointer-events block) to restore selection |
| 🔁 **Persistent Polling** | Re-applies the editability fix every 2000ms in case host scripts try to re-lock the editor |
| 🧼 **Zero network calls** | Runs 100% locally; does not touch your account, session, or make any external calls |

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

The userscript consists of two independent parts running at `@run-at document-start` to neutralize blocking mechanisms before they can hook:

1. **Universal Paste Unblocker**:
   - Overrides `EventTarget.prototype.addEventListener` to block page scripts from registering handlers for `paste`, `copy`, `cut`, `contextmenu`, `keydown`, etc.
   - Restructures prototype setters for inline handlers (`onpaste`, etc.) to make them inert.
   - Cleans inline event attributes in elements dynamically using a `MutationObserver` and handles loaded `<iframe>` tags.
   - Injects a global CSS sheet to force `user-select: text !important` on all elements.
   - Uses capture-phase document listeners to intercept and prevent site cancellation of native paste/copy operations.

2. **Ace Editor Unlocker**:
   - Locates active Ace editor instances by checking wrapper class elements (`.ace_editor`), associated DOM property registries, or the global `window.ace` registry.
   - Removes `readonly` and `aria-disabled` attributes from the hidden textarea (`.ace_text-input`).
   - Periodically polls to keep read-only mode disabled if page scripts attempt to re-lock it.

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