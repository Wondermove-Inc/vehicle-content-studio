import{toDate as t}from"./toDate.js";function o(o,r){const e=+t(o),[n,s]=[+t(r.start),+t(r.end)].sort(((t,o)=>t-o));return e>=n&&e<=s}export{o as default,o as isWithinInterval};
