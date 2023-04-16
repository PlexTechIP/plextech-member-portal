"use strict";(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[7],{46007:function(e,t,n){n.r(t),n.d(t,{PasswordResetPage:function(){return b}});var r,s,a=n(30168),i=n(74165),o=n(15861),c=n(29439),d=n(53115),u=n(42832),l=n(69099),p=n(31427),h=n(70501),x=n(85281),g=n(95785),f=n(47313),m=n(65964),Z=n(96694),k=n(53422),j=(0,n(12540).u)((function(){return n.e(898).then(n.bind(n,39898))}),(function(e){return e.NewPasswordPage})),w=n(46417);function b(e){var t=(0,f.useState)(!1),n=(0,c.Z)(t,2),r=n[0],s=n[1],a=(0,f.useState)(""),d=(0,c.Z)(a,2),h=d[0],x=d[1],Z=(0,f.useState)(),b=(0,c.Z)(Z,2),I=b[0],R=b[1],q=(0,f.useState)(!1),z=(0,c.Z)(q,2),B=z[0],M=z[1],N=(0,f.useState)(!1),O=(0,c.Z)(N,2),D=O[0],F=O[1],J=(0,f.useState)(!1),L=(0,c.Z)(J,2),_=L[0],A=L[1],E=(0,f.useState)(!1),G=(0,c.Z)(E,2),H=G[0],K=G[1],Q=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(n){var r,a,o;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),""!==h){t.next=4;break}return s(!0),t.abrupt("return");case 4:return M(!0),r="".concat("https://plexfinance-backend-production.up.railway.app","/users/"),t.prev=6,t.next=9,fetch(r,{method:"POST",mode:"cors",cache:"no-cache",credentials:"omit",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({email:e.email,code:h,method:"checkResetPasswordCode"})});case 9:if(a=t.sent,M(!1),a.ok){t.next=21;break}if(401!==a.status){t.next=15;break}return F(!0),t.abrupt("return");case 15:if(498!==a.status){t.next=18;break}return A(!0),t.abrupt("return");case 18:return console.error(a),R({errorCode:a.status,errorMessage:a.statusText}),t.abrupt("return");case 21:return t.next=23,a.json();case 23:o=t.sent,e.setToken("\u0192"+o.access_token),K(!0),A(!1),F(!1),s(!1),t.next=36;break;case 31:return t.prev=31,t.t0=t.catch(6),console.error(t.t0),R({errorMessage:t.t0.toString()}),t.abrupt("return");case 36:case"end":return t.stop()}}),t,null,[[6,31]])})));return function(e){return t.apply(this,arguments)}}();return H?(0,w.jsx)(j,{setToken:e.setToken,token:e.token}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(m.ql,{children:[(0,w.jsx)("title",{children:"Reset Password"}),(0,w.jsx)("meta",{name:"Reset Password",content:"Login page for PlexTech finance"})]}),I?(0,w.jsx)(g.C,{open:!!I,error:I}):(0,w.jsxs)(S,{children:[(0,w.jsx)(v,{elevation:3,children:(0,w.jsx)("form",{children:(0,w.jsxs)(u.Z,{alignItems:"center",spacing:4,children:[(0,w.jsxs)(P,{direction:"row",justifyContent:"space-between",alignItems:"flex-start",children:[(0,w.jsx)(l.Z,{variant:"contained",style:{visibility:"hidden"},children:"Back to login"}),(0,w.jsx)(y,{src:k,alt:"PlexTech logo"}),(0,w.jsx)(l.Z,{variant:"contained",onClick:e.onBack,children:"Back to login"})]}),(0,w.jsx)(C,{children:"Reset Password"}),(0,w.jsxs)(P,{children:[(0,w.jsx)("p",{children:"5-digit code (check your email)"}),(0,w.jsx)(p.Z,{variant:"outlined",required:!0,size:"small",value:h,onChange:function(e){var t=e.target;x(t.value)},error:r&&""===h||D,helperText:(r&&""===h?"Required":D&&"Incorrect code.")||_&&"Code expired. Please try again."})]}),(0,w.jsx)(l.Z,{variant:"contained",onClick:Q,type:"submit",children:B?(0,w.jsx)(T,{size:20}):"Submit"})]})})}),(0,w.jsx)("div",{style:{height:"5%"}})]})]})}var v=(0,Z.Z)(h.Z)(r||(r=(0,a.Z)(["\n  min-height: 95%;\n  width: 40%;\n  min-width: 500px;\n  margin: auto;\n  padding: 64px;\n  border-radius: 48px;\n"]))),P=(0,d.ZP)(u.Z).withConfig({componentId:"sc-1g9p21g-0"})(["width:100%;"]),C=d.ZP.h1.withConfig({componentId:"sc-1g9p21g-1"})(["margin:0px;font-size:3.052rem;padding-top:24px;"]),y=d.ZP.img.withConfig({componentId:"sc-1g9p21g-2"})(["max-width:80px;"]),S=d.ZP.div.withConfig({componentId:"sc-1g9p21g-3"})(["padding-top:64px;height:100%;"]),T=(0,Z.Z)(x.Z)(s||(s=(0,a.Z)(["\n  color: rgb(255, 138, 0);\n"])))}}]);