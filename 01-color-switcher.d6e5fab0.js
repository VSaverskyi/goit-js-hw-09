!function(){var t={bodyEl:document.querySelector("body"),startBtnEl:document.querySelector("button[data-start]"),stopBtnEl:document.querySelector("button[data-stop]")},n={intervalId:null,start:function(){this.intervalId=setInterval(o,1e3),t.startBtnEl.disabled=!0,t.stopBtnEl.disabled=!1},stop:function(){clearInterval(this.intervalId),t.startBtnEl.disabled=!1,t.stopBtnEl.disabled=!0}};function o(){t.bodyEl.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.startBtnEl.addEventListener("click",(function(){n.start()})),t.stopBtnEl.addEventListener("click",(function(){n.stop()}))}();
//# sourceMappingURL=01-color-switcher.d6e5fab0.js.map
