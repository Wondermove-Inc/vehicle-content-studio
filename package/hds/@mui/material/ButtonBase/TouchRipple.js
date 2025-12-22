"use client";
import e from"../../../@babel/runtime/helpers/esm/extends.js";import t from"../../../@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js";import*as n from"react";import i from"../../../prop-types/index.js";import{clsx as r}from"../../../clsx/dist/clsx.js";import s from"../styles/styled.js";import o from"../styles/useThemeProps.js";import l from"./Ripple.js";import a from"./touchRippleClasses.js";import{jsx as p}from"react/jsx-runtime";import u from"../../utils/useTimeout/useTimeout.js";import c from"../../../react-transition-group/esm/TransitionGroup.js";import{keyframes as m}from"@emotion/react";const h=["center","classes","className"];let d,f,b,g,y=e=>e;const v=80,R=m(d||(d="\n  0% {\n    transform: scale(0);\n    opacity: 0.1;\n  }\n\n  100% {\n    transform: scale(1);\n    opacity: 0.3;\n  }\n")),$=m(f||(f="\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n")),j=m(b||(b="\n  0% {\n    transform: scale(1);\n  }\n\n  50% {\n    transform: scale(0.92);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n")),M=s("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),x=s(l,{name:"MuiTouchRipple",slot:"Ripple"})(g||(g=y`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),a.rippleVisible,R,550,(({theme:e})=>e.transitions.easing.easeInOut),a.ripplePulsate,(({theme:e})=>e.transitions.duration.shorter),a.child,a.childLeaving,$,550,(({theme:e})=>e.transitions.easing.easeInOut),a.childPulsate,j,(({theme:e})=>e.transitions.easing.easeInOut)),P=n.forwardRef((function(i,s){const l=o({props:i,name:"MuiTouchRipple"}),{center:m=!1,classes:d={},className:f}=l,b=t(l,h),[g,y]=n.useState([]),v=n.useRef(0),R=n.useRef(null);n.useEffect((()=>{R.current&&(R.current(),R.current=null)}),[g]);const $=n.useRef(!1),j=u(),P=n.useRef(null),T=n.useRef(null),k=n.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:i,rippleSize:s,cb:o}=e;y((e=>[...e,p(x,{classes:{ripple:r(d.ripple,a.ripple),rippleVisible:r(d.rippleVisible,a.rippleVisible),ripplePulsate:r(d.ripplePulsate,a.ripplePulsate),child:r(d.child,a.child),childLeaving:r(d.childLeaving,a.childLeaving),childPulsate:r(d.childPulsate,a.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:i,rippleSize:s},v.current)])),v.current+=1,R.current=o}),[d]),w=n.useCallback(((e={},t={},n=(()=>{}))=>{const{pulsate:i=!1,center:r=m||t.pulsate,fakeElement:s=!1}=t;if("mousedown"===(null==e?void 0:e.type)&&$.current)return void($.current=!1);"touchstart"===(null==e?void 0:e.type)&&($.current=!0);const o=s?null:T.current,l=o?o.getBoundingClientRect():{width:0,height:0,left:0,top:0};let a,p,u;if(r||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)a=Math.round(l.width/2),p=Math.round(l.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;a=Math.round(t-l.left),p=Math.round(n-l.top)}if(r)u=Math.sqrt((2*l.width**2+l.height**2)/3),u%2==0&&(u+=1);else{const e=2*Math.max(Math.abs((o?o.clientWidth:0)-a),a)+2,t=2*Math.max(Math.abs((o?o.clientHeight:0)-p),p)+2;u=Math.sqrt(e**2+t**2)}null!=e&&e.touches?null===P.current&&(P.current=()=>{k({pulsate:i,rippleX:a,rippleY:p,rippleSize:u,cb:n})},j.start(80,(()=>{P.current&&(P.current(),P.current=null)}))):k({pulsate:i,rippleX:a,rippleY:p,rippleSize:u,cb:n})}),[m,k,j]),C=n.useCallback((()=>{w({},{pulsate:!0})}),[w]),X=n.useCallback(((e,t)=>{if(j.clear(),"touchend"===(null==e?void 0:e.type)&&P.current)return P.current(),P.current=null,void j.start(0,(()=>{X(e,t)}));P.current=null,y((e=>e.length>0?e.slice(1):e)),R.current=t}),[j]);return n.useImperativeHandle(s,(()=>({pulsate:C,start:w,stop:X})),[C,w,X]),p(M,e({className:r(a.root,d.root,f),ref:T},b,{children:p(c,{component:null,exit:!0,children:g})}))}));"production"!==process.env.NODE_ENV&&(P.propTypes={center:i.bool,classes:i.object,className:i.string});var T=P;export{v as DELAY_RIPPLE,x as TouchRippleRipple,M as TouchRippleRoot,T as default};
