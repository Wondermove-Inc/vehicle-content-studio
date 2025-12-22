import{getWeek as t}from"./getWeek.js";import{toDate as e}from"./toDate.js";function o(o,r,a){const s=e(o),f=t(s,a)-r;return s.setDate(s.getDate()-7*f),s}export{o as default,o as setWeek};
