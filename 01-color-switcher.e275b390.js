const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r=0;function d(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}e.setAttribute("disabled",!0),t.addEventListener("click",(function(){e.removeAttribute("disabled"),t.setAttribute("disabled",!0),r=setInterval(d,1e3)})),e.addEventListener("click",(function(){if(0===r)return;t.removeAttribute("disabled"),clearInterval(r),e.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.e275b390.js.map