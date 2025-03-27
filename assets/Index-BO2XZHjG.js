import{r as C,u as R,s as $}from"./button-l4YjRSEI.js";import{d as x}from"./dayjs-DWuKVjmt.js";import{P as c,_ as U}from"./Create.vue_vue_type_script_setup_true_lang-DXMEpRuu.js";import{e as _,f as B,g as I,h as k,j as A,k as M,l as Y}from"./index-DWZ8hFdd.js";import{_ as y}from"./Update.vue_vue_type_script_setup_true_lang-Dm9XX5eg.js";import{af as s,d as D,r as h,m as E,ag as v,c as H,o as N,R as d,u as l,J as j}from"./@vue-BsQ5olPH.js";import"./call-bind-apply-helpers-zm886y3p.js";import"./function-bind-CHqF18-c.js";import"./es-errors-CFxpeikN.js";import"./Form.vue_vue_type_script_setup_true_lang-C1IN83aA.js";import"./menu-QzTdbzv3.js";import"./pinia-DWpmodpF.js";import"./msw-Ve9Ip08e.js";import"./@open-draft-BbAaxlxc.js";import"./is-node-process-BZ-2HBMI.js";import"./outvariant-BBS2yBlX.js";import"./strict-event-emitter-CrFXw_VT.js";import"./@mswjs--W5AcoDd.js";import"./@bundled-es-modules-DDnD6D9h.js";import"./path-to-regexp-wCvGX3Wm.js";import"./headers-polyfill-C4bzlTWf.js";import"./qs-BNjWm72D.js";import"./side-channel-CKpA4dfz.js";import"./object-inspect-CiOUnV34.js";import"./side-channel-list-IZ6ufBWj.js";import"./side-channel-map-BvuNa93F.js";import"./get-intrinsic-DYXGad5I.js";import"./es-object-atoms-Ditt1eQ6.js";import"./math-intrinsics-Cv-yPkyD.js";import"./gopd-fcd2-aIC.js";import"./es-define-property-bDCdrV83.js";import"./has-symbols-BaUvM3gb.js";import"./get-proto-CQl1k7Za.js";import"./dunder-proto-tAQ_MH3o.js";import"./hasown-DwiY0sux.js";import"./call-bound-DTEBmFVe.js";import"./side-channel-weakmap-CmoVxQN_.js";import"./vue-i18n-BTYzcFZ-.js";import"./@intlify-qjRvhfuG.js";import"./vue-router-BE6TJkby.js";import"./axios-t--hEgTQ.js";import"./element-plus-utcJzeKc.js";import"./lodash-es-S0Y0Up6J.js";import"./@element-plus-CPQ9WWhG.js";import"./@popperjs-D_chPuIy.js";import"./@ctrl-r5W6hzzQ.js";import"./async-validator-9PlIezaS.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-BQoi3Ox2.js";import"./@floating-ui-DwceP2Gb.js";import"./@vueuse-CzdwygaW.js";import"./color-Cwf1wIF_.js";import"./color-string-CKWVXYG4.js";import"./color-name-BQ5IbGbl.js";import"./simple-swizzle-Tvclth0e.js";import"./color-convert-CkRI355n.js";import"./vue-cropper-BfVP4MbK.js";import"./sortablejs-C83syoBY.js";import"./nprogress-fpr8O7K9.js";const w=(p,a)=>{const i=_([c.Update]),r=_([c.Remove]),m=[{prop:"id",label:"按钮编号",defaultHide:!0},{prop:"name",label:"按钮名称",alwaysShow:!0},{prop:"code",label:"按钮代码"},{prop:"menu",label:"所属菜单",defaultComponent:({row:o})=>[s("div",o.menu.path)]},{prop:"createAt",label:"创建时间"},{prop:"status",label:"按钮状态",headerComponent:({column:o})=>[s(Y,{column:o,status:a.value.status,onChange(e){a.value.pageNo=1,a.value.status=e,p.execute(a.value)}})],defaultComponent:({row:o})=>{const e=R(o.id);return[s(M,{service:e,status:o.status,permission:[c.Update],onRefresh:p.refresh})]}}],u=[i,r].filter(o=>o);return u.length&&m.push({prop:"$",label:"管理操作",width:Math.max(120,u.length*80),defaultComponent:({row:o})=>[s(A,()=>{const e=[];if(i&&e.push(s(B,{onClick:()=>{const t=I(s(y,{row:o,onRefresh:()=>{t.close(),p.refresh()}}),{type:"update"})}})),r){const t=C(o.id);e.push(s(k,{service:t,onRefresh:p.refresh}))}return e})]}),{columns:m,schemas:[{tag:"ElInput",formItemProps:{prop:"name",label:"按钮名称"}},{tag:"ElInput",formItemProps:{prop:"code",label:"按钮代码"}}]}},qt=D({__name:"Index",setup(p){const a=()=>({pageNo:1,pageSize:10}),i=h(a()),r=$(),m=h(a()),u=E(()=>{var e;return(((e=r.result.value)==null?void 0:e.data)??[]).map(t=>(t.createAt=x(t.createAt).format("YYYY-MM-DD HH:mm:ss"),t))}),{columns:f,schemas:o}=w(r,m);return r.execute(m.value),(e,t)=>{const b=v("common-search"),g=v("common-table");return N(),H("div",null,[d(b,{model:i.value,"onUpdate:model":t[0]||(t[0]=n=>i.value=n),params:m.value,"onUpdate:params":t[1]||(t[1]=n=>m.value=n),service:l(r),"init-value":a,schemas:l(o)},null,8,["model","params","service","schemas"]),d(g,{params:m.value,"onUpdate:params":t[2]||(t[2]=n=>m.value=n),data:u.value,columns:l(f),service:l(r)},{"toolbar-right":j(()=>[d(U,{onRefresh:l(r).refresh},null,8,["onRefresh"])]),_:1},8,["params","data","columns","service"])])}}});export{qt as default};
