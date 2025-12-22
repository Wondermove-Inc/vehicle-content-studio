"use client";
import*as e from"react";import r from"../useEnhancedEffect/useEnhancedEffect.js";function t(t){const n=e.useRef(t);return r((()=>{n.current=t})),e.useRef(((...e)=>(0,n.current)(...e))).current}export{t as default};
