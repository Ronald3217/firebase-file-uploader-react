var A=Object.defineProperty;var S=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var h=(a,e,t)=>e in a?A(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,U=(a,e)=>{for(var t in e||(e={}))O.call(e,t)&&h(a,t,e[t]);if(S)for(var t of S(e))P.call(e,t)&&h(a,t,e[t]);return a};var E=(a,e,t)=>new Promise((p,c)=>{var g=n=>{try{l(t.next(n))}catch(i){c(i)}},u=n=>{try{l(t.throw(n))}catch(i){c(i)}},l=n=>n.done?p(n.value):Promise.resolve(n.value).then(g,u);l((t=t.apply(a,e)).next())});import*as r from"react";import{ref as _,uploadBytesResumable as q,getDownloadURL as z}from"firebase/storage";import{isFunction as G}from"lodash";import{nanoid as J}from"nanoid";import{jsx as V}from"react/jsx-runtime";var T=({payload:a,file:e})=>G(a)?a(e==null?void 0:e.name):a||J(),K=a=>{let[e,t]=r.useState(!1),[p,c]=r.useState(0),[g,u]=r.useState(""),[l,n]=r.useState(""),[i,y]=r.useState(""),[b,L]=r.useState(""),[N,I]=r.useState(),M=r.forwardRef((x,H)=>{let C=s=>{let d=Math.round(s.bytesTransferred/s.totalBytes*100);c(d)},k=s=>{t(!1),I(s),console.log(s)};return V("input",U({type:"file",onChange:s=>{s.preventDefault();let o=s.currentTarget.files[0];L(o.name),y(o.type),t(!0);let{includeExt:w,filename:f,storage:B,path:D}=a,m=w?o==null?void 0:o.type.replace(/(.*)\//g,""):null,R=m?T({payload:f,file:o})+"."+m:T({payload:f,file:o});if(n(R),!o)return;let $=_(B,`/${D}/${R}`),F=q($,o);F.on("state_changed",C,k,()=>E(void 0,null,function*(){let v=yield z(F.snapshot.ref);u(v),t(!1)}))},disabled:e,ref:H},x))});return{uploading:e,progress:p,fileURL:g,fileName:l,originalFileName:b,fileType:i,error:N,FileUploaderUI:M}},Q=K;export{Q as useFirebaseFileUploader};
