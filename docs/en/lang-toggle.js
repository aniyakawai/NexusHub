// MaxKB docs —— 英文单语言镜像。
// 顶部地球图标原本用于中英文切换，但本镜像只部署英文版，
// 点击后改为在新标签页打开官方在线中文文档，避免跳转到不存在的本地中文页（404）。
(function () {
  'use strict';
  if (window.__maxkbLangLoaded) return;
  window.__maxkbLangLoaded = true;

  var ZH_URL = 'https://maxkb.cn/docs/v2/index.html';

  var GLOBE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.08 16zm2.95-8H5.08a7.99 7.99 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>';

  function openZh(e) {
    if (e) e.preventDefault();
    window.open(ZH_URL, '_blank', 'noopener');
  }

  function addHeaderIcon() {
    var themeToggle = document.querySelector('[data-md-component="palette"]') ||
                      document.querySelector('label[for^="__palette_"]');
    var holder = themeToggle && themeToggle.parentNode;
    var icon = document.createElement('label');
    icon.className = 'md-header__button md-icon';
    icon.id = 'maxkb-lang-icon';
    icon.setAttribute('title', '中文文档');
    icon.setAttribute('aria-label', '中文文档');
    icon.setAttribute('role', 'button');
    icon.tabIndex = 0;
    icon.innerHTML = GLOBE;
    icon.addEventListener('click', openZh);
    icon.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openZh(e);
    });
    if (holder) {
      holder.insertBefore(icon, themeToggle);
    } else {
      icon.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:10000;cursor:pointer;padding:6px;border-radius:8px;background:#fff;box-shadow:0 2px 8px rgba(30,40,60,.18);';
      document.body.appendChild(icon);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHeaderIcon);
  } else {
    addHeaderIcon();
  }
})();
