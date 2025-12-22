import{toDate as t}from"./toDate.js";function o(o){const e=t(o),n=e.getMonth(),r=n-n%3;return e.setMonth(r,1),e.setHours(0,0,0,0),e}export{o as default,o as startOfQuarter};
