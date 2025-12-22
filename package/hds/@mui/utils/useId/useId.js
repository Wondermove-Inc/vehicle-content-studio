"use client";
import*as t from"react";let n=0;const e=t["useId".toString()];function u(u){if(void 0!==e){const t=e();return null!=u?u:t}return function(e){const[u,r]=t.useState(e),o=e||u;return t.useEffect((()=>{null==u&&(n+=1,r(`mui-${n}`))}),[u]),o}(u)}export{u as default};
