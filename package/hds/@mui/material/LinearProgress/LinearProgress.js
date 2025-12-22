"use client";
import r from"../../../@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js";import e from"../../../@babel/runtime/helpers/esm/extends.js";import*as t from"react";import o from"../../../prop-types/index.js";import{clsx as a}from"../../../clsx/dist/clsx.js";import{lighten as n,darken as i}from"../../system/colorManipulator.js";import{useRtl as s}from"../../system/esm/RtlProvider/index.js";import l from"../styles/styled.js";import f from"../styles/useThemeProps.js";import{getLinearProgressUtilityClass as m}from"./linearProgressClasses.js";import{jsxs as u,jsx as c}from"react/jsx-runtime";import p from"../../utils/capitalize/capitalize.js";import d from"../../utils/composeClasses/composeClasses.js";import{keyframes as b,css as v}from"@emotion/react";const h=["className","color","value","valueBuffer","variant"];let g,y,w,C,x,j,$=r=>r;const k=b(g||(g=$`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),S=b(y||(y=$`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),N=b(w||(w=$`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),P=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?n(r.palette[e].main,.62):i(r.palette[e].main,.5),B=l("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[`color${p(t.color)}`],e[t.variant]]}})((({ownerState:r,theme:t})=>e({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:P(t,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"}))),O=l("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.dashed,e[`dashedColor${p(t.color)}`]]}})((({ownerState:r,theme:t})=>{const o=P(t,r.color);return e({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${o} 0%, ${o} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),v(C||(C=$`
    animation: ${0} 3s infinite linear;
  `),N)),I=l("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${p(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})((({ownerState:r,theme:t})=>e({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(t.vars||t).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"})),(({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&v(x||(x=$`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),k))),L=l("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${p(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})((({ownerState:r,theme:t})=>e({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(t.vars||t).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:P(t,r.color),transition:"transform .4s linear"})),(({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&v(j||(j=$`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),S))),M=t.forwardRef((function(t,o){const n=f({props:t,name:"MuiLinearProgress"}),{className:i,color:l="primary",value:b,valueBuffer:v,variant:g="indeterminate"}=n,y=r(n,h),w=e({},n,{color:l,variant:g}),C=(r=>{const{classes:e,variant:t,color:o}=r,a={root:["root",`color${p(o)}`,t],dashed:["dashed",`dashedColor${p(o)}`],bar1:["bar",`barColor${p(o)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${p(o)}`,"buffer"===t&&`color${p(o)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return d(a,m,e)})(w),x=s(),j={},$={bar1:{},bar2:{}};if("determinate"===g||"buffer"===g)if(void 0!==b){j["aria-valuenow"]=Math.round(b),j["aria-valuemin"]=0,j["aria-valuemax"]=100;let r=b-100;x&&(r=-r),$.bar1.transform=`translateX(${r}%)`}else"production"!==process.env.NODE_ENV&&console.error("MUI: You need to provide a value prop when using the determinate or buffer variant of LinearProgress .");if("buffer"===g)if(void 0!==v){let r=(v||0)-100;x&&(r=-r),$.bar2.transform=`translateX(${r}%)`}else"production"!==process.env.NODE_ENV&&console.error("MUI: You need to provide a valueBuffer prop when using the buffer variant of LinearProgress.");return u(B,e({className:a(C.root,i),ownerState:w,role:"progressbar"},j,{ref:o},y,{children:["buffer"===g?c(O,{className:C.dashed,ownerState:w}):null,c(I,{className:C.bar1,ownerState:w,style:$.bar1}),"determinate"===g?null:c(L,{className:C.bar2,ownerState:w,style:$.bar2})]}))}));"production"!==process.env.NODE_ENV&&(M.propTypes={classes:o.object,className:o.string,color:o.oneOfType([o.oneOf(["inherit","primary","secondary"]),o.string]),sx:o.oneOfType([o.arrayOf(o.oneOfType([o.func,o.object,o.bool])),o.func,o.object]),value:o.number,valueBuffer:o.number,variant:o.oneOf(["buffer","determinate","indeterminate","query"])});var q=M;export{q as default};
