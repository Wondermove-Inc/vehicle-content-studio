import{isDate as t}from"./isDate.js";import{toDate as r}from"./toDate.js";function e(e){if(!t(e)&&"number"!=typeof e)return!1;const o=r(e);return!isNaN(Number(o))}export{e as default,e as isValid};
