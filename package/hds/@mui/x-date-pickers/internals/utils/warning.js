const r=(r,n="warning")=>{let o=!1;const e=Array.isArray(r)?r.join("\n"):r;return()=>{o||(o=!0,"error"===n?console.error(e):console.warn(e))}};export{r as buildWarning};
