(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{528:function(e,l,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard",function(){return a(5833)}])},5833:function(e,l,a){"use strict";a.r(l),a.d(l,{__N_SSG:function(){return _}});var n=a(5893),i=a(7294),t=a(3100),r=a(4418),s=a(204),x=a(8911),m=a(1717),$=a(9222),c=a(8957),b=a(4195),d=a(3023),h=a(5358),u=a(4888),o=a(9264),f=a(4321);let j=()=>(199*Math.random()+1).toFixed(2),p=e=>{let{giftList:l}=e,a=l.map(e=>({...e,price:j()})),p=a.length,_=a.reduce((e,l)=>(e[l.brand]=(e[l.brand]||0)+1,e),{}),[g,w]=(0,i.useState)(!1),k=g?_:Object.fromEntries(Object.entries(_).filter(e=>{let[,l]=e;return l>1})),N=[{label:"$1 - $10",min:1,max:10},{label:"$10 - $20",min:10,max:20},{label:"$20 - $30",min:20,max:30},{label:"$30 - $40",min:30,max:40},{label:"$40 - $50",min:40,max:50},{label:"$50 - $60",min:50,max:60},{label:"$60 - $70",min:60,max:70},{label:"$70 - $80",min:70,max:80},{label:"$80 - $90",min:80,max:90},{label:"$90 - $100",min:90,max:100},{label:"$100 - $110",min:100,max:110},{label:"$110 - $120",min:110,max:120},{label:"$120 - $130",min:120,max:130},{label:"$130 - $140",min:130,max:140},{label:"$140 - $150",min:140,max:150},{label:"$150 - $160",min:150,max:160},{label:"$160 - $170",min:160,max:170},{label:"$170 - $180",min:170,max:180},{label:"$180 - $190",min:180,max:190},{label:"$190 - $200",min:190,max:200}].map(e=>{let l=a.filter(l=>parseFloat(l.price)>=e.min&&parseFloat(l.price)<e.max).length;return{label:e.label,count:l}});return(0,n.jsxs)(t.xu,{maxW:"container.xl",mx:"auto",p:4,children:[(0,n.jsx)(r.X,{as:"h1",mb:4,textAlign:"center",children:"Gift Statistics Dashboard"}),(0,n.jsxs)(s.k,{flexDirection:["column","row"],alignItems:"center",children:[(0,n.jsxs)(t.xu,{flex:"1",p:4,children:[(0,n.jsx)(r.X,{as:"h2",size:"lg",children:"Number of Gifts"}),(0,n.jsx)(x.x,{fontSize:"2xl",children:p})]}),(0,n.jsxs)(t.xu,{flex:"1",p:4,children:[(0,n.jsx)(r.X,{as:"h2",size:"lg",children:"Gifts per Brand"}),(0,n.jsx)(m.g,{align:"start",spacing:1,children:Object.entries(k).map(e=>{let[l,a]=e;return(0,n.jsxs)(x.x,{children:[l,": ",a]},l)})}),(0,n.jsxs)($.z,{mt:4,onClick:()=>w(!g),children:[g?"Hide":"Show"," brands with 1 item"]})]}),(0,n.jsxs)(t.xu,{flex:"1",p:4,children:[(0,n.jsx)(r.X,{as:"h2",size:"lg",children:"Histogram of Prices"}),(0,n.jsxs)(c.v,{width:600,height:300,data:N,children:[(0,n.jsx)(b.q,{strokeDasharray:"3 3"}),(0,n.jsx)(d.K,{dataKey:"label"}),(0,n.jsx)(h.B,{}),(0,n.jsx)(u.u,{}),(0,n.jsx)(o.D,{}),(0,n.jsx)(f.$,{dataKey:"count",fill:"#8884d8"})]})]})]})]})};var _=!0;l.default=p}},function(e){e.O(0,[960,774,888,179],function(){return e(e.s=528)}),_N_E=e.O()}]);