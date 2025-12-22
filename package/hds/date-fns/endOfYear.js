import{toDate as t}from"./toDate.js";function e(e){const r=t(e),o=r.getFullYear();return r.setFullYear(o+1,0,0),r.setHours(23,59,59,999),r}export{e as default,e as endOfYear};
