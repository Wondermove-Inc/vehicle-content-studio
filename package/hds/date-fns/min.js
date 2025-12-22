import{toDate as t}from"./toDate.js";function a(a){let e;return a.forEach((a=>{const o=t(a);(!e||e>o||isNaN(+o))&&(e=o)})),e||new Date(NaN)}export{a as default,a as min};
