"use client";
import*as e from"react";import"react/jsx-runtime";const t={disableDefaultClasses:!1},s=e.createContext(t);function a(t){const{disableDefaultClasses:a}=e.useContext(s);return e=>a?"":t(e)}"production"!==process.env.NODE_ENV&&(s.displayName="ClassNameConfiguratorContext");export{a as useClassNamesOverride};
