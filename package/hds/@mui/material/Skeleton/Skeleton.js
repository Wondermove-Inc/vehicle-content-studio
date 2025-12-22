"use client";
import e from"../../../@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js";import t from"../../../@babel/runtime/helpers/esm/extends.js";import*as o from"react";import{clsx as r}from"../../../clsx/dist/clsx.js";import a from"../../../prop-types/index.js";import i from"../styles/styled.js";import n from"../styles/useThemeProps.js";import{getSkeletonUtilityClass as s}from"./skeletonClasses.js";import{jsx as l}from"react/jsx-runtime";import{getUnit as m,toUnitless as h}from"../styles/cssUtils.js";import{alpha as p}from"../../system/esm/colorManipulator.js";import d from"../../utils/composeClasses/composeClasses.js";import{keyframes as c,css as u}from"@emotion/react";const f=["animation","className","component","height","style","variant","width"];let g,b,y,v,w=e=>e;const j=c(g||(g=w`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),C=c(b||(b=w`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),x=i("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],!1!==o.animation&&t[o.animation],o.hasChildren&&t.withChildren,o.hasChildren&&!o.width&&t.fitContent,o.hasChildren&&!o.height&&t.heightAuto]}})((({theme:e,ownerState:o})=>{const r=m(e.shape.borderRadius)||"px",a=h(e.shape.borderRadius);return t({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:p(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===o.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${r}/${Math.round(a/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===o.variant&&{borderRadius:"50%"},"rounded"===o.variant&&{borderRadius:(e.vars||e).shape.borderRadius},o.hasChildren&&{"& > *":{visibility:"hidden"}},o.hasChildren&&!o.width&&{maxWidth:"fit-content"},o.hasChildren&&!o.height&&{height:"auto"})}),(({ownerState:e})=>"pulse"===e.animation&&u(y||(y=w`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),j)),(({ownerState:e,theme:t})=>"wave"===e.animation&&u(v||(v=w`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),C,(t.vars||t).palette.action.hover))),k=o.forwardRef((function(o,a){const i=n({props:o,name:"MuiSkeleton"}),{animation:m="pulse",className:h,component:p="span",height:c,style:u,variant:g="text",width:b}=i,y=e(i,f),v=t({},i,{animation:m,component:p,variant:g,hasChildren:Boolean(y.children)}),w=(e=>{const{classes:t,variant:o,animation:r,hasChildren:a,width:i,height:n}=e;return d({root:["root",o,r,a&&"withChildren",a&&!i&&"fitContent",a&&!n&&"heightAuto"]},s,t)})(v);return l(x,t({as:p,ref:a,className:r(w.root,h),ownerState:v},y,{style:t({width:b,height:c},u)}))}));"production"!==process.env.NODE_ENV&&(k.propTypes={animation:a.oneOf(["pulse","wave",!1]),children:a.node,classes:a.object,className:a.string,component:a.elementType,height:a.oneOfType([a.number,a.string]),style:a.object,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["circular","rectangular","rounded","text"]),a.string]),width:a.oneOfType([a.number,a.string])});var O=k;export{O as default};
