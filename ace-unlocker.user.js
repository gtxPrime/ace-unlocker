// ==UserScript==
// @name         Ace Editor Unlocker + Paste Enabler
// @namespace    https://github.com/gtxPrime
// @version      1.1.0
// @description  Restores a locked/read-only Ace editor and re-enables pasting, locally in your own browser. No server calls, no submission.
// @author       gtxPrime
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @all-frames   true
// ==/UserScript==

(function () {
  'use strict';

  const BLOCKED_EVENTS = [
    'paste', 'copy', 'cut',
    'beforepaste', 'beforecopy', 'beforecut',
    'contextmenu', 'selectstart', 'dragstart', 'drop', 'keydown'
  ];

  const RealEventTarget = window.EventTarget.prototype;
  const realAdd = RealEventTarget.addEventListener;
  const realRemove = RealEventTarget.removeEventListener;

  RealEventTarget.addEventListener = function (type, listener, options) {
    if (typeof type === 'string' && BLOCKED_EVENTS.includes(type.toLowerCase())) {
      return;
    }
    return realAdd.call(this, type, listener, options);
  };

  RealEventTarget.removeEventListener = function (type, listener, options) {
    return realRemove.call(this, type, listener, options);
  };

  const PROTOS = [window.HTMLElement, window.HTMLDocument, window.Window, window.HTMLInputElement, window.HTMLTextAreaElement];
  const HANDLER_PROPS = ['onpaste', 'oncopy', 'oncut', 'onbeforepaste', 'onbeforecopy', 'onbeforecut', 'oncontextmenu', 'onselectstart', 'ondragstart', 'ondrop'];

  for (const proto of PROTOS) {
    if (!proto) continue;
    for (const prop of HANDLER_PROPS) {
      try {
        Object.defineProperty(proto.prototype, prop, {
          configurable: true,
          get() { return null; },
          set(_v) {}
        });
      } catch (e) {}
    }
  }

  function stripInlineAttrs(root) {
    if (!root || typeof root.querySelectorAll !== 'function') return;
    const attrs = ['onpaste', 'oncopy', 'oncut', 'onbeforepaste', 'onbeforecopy', 'onbeforecut', 'oncontextmenu', 'onselectstart', 'ondragstart', 'ondrop'];
    const els = root.querySelectorAll('[onpaste],[oncopy],[oncut],[onbeforepaste],[onbeforecopy],[onbeforecut],[oncontextmenu],[onselectstart],[ondragstart],[ondrop]');
    els.forEach(el => attrs.forEach(a => el.removeAttribute(a)));
  }

  function installCaptureShield(doc) {
    ['paste', 'copy', 'cut', 'contextmenu', 'selectstart', 'dragstart', 'drop'].forEach(evt => {
      realAdd.call(doc, evt, function (e) {
        e.stopImmediatePropagation();
      }, true);
    });

    realAdd.call(doc, 'keydown', function (e) {
      const key = (e.key || '').toLowerCase();
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && ['v', 'c', 'x'].includes(key)) {
        e.stopImmediatePropagation();
      }
    }, true);
  }

  function injectCSSFix() {
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function boot() {
    stripInlineAttrs(document);
    injectCSSFix();
    installCaptureShield(document);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && HANDLER_PROPS.map(p => p.slice(2)).includes(m.attributeName)) {
          m.target.removeAttribute(m.attributeName);
        }
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(n => {
            if (n.nodeType === 1) stripInlineAttrs(n);
          });
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: HANDLER_PROPS.map(p => p.slice(2))
    });

    window.addEventListener('focusin', () => installCaptureShield(document), true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  new MutationObserver((mutations) => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.tagName === 'IFRAME') {
          node.addEventListener('load', () => {
            try {
              const doc = node.contentDocument;
              if (doc) {
                stripInlineAttrs(doc);
                installCaptureShield(doc);
              }
            } catch (e) {}
          });
        }
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

})();

(function () {
  'use strict';

  function findAceInstance() {
    const wrapperEl = document.querySelector('.editor-wrapper .ace_editor, .ace_editor');
    if (wrapperEl && wrapperEl.env && wrapperEl.env.editor) {
      return wrapperEl.env.editor;
    }
    if (wrapperEl && wrapperEl.aceEditor) {
      return wrapperEl.aceEditor;
    }
    if (window.ace && wrapperEl && wrapperEl.id) {
      try {
        return window.ace.edit(wrapperEl.id);
      } catch (e) {}
    }
    return null;
  }

  function unlock() {
    const editor = findAceInstance();
    if (!editor) {
      return false;
    }

    editor.setReadOnly(false);
    editor.textInput?.getElement()?.removeAttribute('readonly');
    editor.textInput?.getElement()?.removeAttribute('aria-disabled');

    document.querySelectorAll('.ace_text-input').forEach(ta => {
      ta.readOnly = false;
      ta.removeAttribute('aria-disabled');
    });

    return true;
  }

  const interval = setInterval(() => {
    if (unlock()) clearInterval(interval);
  }, 1000);

  setInterval(() => {
    const editor = findAceInstance();
    if (editor && editor.getReadOnly()) {
      editor.setReadOnly(false);
    }
  }, 2000);
})();