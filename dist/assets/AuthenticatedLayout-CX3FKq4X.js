import{m as S,E as B,h as v,l as L,o as d,f as h,b as e,r as c,i as k,G as $,a as i,w as r,n as u,D,c as b,u as x,j as _,d as l,t as m,g as M}from"./app-Csl637xT.js";const N={class:"relative"},E={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:String,default:"py-1 bg-white"}},setup(n){const o=n,t=g=>{a.value&&g.key==="Escape"&&(a.value=!1)};S(()=>document.addEventListener("keydown",t)),B(()=>document.removeEventListener("keydown",t));const s=v(()=>({48:"w-48"})[o.width.toString()]),p=v(()=>o.align==="left"?"ltr:origin-top-left rtl:origin-top-right start-0":o.align==="right"?"ltr:origin-top-right rtl:origin-top-left end-0":"origin-top"),a=L(!1);return(g,f)=>(d(),h("div",N,[e("div",{onClick:f[0]||(f[0]=w=>a.value=!a.value)},[c(g.$slots,"trigger")]),k(e("div",{class:"fixed inset-0 z-40",onClick:f[1]||(f[1]=w=>a.value=!1)},null,512),[[$,a.value]]),i(D,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:r(()=>[k(e("div",{class:u(["absolute z-50 mt-2 rounded-md shadow-lg",[s.value,p.value]]),style:{display:"none"},onClick:f[2]||(f[2]=w=>a.value=!1)},[e("div",{class:u(["rounded-md ring-1 ring-black ring-opacity-5",n.contentClasses])},[c(g.$slots,"content")],2)],2),[[$,a.value]])]),_:3})]))}},C={__name:"DropdownLink",props:{href:{type:String,required:!0}},setup(n){return(o,t)=>(d(),b(x(_),{href:n.href,class:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"},{default:r(()=>[c(o.$slots,"default")]),_:3},8,["href"]))}},j={__name:"NavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(n){const o=n,t=v(()=>o.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");return(s,p)=>(d(),b(x(_),{href:n.href,class:u(t.value)},{default:r(()=>[c(s.$slots,"default")]),_:3},8,["href","class"]))}},y={__name:"ResponsiveNavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(n){const o=n,t=v(()=>o.active?"block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out":"block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(s,p)=>(d(),b(x(_),{href:n.href,class:u(t.value)},{default:r(()=>[c(s.$slots,"default")]),_:3},8,["href","class"]))}},z={class:""},V={class:"border-b border-gray-100 bg-white"},q={class:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"},O={class:"flex h-16 justify-between"},P={class:"flex"},T={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},A={class:"hidden sm:ms-6 sm:flex sm:items-center"},G={class:"relative ms-3"},R={class:"inline-flex rounded-md"},U={type:"button",class:"inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"},F={class:"-me-2 flex items-center sm:hidden"},H={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},I={class:"space-y-1 pb-3 pt-2"},J={class:"border-t border-gray-200 pb-1 pt-4"},K={class:"px-4"},Q={class:"text-base font-medium text-gray-800"},W={class:"text-sm font-medium text-gray-500"},X={class:"mt-3 space-y-1"},Y={key:0,class:"bg-white shadow"},Z={class:"mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"},te={__name:"AuthenticatedLayout",setup(n){const o=L(!1);return(t,s)=>(d(),h("div",null,[e("div",z,[e("nav",V,[e("div",q,[e("div",O,[e("div",P,[e("div",T,[i(j,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>s[1]||(s[1]=[l(" Dashboard ")])),_:1},8,["href","active"])])]),e("div",A,[e("div",G,[i(E,{align:"right",width:"48"},{trigger:r(()=>[e("span",R,[e("button",U,[l(m(t.$page.props.auth.user.name)+" ",1),s[2]||(s[2]=e("svg",{class:"-me-0.5 ms-2 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])])]),content:r(()=>[i(C,{href:t.route("profile.edit")},{default:r(()=>s[3]||(s[3]=[l(" Profile ")])),_:1},8,["href"]),i(C,{href:t.route("logout"),method:"post",as:"button"},{default:r(()=>s[4]||(s[4]=[l(" Log Out ")])),_:1},8,["href"])]),_:1})])]),e("div",F,[e("button",{onClick:s[0]||(s[0]=p=>o.value=!o.value),class:"inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"},[(d(),h("svg",H,[e("path",{class:u({hidden:o.value,"inline-flex":!o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),e("path",{class:u({hidden:!o.value,"inline-flex":o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),e("div",{class:u([{block:o.value,hidden:!o.value},"sm:hidden"])},[e("div",I,[i(y,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>s[5]||(s[5]=[l(" Dashboard ")])),_:1},8,["href","active"])]),e("div",J,[e("div",K,[e("div",Q,m(t.$page.props.auth.user.name),1),e("div",W,m(t.$page.props.auth.user.email),1)]),e("div",X,[i(y,{href:t.route("profile.edit")},{default:r(()=>s[6]||(s[6]=[l(" Profile ")])),_:1},8,["href"]),i(y,{href:t.route("logout"),method:"post",as:"button"},{default:r(()=>s[7]||(s[7]=[l(" Log Out ")])),_:1},8,["href"])])])],2)]),t.$slots.header?(d(),h("header",Y,[e("div",Z,[c(t.$slots,"header")])])):M("",!0),e("main",null,[c(t.$slots,"default")])])]))}};export{te as _};
