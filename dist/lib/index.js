"use strict";var J=Object.create;var u=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames,S=Object.getOwnPropertySymbols,W=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var y=(t,e,a)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,T=(t,e)=>{for(var a in e||(e={}))E.call(e,a)&&y(t,a,e[a]);if(S)for(var a of S(e))X.call(e,a)&&y(t,a,e[a]);return t};var Y=(t,e)=>{for(var a in e)u(t,a,{get:e[a],enumerable:!0})},h=(t,e,a,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Q(e))!E.call(t,r)&&r!==a&&u(t,r,{get:()=>e[r],enumerable:!(i=K(e,r))||i.enumerable});return t};var Z=(t,e,a)=>(a=t!=null?J(W(t)):{},h(e||!t||!t.__esModule?u(a,"default",{value:t,enumerable:!0}):a,t)),j=t=>h(u({},"__esModule",{value:!0}),t);var L=(t,e,a)=>new Promise((i,r)=>{var m=n=>{try{g(a.next(n))}catch(c){r(c)}},d=n=>{try{g(a.throw(n))}catch(c){r(c)}},g=n=>n.done?i(n.value):Promise.resolve(n.value).then(m,d);g((a=a.apply(t,e)).next())});var te={};Y(te,{useFirebaseFileUploader:()=>I});module.exports=j(te);var o=Z(require("react")),p=require("firebase/storage"),x=require("lodash"),H=require("nanoid");var M=require("react/jsx-runtime"),N=({payload:t,file:e})=>(0,x.isFunction)(t)?t(e==null?void 0:e.name):t||(0,H.nanoid)(),ee=t=>{let[e,a]=o.useState(!1),[i,r]=o.useState(0),[m,d]=o.useState(""),[g,n]=o.useState(""),[c,k]=o.useState(""),[C,w]=o.useState(""),[A,B]=o.useState(!1),D=o.forwardRef((V,$)=>{let v=l=>{let f=Math.round(l.bytesTransferred/l.totalBytes*100);r(f)},O=l=>{a(!1),B(l),console.log(l)};return(0,M.jsx)("input",T({type:"file",onChange:l=>{l.preventDefault();let s=l.currentTarget.files[0];w(s.name),k(s.type),a(!0);let{includeExt:P,filename:R,storage:_,path:q}=t,F=P?s==null?void 0:s.type.replace(/(.*)\//g,""):null,U=F?N({payload:R,file:s})+"."+F:N({payload:R,file:s});if(n(U),!s)return;let z=(0,p.ref)(_,`/${q}/${U}`),b=(0,p.uploadBytesResumable)(z,s);b.on("state_changed",v,O,()=>L(void 0,null,function*(){let G=yield(0,p.getDownloadURL)(b.snapshot.ref);d(G),a(!1)}))},disabled:e,ref:$},V))});return{uploading:e,progress:i,fileURL:m,fileName:g,originalFileName:C,fileType:c,error:A,FileUploaderUI:D}},I=ee;0&&(module.exports={useFirebaseFileUploader});
