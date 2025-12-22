import{getISOWeek as t}from"./getISOWeek.js";import{toDate as e}from"./toDate.js";function o(o,r){const a=e(o),s=t(a)-r;return a.setDate(a.getDate()-7*s),a}export{o as default,o as setISOWeek};
