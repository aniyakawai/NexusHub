// MaxKB docs bilingual toggle. Injected synchronously into every page.
// Renders a header ICON button placed to the LEFT of the light/dark theme toggle,
// and switches zh <-> en (same section, preserving #anchor). Per product choice,
// first-time visitors are sent to the English version.
(function () {
  'use strict';
  if (window.__maxkbLangLoaded) return;
  window.__maxkbLangLoaded = true;

  var script = document.currentScript;
  if (!script) return;
  var srcPath;
  try { srcPath = new URL(script.src, location.href).pathname; } catch (e) { return; }

  var isEn = /\/en\/lang-toggle\.js$/.test(srcPath) || /\/en\/[^/]*lang-toggle\.js$/.test(srcPath);
  var scriptDir = srcPath.replace(/\/lang-toggle\.js$/, '') + '/';
  var treeRoot, otherRoot;
  if (isEn) {
    treeRoot = scriptDir;
    otherRoot = scriptDir.replace(/\/en\/$/, '/');
  } else {
    treeRoot = scriptDir;
    otherRoot = scriptDir + 'en/';
  }

  var pathname = String(location.pathname).replace(/\\/g, '/');
  var rel = pathname.indexOf(treeRoot) === 0 ? pathname.slice(treeRoot.length) : '';
  if (!rel) rel = 'index.html';
  if (rel.charAt(rel.length - 1) === '/') rel += 'index.html';
  var target = otherRoot + rel + location.search + location.hash;

  function setPref(v) {
    try { localStorage.setItem('maxkb_lang_pref', v); } catch (e) { /* ignore */ }
  }
  function getPref() {
    try { return localStorage.getItem('maxkb_lang_pref'); } catch (e) { return null; }
  }

  var GLOBE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.08 16zm2.95-8H5.08a7.99 7.99 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>';

  function addHeaderIcon() {
    var themeToggle = document.querySelector('[data-md-component="palette"]') ||
                      document.querySelector('label[for^="__palette_"]');
    var holder = themeToggle && themeToggle.parentNode;
    var icon = document.createElement('label');
    icon.className = 'md-header__button md-icon';
    icon.id = 'maxkb-lang-icon';
    icon.setAttribute('title', isEn ? 'Switch to Chinese (中文)' : 'Switch to English');
    icon.setAttribute('aria-label', isEn ? 'Switch to Chinese' : 'Switch to English');
    icon.setAttribute('role', 'button');
    icon.tabIndex = 0;
    icon.innerHTML = GLOBE;
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      setPref(isEn ? 'zh' : 'en');
      location.href = target;
    });
    icon.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPref(isEn ? 'zh' : 'en'); location.href = target; }
    });
    if (holder) {
      holder.insertBefore(icon, themeToggle);
    } else {
      // fallback: floating small icon bottom-right
      icon.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:10000;cursor:pointer;padding:6px;border-radius:8px;background:#fff;box-shadow:0 2px 8px rgba(30,40,60,.18);';
      document.body.appendChild(icon);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHeaderIcon);
  } else {
    addHeaderIcon();
  }

  // English-first: a visitor who has never chosen is sent to the English page
  // (only once; the stored preference then governs every later visit).
  if (getPref() === null && !isEn) {
    setPref('en');
    location.replace(target);
  }
})();
