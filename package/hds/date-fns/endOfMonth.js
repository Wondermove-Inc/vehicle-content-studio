import{toDate as t}from"./toDate.js";function e(e){const o=t(e),r=o.getMonth();return o.setFullYear(o.getFullYear(),r+1,0),o.setHours(23,59,59,999),o}export{e as default,e as endOfMonth};
