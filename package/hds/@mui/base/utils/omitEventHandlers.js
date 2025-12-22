function t(t){if(void 0===t)return{};const n={};return Object.keys(t).filter((n=>!(n.match(/^on[A-Z]/)&&"function"==typeof t[n]))).forEach((o=>{n[o]=t[o]})),n}export{t as omitEventHandlers};
