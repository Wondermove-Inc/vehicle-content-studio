"use client";
import e from"../../utils/usePreviousProps/usePreviousProps.js";function o(o){const{badgeContent:t,invisible:n=!1,max:s=99,showZero:i=!1}=o,r=e({badgeContent:t,max:s});let a=n;!1!==n||0!==t||i||(a=!0);const{badgeContent:u,max:b=s}=a?r:o;return{badgeContent:u,invisible:a,max:b,displayValue:u&&Number(u)>b?`${b}+`:u}}export{o as useBadge};
