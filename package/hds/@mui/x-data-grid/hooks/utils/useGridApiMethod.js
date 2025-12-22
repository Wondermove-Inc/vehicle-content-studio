import*as r from"react";function e(e,t,c){const n=r.useRef(!0);r.useEffect((()=>{n.current=!1,e.current.register(c,t)}),[e,c,t]),n.current&&e.current.register(c,t)}export{e as useGridApiMethod};
