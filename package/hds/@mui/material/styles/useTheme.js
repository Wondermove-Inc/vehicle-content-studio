"use client";
import*as e from"react";import r from"./defaultTheme.js";import o from"./identifier.js";import t from"../../system/esm/useTheme.js";function s(){const s=t(r);return"production"!==process.env.NODE_ENV&&e.useDebugValue(s),s[o]||s}export{s as default};
