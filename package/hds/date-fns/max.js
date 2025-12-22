import{toDate as t}from"./toDate.js";function o(o){let e;return o.forEach((function(o){const a=t(o);(void 0===e||e<a||isNaN(Number(a)))&&(e=a)})),e||new Date(NaN)}export{o as default,o as max};
