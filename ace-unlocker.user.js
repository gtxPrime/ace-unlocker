// ==UserScript==
// @name         Ace Editor Unlocker + Paste Enabler
// @namespace    https://github.com/gtxPrime
// @version      1.0.0
// @description  Restores a locked/read-only Ace editor and re-enables pasting, locally in your own browser. No server calls, no submission.
// @author       gtxPrime
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/*
 * Ace Editor Unlocker + Paste Enabler
 * Credit: @gtxPrime
 * https://github.com/gtxPrime
 *
 * Restores editing/pasting on a locally-rendered Ace editor instance
 * that has been put into read-only / paste-blocked mode by the host page.
 * Runs entirely client-side; does not modify or contact any server.
 */

(function () {
    'use strict';

    let globalGuardInstalled = false;

    function findAceInstance() {
        const wrapperEl = document.querySelector('.editor-wrapper .ace_editor, .ace_editor');
        if (wrapperEl && wrapperEl.env && wrapperEl.env.editor) return wrapperEl.env.editor;
        if (wrapperEl && wrapperEl.aceEditor) return wrapperEl.aceEditor;
        if (window.ace && wrapperEl && wrapperEl.id) {
            try { return window.ace.edit(wrapperEl.id); } catch (e) { /* noop */ }
        }
        return null;
    }

    function installGlobalPasteGuard() {
        if (globalGuardInstalled) return;
        ['paste', 'copy', 'cut'].forEach(evt => {
            document.addEventListener(evt, (e) => e.stopImmediatePropagation(), true);
        });
        globalGuardInstalled = true;
    }

    function enablePaste(editor) {
        const textarea = editor.textInput?.getElement();
        if (!textarea) return;

        const clone = textarea.cloneNode(true);
        textarea.parentNode.replaceChild(clone, textarea);

        editor.textInput.blur?.();
        editor.focus();

        clone.readOnly = false;
        clone.removeAttribute('aria-disabled');
        clone.addEventListener('paste', (e) => e.stopPropagation(), true);
    }

    function unlock() {
        const wrapper = document.querySelector('.editor-wrapper');
        if (!wrapper) return false;

        const editor = findAceInstance();
        if (!editor) return false;

        editor.setReadOnly(false);
        installGlobalPasteGuard();
        enablePaste(editor);

        document.querySelectorAll('.ace_text-input').forEach(ta => {
            ta.readOnly = false;
            ta.removeAttribute('aria-disabled');
        });

        return true;
    }

    const initInterval = setInterval(() => {
        if (unlock()) clearInterval(initInterval);
    }, 1000);

    // Re-apply in case the host page re-locks the editor later
    setInterval(() => {
        const editor = findAceInstance();
        if (editor && editor.getReadOnly()) {
            editor.setReadOnly(false);
        }
    }, 2000);
})();