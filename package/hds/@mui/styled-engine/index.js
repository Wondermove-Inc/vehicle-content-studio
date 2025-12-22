"use client";
import e from"@emotion/styled";export{ThemeContext,css,keyframes}from"@emotion/react";export{default as GlobalStyles}from"./GlobalStyles/GlobalStyles.js";export{default as StyledEngineProvider}from"./StyledEngineProvider/StyledEngineProvider.js";
/**
 * @mui/styled-engine v5.15.14
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function o(o,t){const s=e(o,t);return"production"!==process.env.NODE_ENV?(...e)=>{const t="string"==typeof o?`"${o}"`:"component";return 0===e.length?console.error([`MUI: Seems like you called \`styled(${t})()\` without a \`style\` argument.`,'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n")):e.some((e=>void 0===e))&&console.error(`MUI: the styled(${t})(...args) API requires all its args to be defined.`),s(...e)}:s}const t=(e,o)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=o(e.__emotion_styles))};export{o as default,t as internal_processStyles};
