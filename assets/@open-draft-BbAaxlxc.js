var P=Object.defineProperty;var E=e=>{throw TypeError(e)};var D=(e,r,t)=>r in e?P(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var c=(e,r,t)=>D(e,typeof r!="symbol"?r+"":r,t),d=(e,r,t)=>r.has(e)||E("Cannot "+t);var l=(e,r,t)=>(d(e,r,"read from private field"),t?t.call(e):r.get(e)),g=(e,r,t)=>r.has(e)?E("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t),b=(e,r,t,n)=>(d(e,r,"write to private field"),n?n.call(e,t):r.set(e,t),t),f=(e,r,t)=>(d(e,r,"access private method"),t);import{i as G}from"./is-node-process-BZ-2HBMI.js";import{f as v}from"./outvariant-BBS2yBlX.js";var Q=async e=>{try{return{error:null,data:await e().catch(t=>{throw t})}}catch(r){return{error:r,data:null}}},O={},R=Object.defineProperty,S=(e,r)=>{for(var t in r)R(e,t,{get:r[t],enumerable:!0})},x={};S(x,{blue:()=>M,gray:()=>y,green:()=>W,red:()=>V,yellow:()=>N});function N(e){return`\x1B[33m${e}\x1B[0m`}function M(e){return`\x1B[34m${e}\x1B[0m`}function y(e){return`\x1B[90m${e}\x1B[0m`}function V(e){return`\x1B[31m${e}\x1B[0m`}function W(e){return`\x1B[32m${e}\x1B[0m`}var p=G(),q=class{constructor(e){c(this,"prefix");this.name=e,this.prefix=`[${this.name}]`;const r=$("DEBUG"),t=$("LOG_LEVEL");r==="1"||r==="true"||typeof r<"u"&&this.name.startsWith(r)?(this.debug=u(t,"debug")?s:this.debug,this.info=u(t,"info")?s:this.info,this.success=u(t,"success")?s:this.success,this.warning=u(t,"warning")?s:this.warning,this.error=u(t,"error")?s:this.error):(this.info=s,this.success=s,this.warning=s,this.error=s,this.only=s)}extend(e){return new q(`${this.name}:${e}`)}debug(e,...r){this.logEntry({level:"debug",message:y(e),positionals:r,prefix:this.prefix,colors:{prefix:"gray"}})}info(e,...r){this.logEntry({level:"info",message:e,positionals:r,prefix:this.prefix,colors:{prefix:"blue"}});const t=new z;return(n,...i)=>{t.measure(),this.logEntry({level:"info",message:`${n} ${y(`${t.deltaTime}ms`)}`,positionals:i,prefix:this.prefix,colors:{prefix:"blue"}})}}success(e,...r){this.logEntry({level:"info",message:e,positionals:r,prefix:`✔ ${this.prefix}`,colors:{timestamp:"green",prefix:"green"}})}warning(e,...r){this.logEntry({level:"warning",message:e,positionals:r,prefix:`⚠ ${this.prefix}`,colors:{timestamp:"yellow",prefix:"yellow"}})}error(e,...r){this.logEntry({level:"error",message:e,positionals:r,prefix:`✖ ${this.prefix}`,colors:{timestamp:"red",prefix:"red"}})}only(e){e()}createEntry(e,r){return{timestamp:new Date,level:e,message:r}}logEntry(e){const{level:r,message:t,prefix:n,colors:i,positionals:m=[]}=e,B=this.createEntry(r,t),L=(i==null?void 0:i.timestamp)||"gray",_=(i==null?void 0:i.prefix)||"gray",w={timestamp:x[L],prefix:x[_]};this.getWriter(r)([w.timestamp(this.formatTimestamp(B.timestamp))].concat(n!=null?w.prefix(n):[]).concat(j(t)).join(" "),...m.map(j))}formatTimestamp(e){return`${e.toLocaleTimeString("en-GB")}:${e.getMilliseconds()}`}getWriter(e){switch(e){case"debug":case"success":case"info":return A;case"warning":return F;case"error":return I}}},z=class{constructor(){c(this,"startTime");c(this,"endTime");c(this,"deltaTime");this.startTime=performance.now()}measure(){this.endTime=performance.now();const e=this.endTime-this.startTime;this.deltaTime=e.toFixed(2)}},s=()=>{};function A(e,...r){if(p){process.stdout.write(v(e,...r)+`
`);return}console.log(e,...r)}function F(e,...r){if(p){process.stderr.write(v(e,...r)+`
`);return}console.warn(e,...r)}function I(e,...r){if(p){process.stderr.write(v(e,...r)+`
`);return}console.error(e,...r)}function $(e){var r;return p?O[e]:(r=globalThis[e])==null?void 0:r.toString()}function u(e,r){return e!==void 0&&e!==r}function j(e){return typeof e>"u"?"undefined":e===null?"null":typeof e=="string"?e:typeof e=="object"?JSON.stringify(e):e.toString()}function k(){const e=(r,t)=>{e.state="pending",e.resolve=n=>{if(e.state!=="pending")return;e.result=n;const i=m=>(e.state="fulfilled",m);return r(n instanceof Promise?n:Promise.resolve(n).then(i))},e.reject=n=>{if(e.state==="pending")return queueMicrotask(()=>{e.state="rejected"}),t(e.rejectionReason=n)}};return e}var o,a,h,T,X=(T=class extends Promise{constructor(r=null){const t=k();super((n,i)=>{t(n,i),r==null||r(t.resolve,t.reject)});g(this,a);g(this,o);c(this,"resolve");c(this,"reject");b(this,o,t),this.resolve=l(this,o).resolve,this.reject=l(this,o).reject}get state(){return l(this,o).state}get rejectionReason(){return l(this,o).rejectionReason}then(r,t){return f(this,a,h).call(this,super.then(r,t))}catch(r){return f(this,a,h).call(this,super.catch(r))}finally(r){return f(this,a,h).call(this,super.finally(r))}},o=new WeakMap,a=new WeakSet,h=function(r){return Object.defineProperties(r,{resolve:{configurable:!0,value:this.resolve},reject:{configurable:!0,value:this.reject}})},T);export{X as D,q as L,Q as u};
