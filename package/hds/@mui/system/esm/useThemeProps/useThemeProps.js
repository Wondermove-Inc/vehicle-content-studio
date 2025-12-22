"use client";
import e from"./getThemeProps.js";import m from"../useTheme.js";function t({props:t,name:r,defaultTheme:o,themeId:p}){let s=m(o);p&&(s=s[p]||s);return e({theme:s,name:r,props:t})}export{t as default};
