"use strict";(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[205],{63931:function(e,n,r){r.d(n,{C:function(){return Z}});var t,a,i,o,s=r(30168),l=r(42832),c=r(47131),u=r(70501),d=r(25673),p=r(47313),h=r(96694),m=r(53115),f=r(32094),x=r(85979),v=r(46417);function Z(e){return(0,p.useEffect)((function(){console.warn(e.error)})),(0,v.jsx)(k,{open:e.open,children:(0,v.jsx)(b,{children:(0,v.jsxs)(l.Z,{spacing:2,children:[(0,v.jsxs)(l.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,v.jsxs)(g,{children:["Error",e.error.errorCode&&" ".concat(e.error.errorCode),":"," ",e.error.errorMessage]}),(0,v.jsx)(c.Z,{onClick:function(){window.location.reload()},children:(0,v.jsx)(f.Z,{})})]}),(0,v.jsxs)(w,{children:["Try refreshing the page and contact"," ",(0,v.jsx)("a",{href:"mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]",children:"shamith09@berkeley.edu"})," ","if the issue persists."]}),(0,v.jsx)("img",{src:x.Uf,alt:"error"})]})})})}var b=(0,h.Z)(u.Z)(t||(t=(0,s.Z)(["\n  padding: 48px;\n  border-radius: 48px;\n"]))),g=m.ZP.h1(a||(a=(0,s.Z)(["\n  margin: 0px;\n"]))),w=m.ZP.p(i||(i=(0,s.Z)(["\n  margin: 0px;\n"]))),k=(0,m.ZP)(d.Z)(o||(o=(0,s.Z)(["\n  width: 50%;\n  min-width: 500px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 64px;\n"])))},5662:function(e,n,r){r.d(n,{F:function(){return o}});r(47313);var t=r(97747),a=r(94469),i=r(46417);function o(e){return setTimeout((function(){e.onClose()}),4e3),(0,i.jsx)(a.Z,{onClose:e.onClose,open:e.open,PaperProps:{style:{borderRadius:"48px",padding:"48px"}},children:(0,i.jsx)(t.Z,{mode:t.E.SUCCESS})})}},25205:function(e,n,r){r.r(n),r.d(n,{ProfilePage:function(){return S}});var t,a,i,o,s,l=r(30168),c=r(1413),u=r(74165),d=r(15861),p=r(29439),h=r(47313),m=r(53115),f=r(65964),x=r(63931),v=r(96694),Z=r(42832),b=r(69099),g=r(31427),w=r(73428),k=r(45439),j=r(47196),y=r(5662),C=r(46417);function S(e){var n,r,t,a,i,o,s=(0,h.useState)(),l=(0,p.Z)(s,2),m=l[0],v=l[1],w=(0,h.useState)(),j=(0,p.Z)(w,2),S=j[0],D=j[1],M=(0,h.useState)(!1),B=(0,p.Z)(M,2),U=B[0],I=B[1],R=(0,h.useState)(""),F=(0,p.Z)(R,2),T=F[0],L=F[1],q=(0,h.useState)(""),A=(0,p.Z)(q,2),z=A[0],O=A[1],Y=(0,h.useState)(""),G=(0,p.Z)(Y,2),K=G[0],$=G[1],X=(0,h.useState)(!1),H=(0,p.Z)(X,2),J=H[0],Q=H[1],V=(0,h.useState)(""),ee=(0,p.Z)(V,2),ne=ee[0],re=ee[1],te=(0,h.useState)(""),ae=(0,p.Z)(te,2),ie=ae[0],oe=ae[1],se=(0,h.useState)(""),le=(0,p.Z)(se,2),ce=le[0],ue=le[1],de=(0,h.useState)(""),pe=(0,p.Z)(de,2),he=pe[0],me=pe[1],fe=(0,h.useState)(""),xe=(0,p.Z)(fe,2),ve=xe[0],Ze=xe[1],be=(0,h.useState)(""),ge=(0,p.Z)(be,2),we=ge[0],ke=ge[1],je=(0,h.useState)(""),ye=(0,p.Z)(je,2),Ce=ye[0],Se=ye[1],We=(0,h.useState)(""),Pe=(0,p.Z)(We,2),_e=Pe[0],Ee=Pe[1];(0,h.useEffect)((function(){var e=function(){var e=(0,d.Z)((0,u.Z)().mark((function e(){var n,r,t,a;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,k.N)("/profile/","GET");case 2:if(n=e.sent,r=(0,p.Z)(n,2),t=r[0],a=r[1],t){e.next=9;break}return v(a.error),e.abrupt("return");case 9:D(a),I(a.treasurer),re(a.bluevine_email),oe(a.bluevine_password),ue(a.current_position||""),me(a.profile_blurb||""),Ze(a.linkedin_username||""),ke(a.instagram_username||""),Se(a.calendly_username||""),Ee(a.current_company||""),a.bank&&(L(a.bank.account_number),O(a.bank.routing_number),$(a.bank.bank_name));case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[e]);var Ne=function(){var e=(0,d.Z)((0,u.Z)().mark((function e(){var n,r,t,a,i,o,s;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={bankName:K},T!==(null===S||void 0===S||null===(n=S.bank)||void 0===n?void 0:n.account_number)&&(t.account_number=T),z!==(null===S||void 0===S||null===(r=S.bank)||void 0===r?void 0:r.routing_number)&&(t.routing_number=z),e.next=5,(0,k.N)("/bank/","PUT",t);case 5:if(a=e.sent,i=(0,p.Z)(a,2),o=i[0],s=i[1],o){e.next=12;break}return v(s.error),e.abrupt("return");case 12:D((function(e){return(0,c.Z)((0,c.Z)({},e),{},{bank:(0,c.Z)((0,c.Z)({},e.bank),t)})})),Q(!0);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),De=function(){var e=(0,d.Z)((0,u.Z)().mark((function e(){var n,r,t,a,i;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={bluevineEmail:ne},ie&&ie!==(null===S||void 0===S?void 0:S.bluevinePassword)&&(n.bluevinePassword=ie),e.next=4,(0,k.N)("/bluevine/","PUT",n);case 4:if(r=e.sent,t=(0,p.Z)(r,2),a=t[0],i=t[1],a){e.next=11;break}return v(i.error),e.abrupt("return");case 11:D((function(e){return(0,c.Z)((0,c.Z)({},e),{},{bodyData:n})})),Q(!0);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Me=function(){var e=(0,d.Z)((0,u.Z)().mark((function e(){var n,r,t,a;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,k.N)("/profile/","PUT",{current_position:ce,profile_blurb:he,linkedin_username:ve,instagram_username:we,calendly_username:Ce,current_company:_e});case 2:if(n=e.sent,r=(0,p.Z)(n,2),t=r[0],a=r[1],t){e.next=9;break}return v(a.error),e.abrupt("return");case 9:Q(!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(f.ql,{children:[(0,C.jsx)("title",{children:"Profile"}),(0,C.jsx)("meta",{name:"description",content:"Profile information"})]}),m&&(0,C.jsx)(x.C,{open:!!m,error:m}),(0,C.jsx)(P,{}),S&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(P,{children:(0,C.jsx)(W,{children:(0,C.jsxs)(Z.Z,{spacing:4,children:[(0,C.jsxs)(Z.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,C.jsx)(_,{children:"Member Details"}),(0,C.jsx)(b.Z,{onClick:Me,variant:"contained",disabled:he===S.profile_blurb&&ve===S.linkedin_username&&we===S.instagram_username&&Ce===S.calendly_username&&_e===S.current_company||""!==ve&&!ve.startsWith("https://www.linkedin.com/")||""!==we&&!we.startsWith("https://www.instagram.com/")||""!==Ce&&!Ce.startsWith("https://calendly.com/")||""===he,children:"Update"})]}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Current Position (admin only)",value:ce,onChange:function(e){return ue(e.target.value)},InputProps:{readOnly:!U},disabled:!U}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Profile Blurb",value:he,onChange:function(e){return me(e.target.value)},multiline:!0,rows:4,required:!0}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"LinkedIn URL",value:ve,onChange:function(e){return Ze(e.target.value)},error:""!==ve&&!ve.startsWith("https://www.linkedin.com/")||""===ve&&ve!==S.linkedin_username,helperText:""===ve||ve.startsWith("https://www.linkedin.com/")?"":"Must be a valid LinkedIn URL",required:!0}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Instagram URL",value:we,onChange:function(e){return ke(e.target.value)},error:""!==we&&!we.startsWith("https://www.instagram.com/")||""===we&&we!==S.instagram_username,helperText:""===we||we.startsWith("https://www.instagram.com/")?"":"Must be a valid Instagram URL",required:!0}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Calendly URL",value:Ce,onChange:function(e){return Se(e.target.value)},error:""!==Ce&&!Ce.startsWith("https://calendly.com/")||""===Ce&&Ce!==S.calendly_username,helperText:""===Ce||Ce.startsWith("https://calendly.com/")?"":"Must be a valid Calendly URL",required:!0}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Current Company",value:_e,onChange:function(e){return Ee(e.target.value)}})]})})}),(0,C.jsx)(P,{children:(0,C.jsx)(W,{children:(0,C.jsxs)(Z.Z,{spacing:4,children:[(0,C.jsxs)(Z.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,C.jsx)(_,{children:"Bank Details"}),(0,C.jsx)(b.Z,{onClick:Ne,variant:"contained",disabled:!T||!z||T===(null===(n=S.bank)||void 0===n?void 0:n.account_number)&&z===(null===(r=S.bank)||void 0===r?void 0:r.routing_number)&&K===(null===(t=S.bank)||void 0===t?void 0:t.bank_name)||!K,children:S.bank?"Update":"Submit"})]}),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g.Z,{fullWidth:!0,label:"Account Number",onChange:function(e){return L(e.target.value)},required:!0,error:!(T&&/^\d+$/.test(T)||T===(null===(a=S.bank)||void 0===a?void 0:a.account_number)),value:T,type:"password"}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Routing Number",value:z,onChange:function(e){return O(e.target.value)},required:!0,error:!(z&&/^\d+$/.test(z)||z===(null===(i=S.bank)||void 0===i?void 0:i.routing_number)),type:"password"})]}),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g.Z,{fullWidth:!0,label:"Bank Name",value:K,onChange:function(e){return $(e.target.value)},required:!0,error:!(K||K===(null===(o=S.bank)||void 0===o?void 0:o.bank_name))}),(0,C.jsx)(y.F,{open:J,onClose:function(){return Q(!1)}})]}),(0,C.jsxs)(Z.Z,{direction:"row",alignItems:"center",spacing:1,justifyContent:"flex-end",children:[(0,C.jsx)(N,{}),(0,C.jsx)(E,{children:"Your information is securely encrypted with Fernet."})]})]})})}),U&&(0,C.jsx)(P,{children:(0,C.jsx)(W,{children:(0,C.jsxs)(Z.Z,{spacing:4,children:[(0,C.jsxs)(Z.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,C.jsx)(_,{children:"Bluevine Details (admin only)"}),(0,C.jsx)(b.Z,{onClick:De,variant:"contained",disabled:!ne||!ie||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ne)||ie===S.bluevinePassword&&ne===S.bluevineEmail,children:S.bank?"Update":"Submit"})]}),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g.Z,{fullWidth:!0,label:"Bluevine Email",onChange:function(e){return re(e.target.value)},required:!0,error:!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ne),value:ne}),(0,C.jsx)(g.Z,{fullWidth:!0,label:"Bluevine Password",value:ie,onChange:function(e){return oe(e.target.value)},error:!ie,required:!0,type:"password"})]}),(0,C.jsxs)(Z.Z,{direction:"row",alignItems:"center",spacing:1,justifyContent:"flex-end",children:[(0,C.jsx)(N,{}),(0,C.jsx)(E,{children:"Your information is securely encrypted with Fernet."})]})]})})})]})]})}var W=(0,v.Z)(w.Z)(t||(t=(0,l.Z)(["\n  padding: 48px;\n  width: 80%;\n  border-radius: 32px;\n"]))),P=m.ZP.div(a||(a=(0,l.Z)(["\n  min-height: 95%;\n  width: 75%;\n  min-width: 500px;\n  margin: auto;\n  padding-left: 64px;\n  padding-right: 64px;\n  padding-top: 32px;\n  border-radius: 48px;\n"]))),_=m.ZP.h1(i||(i=(0,l.Z)(["\n  margin: 0;\n"]))),E=m.ZP.p(o||(o=(0,l.Z)(["\n  margin: 0;\n  color: grey;\n"]))),N=(0,v.Z)(j.Z)(s||(s=(0,l.Z)(["\n  color: grey;\n  font-size: small;\n"])))},47196:function(e,n,r){var t=r(64836);n.Z=void 0;var a=t(r(45045)),i=r(46417),o=(0,a.default)((0,i.jsx)("path",{d:"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"InfoOutlined");n.Z=o},73428:function(e,n,r){r.d(n,{Z:function(){return v}});var t=r(87462),a=r(63366),i=r(47313),o=r(83061),s=r(21921),l=r(17592),c=r(77342),u=r(70501),d=r(77430),p=r(32298);function h(e){return(0,p.Z)("MuiCard",e)}(0,d.Z)("MuiCard",["root"]);var m=r(46417),f=["className","raised"],x=(0,l.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,n){return n.root}})((function(){return{overflow:"hidden"}})),v=i.forwardRef((function(e,n){var r=(0,c.Z)({props:e,name:"MuiCard"}),i=r.className,l=r.raised,u=void 0!==l&&l,d=(0,a.Z)(r,f),p=(0,t.Z)({},r,{raised:u}),v=function(e){var n=e.classes;return(0,s.Z)({root:["root"]},h,n)}(p);return(0,m.jsx)(x,(0,t.Z)({className:(0,o.Z)(v.root,i),elevation:u?8:void 0,ref:n,ownerState:p},d))}))},94469:function(e,n,r){var t=r(4942),a=r(63366),i=r(87462),o=r(47313),s=r(83061),l=r(21921),c=r(28334),u=r(91615),d=r(25673),p=r(32530),h=r(70501),m=r(77342),f=r(17592),x=r(85560),v=r(63909),Z=r(91554),b=r(19860),g=r(46417),w=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],k=(0,f.ZP)(Z.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,n){return n.backdrop}})({zIndex:-1}),j=(0,f.ZP)(d.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,n){return n.root}})({"@media print":{position:"absolute !important"}}),y=(0,f.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,n){var r=e.ownerState;return[n.container,n["scroll".concat((0,u.Z)(r.scroll))]]}})((function(e){var n=e.ownerState;return(0,i.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===n.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===n.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),C=(0,f.ZP)(h.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,n){var r=e.ownerState;return[n.paper,n["scrollPaper".concat((0,u.Z)(r.scroll))],n["paperWidth".concat((0,u.Z)(String(r.maxWidth)))],r.fullWidth&&n.paperFullWidth,r.fullScreen&&n.paperFullScreen]}})((function(e){var n=e.theme,r=e.ownerState;return(0,i.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===r.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===r.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!r.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===r.maxWidth&&(0,t.Z)({maxWidth:"px"===n.breakpoints.unit?Math.max(n.breakpoints.values.xs,444):"max(".concat(n.breakpoints.values.xs).concat(n.breakpoints.unit,", 444px)")},"&.".concat(x.Z.paperScrollBody),(0,t.Z)({},n.breakpoints.down(Math.max(n.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),r.maxWidth&&"xs"!==r.maxWidth&&(0,t.Z)({maxWidth:"".concat(n.breakpoints.values[r.maxWidth]).concat(n.breakpoints.unit)},"&.".concat(x.Z.paperScrollBody),(0,t.Z)({},n.breakpoints.down(n.breakpoints.values[r.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),r.fullWidth&&{width:"calc(100% - 64px)"},r.fullScreen&&(0,t.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(x.Z.paperScrollBody),{margin:0,maxWidth:"100%"}))})),S=o.forwardRef((function(e,n){var r=(0,m.Z)({props:e,name:"MuiDialog"}),t=(0,b.Z)(),d={enter:t.transitions.duration.enteringScreen,exit:t.transitions.duration.leavingScreen},f=r["aria-describedby"],Z=r["aria-labelledby"],S=r.BackdropComponent,W=r.BackdropProps,P=r.children,_=r.className,E=r.disableEscapeKeyDown,N=void 0!==E&&E,D=r.fullScreen,M=void 0!==D&&D,B=r.fullWidth,U=void 0!==B&&B,I=r.maxWidth,R=void 0===I?"sm":I,F=r.onBackdropClick,T=r.onClose,L=r.open,q=r.PaperComponent,A=void 0===q?h.Z:q,z=r.PaperProps,O=void 0===z?{}:z,Y=r.scroll,G=void 0===Y?"paper":Y,K=r.TransitionComponent,$=void 0===K?p.Z:K,X=r.transitionDuration,H=void 0===X?d:X,J=r.TransitionProps,Q=(0,a.Z)(r,w),V=(0,i.Z)({},r,{disableEscapeKeyDown:N,fullScreen:M,fullWidth:U,maxWidth:R,scroll:G}),ee=function(e){var n=e.classes,r=e.scroll,t=e.maxWidth,a=e.fullWidth,i=e.fullScreen,o={root:["root"],container:["container","scroll".concat((0,u.Z)(r))],paper:["paper","paperScroll".concat((0,u.Z)(r)),"paperWidth".concat((0,u.Z)(String(t))),a&&"paperFullWidth",i&&"paperFullScreen"]};return(0,l.Z)(o,x.D,n)}(V),ne=o.useRef(),re=(0,c.Z)(Z),te=o.useMemo((function(){return{titleId:re}}),[re]);return(0,g.jsx)(j,(0,i.Z)({className:(0,s.Z)(ee.root,_),closeAfterTransition:!0,components:{Backdrop:k},componentsProps:{backdrop:(0,i.Z)({transitionDuration:H,as:S},W)},disableEscapeKeyDown:N,onClose:T,open:L,ref:n,onClick:function(e){ne.current&&(ne.current=null,F&&F(e),T&&T(e,"backdropClick"))},ownerState:V},Q,{children:(0,g.jsx)($,(0,i.Z)({appear:!0,in:L,timeout:H,role:"presentation"},J,{children:(0,g.jsx)(y,{className:(0,s.Z)(ee.container),onMouseDown:function(e){ne.current=e.target===e.currentTarget},ownerState:V,children:(0,g.jsx)(C,(0,i.Z)({as:A,elevation:24,role:"dialog","aria-describedby":f,"aria-labelledby":re},O,{className:(0,s.Z)(ee.paper,O.className),ownerState:V,children:(0,g.jsx)(v.Z.Provider,{value:te,children:P})}))})}))}))}));n.Z=S},63909:function(e,n,r){var t=r(47313).createContext({});n.Z=t},85560:function(e,n,r){r.d(n,{D:function(){return i}});var t=r(77430),a=r(32298);function i(e){return(0,a.Z)("MuiDialog",e)}var o=(0,t.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);n.Z=o},97747:function(e,n,r){r.d(n,{E:function(){return a},Z:function(){return i}});var t=r(47313),a={LOADING:"loading",SUCCESS:"success"},i=function(e){var n=e.mode,r=void 0===n?a.LOADING:n,i=e.size,o=void 0===i?128:i,s=e.breathingEllipsis,l=void 0===s||s,c=e.collapseFactor,u=void 0===c?1:c,d=e.successColor,p=void 0===d?"limegreen":d,h=e.baseColor,m=void 0===h?"gray":h,f=116,x=f-f*(.33*u),v=(0,t.useState)(f),Z=v[0],b=v[1],g=(0,t.useState)(!0),w=g[0],k=g[1],j=(0,t.useState)("decrease"),y=j[0],C=j[1],S=(0,t.useState)(40),W=S[0],P=S[1],_=r===a.LOADING&&(l||Z>x)||r===a.SUCCESS&&Z>x,E=function(){"increase"===y?Z<f?b(Z+1):(C("decrease"),b(Z-1)):Z>x?b(Z-1):(C("increase"),b(Z+1))};(0,t.useEffect)((function(){setTimeout((function(){k(!1)}),300)}),[]),(0,t.useEffect)((function(){setTimeout((function(){!w&&_&&(r===a.SUCCESS&&(C("decrease"),P(10)),E())}),W)}),[Z,w]),(0,t.useEffect)((function(){!w&&_&&(40!==W&&P(40),E())}),[r]);var N="rotate",D=r===a.SUCCESS?p:m,M={width:o,height:o};return t.createElement("div",{style:M,className:"checkMarkContainer"},t.createElement("svg",{viewBox:"0 0 256 256"},t.createElement("g",{stroke:D,fill:"none",strokeWidth:"6"},t.createElement("circle",{cx:"128",cy:"128",r:f}),t.createElement("ellipse",{className:N+" e1",cx:"128",cy:"128",rx:Z,ry:f}),t.createElement("ellipse",{className:N+" e2",cx:"128",cy:"128",rx:Z,ry:f}),t.createElement("ellipse",{className:N+" e3",cx:"128",cy:"128",rx:Z,ry:f}),t.createElement("ellipse",{className:N+" e4",cx:"128",cy:"128",rx:Z,ry:f})),t.createElement("g",{stroke:D,fill:"none",strokeWidth:"8"},r===a.SUCCESS&&Z<x&&t.createElement("path",{className:"icon",d:"M 75 130 L 110 170 L 175 90"}))))}}}]);