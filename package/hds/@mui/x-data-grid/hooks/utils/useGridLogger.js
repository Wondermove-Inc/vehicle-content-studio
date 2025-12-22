import*as r from"react";function t(t,e){const n=r.useRef(null);if(n.current)return n.current;const u=t.current.getLogger(e);return n.current=u,u}export{t as useGridLogger};
