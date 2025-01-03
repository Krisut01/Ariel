import{h as w,i as y,v as h,o as l,f as i,T as v,c as _,w as u,a as r,u as o,Z as k,b as e,t as V,g as B,e as C,n as j,d as p,j as L}from"./app-Dz5jbdU5.js";import{_ as $}from"./GuestLayout-DwIfSKg1.js";import{_ as g,a as f,b as x}from"./TextInput-BiQX4f-k.js";import{P as S}from"./PrimaryButton-DmvEjc-U.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M=["value"],N={__name:"Checkbox",props:{checked:{type:[Array,Boolean],required:!0},value:{default:null}},emits:["update:checked"],setup(n,{emit:t}){const d=t,m=n,s=w({get(){return m.checked},set(a){d("update:checked",a)}});return(a,c)=>y((l(),i("input",{type:"checkbox",value:n.value,"onUpdate:modelValue":c[0]||(c[0]=b=>s.value=b),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"},null,8,M)),[[h,s.value]])}},P={class:"min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"},U={class:"w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"},q={key:0,class:"mb-4 p-4 bg-green-50 rounded-lg"},D={class:"text-sm font-medium text-green-600"},z={class:"flex items-center justify-between"},R={class:"flex items-center"},T={key:0},A={key:1},F={class:"text-center mt-6"},I={class:"text-sm text-gray-600"},W={__name:"Login",props:{canResetPassword:{type:Boolean},status:{type:String}},setup(n){const t=v({email:"",password:"",remember:!1}),d=()=>{t.post(route("login"),{onFinish:()=>t.reset("password")})};return(m,s)=>(l(),_($,null,{default:u(()=>[r(o(k),{title:"Log in to MoodSync"}),e("div",P,[e("div",U,[s[6]||(s[6]=e("div",{class:"text-center mb-8"},[e("div",{class:"flex justify-center mb-4"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-12 h-12 text-indigo-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"})])]),e("h2",{class:"text-2xl font-bold text-gray-900"},"Welcome Back"),e("p",{class:"text-gray-600 mt-2"},"Continue your emotional journey")],-1)),n.status?(l(),i("div",q,[e("p",D,V(n.status),1)])):B("",!0),e("form",{onSubmit:C(d,["prevent"]),class:"space-y-6"},[e("div",null,[r(g,{for:"email",value:"Email",class:"text-gray-700"}),r(f,{id:"email",type:"email",class:"mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",modelValue:o(t).email,"onUpdate:modelValue":s[0]||(s[0]=a=>o(t).email=a),required:"",autofocus:"",autocomplete:"username",placeholder:"Enter your email"},null,8,["modelValue"]),r(x,{class:"mt-2",message:o(t).errors.email},null,8,["message"])]),e("div",null,[r(g,{for:"password",value:"Password",class:"text-gray-700"}),r(f,{id:"password",type:"password",class:"mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",modelValue:o(t).password,"onUpdate:modelValue":s[1]||(s[1]=a=>o(t).password=a),required:"",autocomplete:"current-password",placeholder:"Enter your password"},null,8,["modelValue"]),r(x,{class:"mt-2",message:o(t).errors.password},null,8,["message"])]),e("div",z,[e("label",R,[r(N,{name:"remember",checked:o(t).remember,"onUpdate:checked":s[2]||(s[2]=a=>o(t).remember=a),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"},null,8,["checked"]),s[3]||(s[3]=e("span",{class:"ms-2 text-sm text-gray-600"},"Remember me",-1))])]),e("div",null,[r(S,{class:j(["w-full justify-center bg-indigo-600 hover:bg-indigo-700",{"opacity-25":o(t).processing}]),disabled:o(t).processing},{default:u(()=>[o(t).processing?(l(),i("span",T,"Logging in...")):(l(),i("span",A,"Log in"))]),_:1},8,["class","disabled"])]),e("div",F,[e("p",I,[s[5]||(s[5]=p(" Don't have an account? ")),r(o(L),{href:m.route("register"),class:"font-medium text-indigo-600 hover:text-indigo-500 hover:underline"},{default:u(()=>s[4]||(s[4]=[p(" Sign up ")])),_:1},8,["href"])])])],32)])])]),_:1}))}},O=E(W,[["__scopeId","data-v-b06d9b97"]]);export{O as default};