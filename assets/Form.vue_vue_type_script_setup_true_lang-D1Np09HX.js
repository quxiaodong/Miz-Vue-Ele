import{i as s}from"./index-DWZ8hFdd.js";import{d as I,aA as m,ay as b,aB as h,m as v,ag as r,I as V,o as P,u as B,J as E,a as R,R as k}from"./@vue-BsQ5olPH.js";const y={class:"text-right"},x=I({__name:"Form",props:m({loading:{type:Boolean}},{modelValue:{required:!0},modelModifiers:{}}),emits:m(["submit"],["update:modelValue"]),setup(l,{emit:n}){const u=n,t=b("dom"),a=h(l,"modelValue"),p=v(()=>({name:s(),code:s()})),c=()=>({schemas:[{tag:"ElInput",formItemProps:{prop:"name",label:"语言名称"}},{tag:"ElInput",formItemProps:{prop:"code",label:"语言代码"}},{tag:"ElInput",formItemProps:{prop:"icon",label:"语言图标"}},{tag:"ElInput",tagProps:{formatter:e=>e.replace(/[^0-9]/g,""),parser:e=>e.replace(/[^0-9]/g,"")},formItemProps:{prop:"sort",label:"语言排序"}},{tag:"ElSelect",formItemProps:{prop:"status",label:"语言状态"}}]}),{schemas:d}=c(),i=()=>{var o;(o=t.value)!=null&&o.formRef&&t.value.formRef.validate().then(()=>u("submit"))};return(o,e)=>{const f=r("widget-submit"),g=r("common-form");return P(),V(g,{ref_key:"dom",ref:t,modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=_=>a.value=_),rules:p.value,schemas:B(d)},{default:E(()=>[R("div",y,[k(f,{loading:o.loading,onClick:i},null,8,["loading"])])]),_:1},8,["modelValue","rules","schemas"])}}});export{x as _};
