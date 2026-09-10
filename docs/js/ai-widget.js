// MaxKB 文档站 —— AI 问答浮窗（客服小助手）注入器
// ★ 后续需要修改浮窗链接，只改下面这一行即可：
const AI_WIDGET_URL = "https://maxkb.fit2cloud.com/api/application/embed?protocol=https&host=maxkb.fit2cloud.com&token=ba685e8f64e36ba9";
(function () {
  'use strict';
  var s = document.createElement('script');
  s.src = AI_WIDGET_URL;
  s.async = true;
  s.defer = false;
  document.body.appendChild(s);
})();
