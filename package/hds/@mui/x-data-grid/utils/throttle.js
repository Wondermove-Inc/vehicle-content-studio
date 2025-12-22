function o(o,t=166){let e,i;const n=()=>{e=void 0,o(...i)};function c(...o){i=o,void 0===e&&(e=setTimeout(n,t))}return c.clear=()=>{clearTimeout(e),e=void 0},c}export{o as throttle};
