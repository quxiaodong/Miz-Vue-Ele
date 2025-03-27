function H(r){for(var n=[],e=0;e<r.length;){var i=r[e];if(i==="*"||i==="+"||i==="?"){n.push({type:"MODIFIER",index:e,value:r[e++]});continue}if(i==="\\"){n.push({type:"ESCAPED_CHAR",index:e++,value:r[e++]});continue}if(i==="{"){n.push({type:"OPEN",index:e,value:r[e++]});continue}if(i==="}"){n.push({type:"CLOSE",index:e,value:r[e++]});continue}if(i===":"){for(var f="",a=e+1;a<r.length;){var c=r.charCodeAt(a);if(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||c===95){f+=r[a++];continue}break}if(!f)throw new TypeError("Missing parameter name at ".concat(e));n.push({type:"NAME",index:e,value:f}),e=a;continue}if(i==="("){var v=1,g="",a=e+1;if(r[a]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<r.length;){if(r[a]==="\\"){g+=r[a++]+r[a++];continue}if(r[a]===")"){if(v--,v===0){a++;break}}else if(r[a]==="("&&(v++,r[a+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(a));g+=r[a++]}if(v)throw new TypeError("Unbalanced pattern at ".concat(e));if(!g)throw new TypeError("Missing pattern at ".concat(e));n.push({type:"PATTERN",index:e,value:g}),e=a;continue}n.push({type:"CHAR",index:e,value:r[e++]})}return n.push({type:"END",index:e,value:""}),n}function I(r,n){n===void 0&&(n={});for(var e=H(r),i=n.prefixes,f=i===void 0?"./":i,a=n.delimiter,c=a===void 0?"/#?":a,v=[],g=0,h=0,d="",u=function(x){if(h<e.length&&e[h].type===x)return e[h++].value},E=function(x){var o=u(x);if(o!==void 0)return o;var s=e[h],M=s.type,S=s.index;throw new TypeError("Unexpected ".concat(M," at ").concat(S,", expected ").concat(x))},l=function(){for(var x="",o;o=u("CHAR")||u("ESCAPED_CHAR");)x+=o;return x},N=function(x){for(var o=0,s=c;o<s.length;o++){var M=s[o];if(x.indexOf(M)>-1)return!0}return!1},A=function(x){var o=v[v.length-1],s=x||(o&&typeof o=="string"?o:"");if(o&&!s)throw new TypeError('Must have text between two parameters, missing text after "'.concat(o.name,'"'));return!s||N(s)?"[^".concat(y(c),"]+?"):"(?:(?!".concat(y(s),")[^").concat(y(c),"])+?")};h<e.length;){var R=u("CHAR"),p=u("NAME"),C=u("PATTERN");if(p||C){var m=R||"";f.indexOf(m)===-1&&(d+=m,m=""),d&&(v.push(d),d=""),v.push({name:p||g++,prefix:m,suffix:"",pattern:C||A(m),modifier:u("MODIFIER")||""});continue}var t=R||u("ESCAPED_CHAR");if(t){d+=t;continue}d&&(v.push(d),d="");var T=u("OPEN");if(T){var m=l(),w=u("NAME")||"",P=u("PATTERN")||"",O=l();E("CLOSE"),v.push({name:w||(P?g++:""),pattern:w&&!P?A(m):P,prefix:m,suffix:O,modifier:u("MODIFIER")||""});continue}E("END")}return v}function U(r,n){var e=[],i=b(r,e,n);return _(i,e,n)}function _(r,n,e){e===void 0&&(e={});var i=e.decode,f=i===void 0?function(a){return a}:i;return function(a){var c=r.exec(a);if(!c)return!1;for(var v=c[0],g=c.index,h=Object.create(null),d=function(E){if(c[E]===void 0)return"continue";var l=n[E-1];l.modifier==="*"||l.modifier==="+"?h[l.name]=c[E].split(l.prefix+l.suffix).map(function(N){return f(N,l)}):h[l.name]=f(c[E],l)},u=1;u<c.length;u++)d(u);return{path:v,index:g,params:h}}}function y(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function D(r){return r&&r.sensitive?"":"i"}function F(r,n){if(!n)return r;for(var e=/\((?:\?<(.*?)>)?(?!\?)/g,i=0,f=e.exec(r.source);f;)n.push({name:f[1]||i++,prefix:"",suffix:"",modifier:"",pattern:""}),f=e.exec(r.source);return r}function W(r,n,e){var i=r.map(function(f){return b(f,n,e).source});return new RegExp("(?:".concat(i.join("|"),")"),D(e))}function $(r,n,e){return L(I(r,e),n,e)}function L(r,n,e){e===void 0&&(e={});for(var i=e.strict,f=i===void 0?!1:i,a=e.start,c=a===void 0?!0:a,v=e.end,g=v===void 0?!0:v,h=e.encode,d=h===void 0?function(o){return o}:h,u=e.delimiter,E=u===void 0?"/#?":u,l=e.endsWith,N=l===void 0?"":l,A="[".concat(y(N),"]|$"),R="[".concat(y(E),"]"),p=c?"^":"",C=0,m=r;C<m.length;C++){var t=m[C];if(typeof t=="string")p+=y(d(t));else{var T=y(d(t.prefix)),w=y(d(t.suffix));if(t.pattern)if(n&&n.push(t),T||w)if(t.modifier==="+"||t.modifier==="*"){var P=t.modifier==="*"?"?":"";p+="(?:".concat(T,"((?:").concat(t.pattern,")(?:").concat(w).concat(T,"(?:").concat(t.pattern,"))*)").concat(w,")").concat(P)}else p+="(?:".concat(T,"(").concat(t.pattern,")").concat(w,")").concat(t.modifier);else{if(t.modifier==="+"||t.modifier==="*")throw new TypeError('Can not repeat "'.concat(t.name,'" without a prefix and suffix'));p+="(".concat(t.pattern,")").concat(t.modifier)}else p+="(?:".concat(T).concat(w,")").concat(t.modifier)}}if(g)f||(p+="".concat(R,"?")),p+=e.endsWith?"(?=".concat(A,")"):"$";else{var O=r[r.length-1],x=typeof O=="string"?R.indexOf(O[O.length-1])>-1:O===void 0;f||(p+="(?:".concat(R,"(?=").concat(A,"))?")),x||(p+="(?=".concat(R,"|").concat(A,")"))}return new RegExp(p,D(e))}function b(r,n,e){return r instanceof RegExp?F(r,n):Array.isArray(r)?W(r,n,e):$(r,n,e)}export{U as m};
