"use strict";var K=Object.create;var u=Object.defineProperty,Q=Object.defineProperties,W=Object.getOwnPropertyDescriptor,X=Object.getOwnPropertyDescriptors,Y=Object.getOwnPropertyNames,S=Object.getOwnPropertySymbols,Z=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var E=(t,e,a)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,h=(t,e)=>{for(var a in e||(e={}))I.call(e,a)&&E(t,a,e[a]);if(S)for(var a of S(e))j.call(e,a)&&E(t,a,e[a]);return t},T=(t,e)=>Q(t,X(e));var ee=(t,e)=>{for(var a in e)u(t,a,{get:e[a],enumerable:!0})},y=(t,e,a,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Y(e))!I.call(t,r)&&r!==a&&u(t,r,{get:()=>e[r],enumerable:!(i=W(e,r))||i.enumerable});return t};var te=(t,e,a)=>(a=t!=null?K(Z(t)):{},y(e||!t||!t.__esModule?u(a,"default",{value:t,enumerable:!0}):a,t)),ae=t=>y(u({},"__esModule",{value:!0}),t);var x=(t,e,a)=>new Promise((i,r)=>{var f=o=>{try{c(a.next(o))}catch(g){r(g)}},d=o=>{try{c(a.throw(o))}catch(g){r(g)}},c=o=>o.done?i(o.value):Promise.resolve(o.value).then(f,d);c((a=a.apply(t,e)).next())});var ne={};ee(ne,{useFirebaseFileUploader:()=>C});module.exports=ae(ne);var n=te(require("react")),p=require("firebase/storage"),L=require("lodash"),H=require("nanoid");var M=require("react/jsx-runtime"),N=({payload:t,file:e})=>(0,L.isFunction)(t)?t(e==null?void 0:e.name):t||(0,H.nanoid)(),re=t=>{let[e,a]=n.useState(!1),[i,r]=n.useState(0),[f,d]=n.useState(""),[c,o]=n.useState(""),[g,k]=n.useState(""),[w,P]=n.useState(""),[A,B]=n.useState(!1),D=n.forwardRef((V,$)=>{let v=l=>{let m=Math.round(l.bytesTransferred/l.totalBytes*100);r(m)},O=l=>{a(!1),B(l),console.log(l)};return(0,M.jsx)("input",T(h({type:"file",onChange:l=>{l.preventDefault();let s=l.currentTarget.files[0];P(s.name),k(s.type),a(!0);let{includeExt:_,filename:R,storage:q,path:z}=t,F=_?s==null?void 0:s.type.replace(/(.*)\//g,""):null,b=F?N({payload:R,file:s})+"."+F:N({payload:R,file:s});if(o(b),!s)return;let G=(0,p.ref)(q,`/${z}/${b}`),U=(0,p.uploadBytesResumable)(G,s);U.on("state_changed",v,O,()=>x(void 0,null,function*(){let J=yield(0,p.getDownloadURL)(U.snapshot.ref);d(J),a(!1)}))},disabled:e},V),{ref:$}))});return{uploading:e,progress:i,fileURL:f,fileName:c,originalFileName:w,fileType:g,error:A,FileUploaderUI:D}},C=re;0&&(module.exports={useFirebaseFileUploader});
