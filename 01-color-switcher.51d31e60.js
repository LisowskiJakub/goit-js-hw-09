const e=document.querySelector("body"),t=document.querySelector("button[data-start]"),d=document.querySelector("button[data-stop]"),a=()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`};let l=null;t.disabled=!1,d.disabled=!0,t.addEventListener("click",(()=>{l=setInterval(a,1e3),t.disabled=!0,d.disabled=!1})),d.addEventListener("click",(()=>{clearInterval(l),t.disabled=!1,d.disabled=!0}));
//# sourceMappingURL=01-color-switcher.51d31e60.js.map
