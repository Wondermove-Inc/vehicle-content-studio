import{constructFrom as t}from"./constructFrom.js";import{toDate as o}from"./toDate.js";function r(r,s){const a=o(r);return isNaN(+a)?t(r,NaN):(a.setFullYear(s),a)}export{r as default,r as setYear};
