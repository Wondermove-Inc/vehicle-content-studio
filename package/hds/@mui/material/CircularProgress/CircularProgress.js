"use client";
import e from"../../../@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js";import r from"../../../@babel/runtime/helpers/esm/extends.js";import*as t from"react";import s from"../../../prop-types/index.js";import{clsx as o}from"../../../clsx/dist/clsx.js";import a from"../styles/useThemeProps.js";import i from"../styles/styled.js";import{getCircularProgressUtilityClass as n}from"./circularProgressClasses.js";import{jsx as l}from"react/jsx-runtime";import c from"../../utils/capitalize/capitalize.js";import m from"../../utils/chainPropTypes/chainPropTypes.js";import p from"../../utils/composeClasses/composeClasses.js";import{keyframes as d,css as h}from"@emotion/react";const f=["className","color","disableShrink","size","style","thickness","value","variant"];let u,v,k,b,y=e=>e;const x=44,S=d(u||(u=y`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),g=d(v||(v=y`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),w=i("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[t.variant],r[`color${c(t.color)}`]]}})((({ownerState:e,theme:t})=>r({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&h(k||(k=y`
      animation: ${0} 1.4s linear infinite;
    `),S))),j=i("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),P=i("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.circle,r[`circle${c(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})((({ownerState:e,theme:t})=>r({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&h(b||(b=y`
      animation: ${0} 1.4s ease-in-out infinite;
    `),g))),C=t.forwardRef((function(t,s){const i=a({props:t,name:"MuiCircularProgress"}),{className:m,color:d="primary",disableShrink:h=!1,size:u=40,style:v,thickness:k=3.6,value:b=0,variant:y="indeterminate"}=i,S=e(i,f),g=r({},i,{color:d,disableShrink:h,size:u,thickness:k,value:b,variant:y}),C=(e=>{const{classes:r,variant:t,color:s,disableShrink:o}=e,a={root:["root",t,`color${c(s)}`],svg:["svg"],circle:["circle",`circle${c(t)}`,o&&"circleDisableShrink"]};return p(a,n,r)})(g),T={},N={},O={};if("determinate"===y){const e=2*Math.PI*((x-k)/2);T.strokeDasharray=e.toFixed(3),O["aria-valuenow"]=Math.round(b),T.strokeDashoffset=`${((100-b)/100*e).toFixed(3)}px`,N.transform="rotate(-90deg)"}return l(w,r({className:o(C.root,m),style:r({width:u,height:u},N,v),ownerState:g,ref:s,role:"progressbar"},O,S,{children:l(j,{className:C.svg,ownerState:g,viewBox:"22 22 44 44",children:l(P,{className:C.circle,style:T,ownerState:g,cx:x,cy:x,r:(x-k)/2,fill:"none",strokeWidth:k})})}))}));"production"!==process.env.NODE_ENV&&(C.propTypes={classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","primary","secondary","error","info","success","warning"]),s.string]),disableShrink:m(s.bool,(e=>e.disableShrink&&e.variant&&"indeterminate"!==e.variant?new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect."):null)),size:s.oneOfType([s.number,s.string]),style:s.object,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),thickness:s.number,value:s.number,variant:s.oneOf(["determinate","indeterminate"])});var T=C;export{T as default};
