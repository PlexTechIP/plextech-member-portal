"use strict";(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[791],{17762:function(e,n,t){t.d(n,{E:function(){return u}});var r=t(63681),i=t(41727),s=t(47131),a=(t(47313),t(83965)),o=t(46417);function u(e){return(0,o.jsx)("form",{style:{width:"100%"},children:(0,o.jsx)(r.Z,{variant:"outlined",onChange:function(n){return e.onChange(n.target.value)},value:e.comment,label:e.message,fullWidth:!0,InputProps:{endAdornment:(0,o.jsx)(i.Z,{position:"end",children:(0,o.jsx)(s.Z,{onClick:e.onSubmit,type:"submit",children:(0,o.jsx)(a.Z,{})})})}})})}},6465:function(e,n,t){t.d(n,{A:function(){return u}});var r=t(94469),i=t(33604),s=t(4117),a=t(69099),o=(t(47313),t(46417));function u(e){return(0,o.jsxs)(r.Z,{onClose:e.onClose,open:e.open,PaperProps:{style:{borderRadius:"24px",padding:"24px"}},children:[(0,o.jsxs)(i.Z,{children:["Are you sure you want to delete this ",e.item,"?"]}),(0,o.jsxs)(s.Z,{children:[(0,o.jsx)(a.Z,{onClick:e.onClose,children:"Cancel"}),(0,o.jsx)(a.Z,{onClick:e.onDelete,variant:"contained",children:"Delete"})]})]})}},63931:function(e,n,t){t.d(n,{C:function(){return g}});var r,i,s,a,o=t(30168),u=t(42832),c=t(47131),d=t(70501),l=t(25673),p=t(47313),m=t(96694),Z=t(53115),f=t(32094),x=t(85979),h=t(46417);function g(e){return(0,p.useEffect)((function(){console.warn(e.error)})),(0,h.jsx)(w,{open:e.open,children:(0,h.jsx)(v,{children:(0,h.jsxs)(u.Z,{spacing:2,children:[(0,h.jsxs)(u.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,h.jsxs)(j,{children:["Error",e.error.errorCode&&" ".concat(e.error.errorCode),":"," ",e.error.errorMessage]}),(0,h.jsx)(c.Z,{onClick:function(){window.location.reload()},children:(0,h.jsx)(f.Z,{})})]}),(0,h.jsxs)(b,{children:["Try refreshing the page and contact"," ",(0,h.jsx)("a",{href:"mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]",children:"shamith09@berkeley.edu"})," ","if the issue persists."]}),(0,h.jsx)("img",{src:x.Uf,alt:"error"})]})})})}var v=(0,m.Z)(d.Z)(r||(r=(0,o.Z)(["\n  padding: 48px;\n  border-radius: 48px;\n"]))),j=Z.ZP.h1(i||(i=(0,o.Z)(["\n  margin: 0px;\n"]))),b=Z.ZP.p(s||(s=(0,o.Z)(["\n  margin: 0px;\n"]))),w=(0,Z.ZP)(l.Z)(a||(a=(0,o.Z)(["\n  width: 50%;\n  min-width: 500px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 64px;\n"])))},5662:function(e,n,t){t.d(n,{F:function(){return a}});t(47313);var r=t(97747),i=t(94469),s=t(46417);function a(e){return setTimeout((function(){e.onClose()}),4e3),(0,s.jsx)(i.Z,{onClose:e.onClose,open:e.open,PaperProps:{style:{borderRadius:"48px",padding:"48px"}},children:(0,s.jsx)(r.Z,{mode:r.E.SUCCESS})})}},98727:function(e,n,t){t.r(n),t.d(n,{CategoriesPage:function(){return Z},categories:function(){return m}});var r=t(74165),i=t(15861),s=t(1413),a=t(29439),o=t(47313),u=t(65964),c=t(10658),d=t.n(c),l=t(45439),p=t(46417),m=["NMEP"];function Z(e){var n=(0,o.useState)({pendingReview:[],underReview:[],errors:[],approved:[],paid:[]}),t=(0,a.Z)(n,2),c=t[0],m=t[1],Z=(0,o.useState)(!1),f=(0,a.Z)(Z,2),x=f[0],h=f[1],g=function(e){return(0,s.Z)((0,s.Z)({},e),{},{amount:e.amount.toFixed(2),date:d()(e.date)})};return(0,o.useEffect)((function(){var e=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var n,t,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,l.N)("/requests/","GET");case 2:n=e.sent,t=(0,a.Z)(n,2),i=t[1],h(i.treasurer),delete i.treasurer,delete i.firstName,delete i.lastName,m({pendingReview:i.pendingReview.map(g),underReview:i.underReview.map(g),errors:i.errors.map(g),approved:i.approved.map(g),paid:i.paid.map(g)});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[e]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(u.ql,{children:[(0,p.jsx)("title",{children:"Categories"}),(0,p.jsx)("meta",{name:"description",content:"Your finance dashboard"})]}),x?Object.values(c.pendingReview.reduce((function(e,n){var t=n.team_budget;return e[t]=(e[t]||0)+Number(n.amount),e}),{})).map((function(e,n){return(0,p.jsx)("p",{children:"Total amount for category ".concat(c.pendingReview[n].team_budget,": $").concat(e.toFixed(2))},n)})):(0,p.jsx)("p",{children:"You do not have access to this section."})]})}},89425:function(e,n,t){t.r(n),t.d(n,{HomePage:function(){return zn}});var r,i,s,a,o,u,c,d,l,p=t(30168),m=t(93433),Z=t(74165),f=t(15861),x=t(1413),h=t(29439),g=t(47313),v=t(65964),j=t(53115),b=t(42832),w=t(25673),q=t(85281),C=t(4942),k=t(61689),y=t(69099),R=t(70501),P=t(96694),S=t(19860),E=t(73428),_=t(65954),N=t(54572),I=t(32265),F=t(91210),A=t(47131),T=t(73984),D=t(56854),Y=t(11198),M=t(47196),L=t(46417);function B(e){return(0,L.jsx)(K,{open:e.open,onClose:e.onClose,children:(0,L.jsxs)(ee,{children:[(0,L.jsxs)(W,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,L.jsxs)(ne,{children:["Receipts for ",e.itemDescription]}),(0,L.jsx)(A.Z,{onClick:e.onClose,children:(0,L.jsx)(Y.Z,{})})]}),e.loading?(0,L.jsx)(te,{}):(0,L.jsx)(L.Fragment,{children:e.images&&(0,L.jsx)(T.Z,{cols:3,rowHeight:300,style:{height:"100%"},children:e.images.map((function(e){return(0,L.jsx)(D.Z,{cols:1,children:(0,L.jsx)("a",{download:e.name,href:e.data,children:(0,L.jsx)(Q,{src:e.data,alt:"receipt",loading:"lazy"})})},e.name)}))})}),(0,L.jsx)(J,{children:(0,L.jsxs)(b.Z,{direction:"row",alignItems:"center",spacing:1,children:[(0,L.jsx)(X,{}),(0,L.jsx)(V,{children:"Click on an image to download it."})]})})]})})}var z,U,$,H,O,G,V=j.ZP.p(r||(r=(0,p.Z)(["\n  color: grey;\n  margin: 0px;\n"]))),X=(0,P.Z)(M.Z)(i||(i=(0,p.Z)(["\n  color: grey;\n  font-size: small;\n"]))),K=(0,j.ZP)(w.Z)(s||(s=(0,p.Z)(["\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 64px;\n"]))),W=(0,P.Z)(b.Z)(a||(a=(0,p.Z)(["\n  width: 100%;\n  margin-bottom: 24px;\n"]))),J=j.ZP.div(o||(o=(0,p.Z)(["\n  position: absolute;\n  bottom: 108px;\n"]))),Q=j.ZP.img(u||(u=(0,p.Z)(["\n  max-width: 100%;\n  max-height: 100%;\n  filter: brightness(100%);\n  -webkit-filter: brightness(100%);\n  &:hover {\n    filter: brightness(75%);\n    -webkit-filter: brightness(75%);\n  }\n  -webkit-transition: all 0.25s ease;\n  -moz-transition: all 0.25s ease;\n  -o-transition: all 0.25s ease;\n  -ms-transition: all 0.25s ease;\n  transition: all 0.25s ease;\n"]))),ee=(0,P.Z)(R.Z)(c||(c=(0,p.Z)(["\n  padding: 48px;\n  border-radius: 48px;\n  height: 100%;\n"]))),ne=j.ZP.h1(d||(d=(0,p.Z)(["\n  margin: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"]))),te=(0,P.Z)(q.Z)(l||(l=(0,p.Z)(["\n  color: rgb(255, 138, 0);\n"]))),re=t(70022),ie=t(63931),se=t(45439);function ae(e){var n=(0,g.useState)(!1),t=(0,h.Z)(n,2),r=t[0],i=t[1],s=(0,g.useState)([]),a=(0,h.Z)(s,2),o=a[0],u=a[1],c=(0,g.useState)(),d=(0,h.Z)(c,2),l=d[0],p=d[1],m=(0,g.useState)(!1),v=(0,h.Z)(m,2),j=v[0],w=v[1],q=function(){i(!1)},C=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(){var t,r,s,a;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return w(!0),i(!0),n.next=4,(0,se.N)("/requests/","PUT",{images:!0,request_id:e.request.id});case 4:if(t=n.sent,r=(0,h.Z)(t,2),s=r[0],a=r[1],s){n.next=11;break}return p(a.error),n.abrupt("return");case 11:u(a.images),w(!1);case 13:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),R=(0,S.Z)();return(0,L.jsx)(re._l,{draggableId:e.request.id,index:e.index,children:function(n){var t;return(0,L.jsxs)(de,(0,x.Z)((0,x.Z)((0,x.Z)({elevation:2},n.draggableProps),n.dragHandleProps),{},{ref:n.innerRef,children:[l&&(0,L.jsx)(ie.C,{open:!!l,error:l}),r&&(0,L.jsx)(B,{images:o,onClose:q,open:r,itemDescription:e.request.item_description,loading:j}),(0,L.jsxs)(b.Z,{spacing:1,children:[(0,L.jsxs)(pe,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,L.jsx)(le,{children:e.request.item_description}),(0,L.jsxs)(le,{style:{flexShrink:0,paddingLeft:"8px"},children:["$",e.request.amount]})]}),(0,L.jsxs)(b.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.mine?(0,L.jsx)(y.Z,{size:"small",startIcon:g.cloneElement((0,L.jsx)(N.Z,{})),onClick:C,style:{color:R.palette.text.primary},children:"Receipt(s)"}):(0,L.jsxs)(b.Z,{direction:"row",spacing:1,children:[(0,L.jsx)(k.Z,{title:"Filter requests by ".concat(e.request.first_name),children:(0,L.jsxs)(me,{onClick:e.onClickName,children:[e.request.first_name," ",null===(t=e.request.last_name)||void 0===t?void 0:t.charAt(0)]})}),!e.request.bank_set&&(0,L.jsx)(k.Z,{title:"Bank info not set",children:(0,L.jsx)(me,{style:{color:"red"},children:"!"})})]}),e.request.comments.length>0&&(0,L.jsxs)(Ze,{direction:"row",spacing:1,onClick:function(){return e.onEdit(e.mine)},alignItems:"center",children:[(0,L.jsx)(I.Z,{fontSize:"small"}),(0,L.jsx)(fe,{children:e.request.comments.length})]}),(0,L.jsx)(y.Z,{style:{color:R.palette.text.primary,zIndex:999},size:"small",startIcon:g.cloneElement(e.mine?(0,L.jsx)(_.Z,{}):(0,L.jsx)(F.Z,{})),onClick:function(){return e.onEdit(e.mine)},disabled:!1,children:e.mine?"Edit":"View"})]})]})]}),e.request.id)}})}var oe,ue,ce,de=(0,P.Z)(E.Z)(z||(z=(0,p.Z)(["\n  padding: 16px;\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  border-radius: 16px;\n  width: 100%;\n"]))),le=j.ZP.h3(U||(U=(0,p.Z)(["\n  margin: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"]))),pe=(0,j.ZP)(b.Z)($||($=(0,p.Z)(["\n  width: 100%;\n"]))),me=j.ZP.p(H||(H=(0,p.Z)(["\n  margin: 0;\n  overflow: hidden;\n"]))),Ze=(0,j.ZP)(b.Z)(O||(O=(0,p.Z)(["\n  color: grey;\n"]))),fe=j.ZP.p(G||(G=(0,p.Z)(["\n  margin: 0;\n  overflow: hidden;\n  font-size: 12px;\n"]))),xe=t(5211),he=t(7861),ge=t(14313),ve=t(41727),je=t(24537),be=t(63681),we=t(17762);function qe(e){var n=e.id,t=e.comment;return(0,L.jsxs)(Ee,{style:{alignSelf:n===t.user_id?"flex-end":"flex-start",borderBottomLeftRadius:n===t.user_id?"24px":"0",borderBottomRightRadius:n===t.user_id?"0":"24px",backgroundColor:n===t.user_id?"rgba(255, 138, 0, 0.3)":"white"},children:[(0,L.jsxs)(b.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,L.jsxs)(_e,{children:[t.first_name," ",t.last_name]}),(0,L.jsx)(_e,{children:t.date.format("MM/DD/YYYY")})]}),(0,L.jsx)(Ne,{children:t.message})]})}var Ce,ke,ye,Re,Pe,Se,Ee=(0,P.Z)(E.Z)(oe||(oe=(0,p.Z)(["\n  width: 50%;\n  padding: 16px;\n  border-top-right-radius: 24px;\n  border-top-left-radius: 24px;\n"]))),_e=j.ZP.h4(ue||(ue=(0,p.Z)(["\n  margin: 0;\n"]))),Ne=j.ZP.p(ce||(ce=(0,p.Z)(["\n  margin: 0;\n  color: grey;\n"]))),Ie=t(10658),Fe=t.n(Ie),Ae=t(45279);function Te(e){var n=(0,g.useState)(0),t=(0,h.Z)(n,2),r=t[0],i=t[1];(0,g.useEffect)((function(){i(e.requestedAmount)}),[e.requestedAmount]);var s=(0,g.useState)([]),a=(0,h.Z)(s,2),o=a[0],u=a[1],c=(0,g.useState)(""),d=(0,h.Z)(c,2),l=d[0],p=d[1];return(0,L.jsx)(Le,{open:e.open,onClose:e.onClose,children:(0,L.jsx)(Be,{children:(0,L.jsxs)(b.Z,{spacing:3,children:[(0,L.jsx)(ze,{children:"Reimbursement Request Approval"}),(0,L.jsx)(ge.Z,{}),(0,L.jsx)(Ue,{children:"How much do you want to approve this request for?"}),(0,L.jsxs)(b.Z,{direction:"row",alignItems:"center",spacing:2,children:[(0,L.jsx)(Me,{variant:"outlined",type:"number",value:r,label:"Amount",InputProps:{startAdornment:(0,L.jsx)(ve.Z,{position:"start",children:"$"})},required:!0,onChange:function(e){var n=e.target;return i(n.value)}}),(0,L.jsx)(y.Z,{variant:"text",onClick:function(){return i(e.requestedAmount)},children:"Reset"})]}),(0,L.jsx)(je.ZP,{defaultValue:100,value:Math.round(r/e.requestedAmount*100),step:5,min:0,max:100,onChange:function(n){var t=n.target;return i(+(e.requestedAmount/100*t.value).toFixed(2))},valueLabelDisplay:"auto",marks:[{value:0,label:"0%"},{value:50,label:"50%"},{value:100,label:"100%"}],style:{marginLeft:"8px",marginRight:"8px",marginBottom:"24px"}}),(0,L.jsx)(ge.Z,{}),(0,Ae.LP)()&&[].concat((0,m.Z)(o),[{message:"Request approved for $".concat(r," (").concat(Math.round(r/e.requestedAmount*100),"%)"),date:Fe()(),user_id:(0,he.Z)((0,Ae.LP)()).sub,first_name:e.userName.firstName,last_name:e.userName.lastName}]).map((function(e,n){return(0,L.jsx)(qe,{id:(0,he.Z)((0,Ae.LP)()).sub,comment:e},n)})).sort(),(0,L.jsx)(we.E,{comment:l,message:"Add Comment",onChange:function(e){return p(e)},onSubmit:function(n){n.preventDefault(),u((function(n){return[].concat((0,m.Z)(n),[{message:l,date:Fe()(),user_id:(0,he.Z)((0,Ae.LP)()).sub,first_name:e.userName.firstName,last_name:e.userName.lastName}])}))}}),(0,L.jsxs)($e,{direction:"row",justifyContent:"space-between",children:[(0,L.jsx)(y.Z,{variant:"contained",onClick:function(){u([]),e.onSubmit(o,r)},type:"submit",children:"Approve"}),(0,L.jsx)(y.Z,{variant:"contained",onClick:function(){e.onClose()},children:"Cancel"})]})]})})})}var De,Ye,Me=(0,j.ZP)(be.Z)(Ce||(Ce=(0,p.Z)(["\n  width: 40%;\n"]))),Le=(0,j.ZP)(w.Z)(ke||(ke=(0,p.Z)(["\n  width: 50%;\n  min-height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 64px;\n"]))),Be=(0,P.Z)(R.Z)(ye||(ye=(0,p.Z)(["\n  padding: 48px;\n  border-radius: 48px;\n  min-height: 100%;\n"]))),ze=j.ZP.h1(Re||(Re=(0,p.Z)(["\n  margin: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"]))),Ue=j.ZP.h3(Pe||(Pe=(0,p.Z)(["\n  margin: 0px;\n"]))),$e=(0,j.ZP)(b.Z)(Se||(Se=(0,p.Z)(["\n  width: 100%;\n"]))),He=t(94469),Oe=t(4117),Ge=t(5662);function Ve(e){var n=(0,g.useState)(""),t=(0,h.Z)(n,2),r=t[0],i=t[1],s=(0,g.useState)(),a=(0,h.Z)(s,2),o=a[0],u=a[1],c=(0,g.useState)(!1),d=(0,h.Z)(c,2),l=d[0],p=d[1],m=function(){var e=(0,f.Z)((0,Z.Z)().mark((function e(){var n,t,i,s;return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,se.N)("/approval/_/","POST",{code:r});case 2:if(n=e.sent,t=(0,h.Z)(n,2),i=t[0],s=t[1],i){e.next=9;break}return u(s.error),e.abrupt("return");case 9:p(!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,L.jsxs)(L.Fragment,{children:[o&&(0,L.jsx)(ie.C,{error:o,open:!!o}),(0,L.jsx)(He.Z,{onClose:function(){return e.onClose(!1)},open:e.open,PaperProps:{style:{borderRadius:"48px",padding:"48px"}},children:l?(0,L.jsx)(Ge.F,{open:l,onClose:function(){return e.onClose(!0)}}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(b.Z,{spacing:3,children:[(0,L.jsx)(We,{children:"Reimbursement Request Approval"}),(0,L.jsx)(ge.Z,{}),(0,L.jsx)(Je,{children:"An MFA code has been sent from BlueVine. Please enter the code below to approve the reimbursement request."}),(0,L.jsx)(be.Z,{label:"MFA Code",variant:"outlined",value:r,onChange:function(e){return i(e.target.value)}})]}),(0,L.jsxs)(Oe.Z,{children:[(0,L.jsx)(y.Z,{onClick:function(){return e.onClose(!1)},children:"Cancel"}),(0,L.jsx)(y.Z,{onClick:m,variant:"contained",children:"Submit"})]})]})})]})}var Xe,Ke,We=j.ZP.h1(De||(De=(0,p.Z)(["\n  margin: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"]))),Je=j.ZP.h3(Ye||(Ye=(0,p.Z)(["\n  margin: 0px;\n"]))),Qe=t(28862),en=["pendingReview","underReview","errors","approved","paid"];function nn(e){var n=(0,g.useState)({pendingReview:0,underReview:0,errors:0,approved:0,paid:0}),t=(0,h.Z)(n,2),r=t[0],i=t[1],s=(0,g.useState)(),a=(0,h.Z)(s,2),o=a[0],u=a[1],c=(0,g.useState)(!1),d=(0,h.Z)(c,2),l=d[0],p=d[1],m=(0,g.useState)(0),v=(0,h.Z)(m,2),j=v[0],w=v[1],q=(0,g.useState)(""),R=(0,h.Z)(q,2),P=R[0],S=R[1],E=(0,g.useState)(""),_=(0,h.Z)(E,2),N=_[0],I=_[1],F=(0,g.useState)(0),A=(0,h.Z)(F,2),T=A[0],D=A[1],Y=(0,g.useState)(0),M=(0,h.Z)(Y,2),B=M[0],z=M[1],U=(0,g.useState)(!1),$=(0,h.Z)(U,2),H=$[0],O=$[1],G=(0,g.useState)(),V=(0,h.Z)(G,2),X=V[0],K=V[1];(0,g.useEffect)((function(){var n={pendingReview:0,underReview:0,errors:0,approved:0,paid:0};e.requests&&(en.forEach((function(t){e.requests[t].forEach((function(e){return n[t]+=parseFloat(e.amount)}))})),i(n))}),[e.requests]);var W=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(t){var r,s,a,o,c,d,l;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=t.destination,s=t.source,null!==r&&r.droppableId!==s.droppableId&&e.isTreasurer){n.next=3;break}return n.abrupt("return");case 3:if(a=e.requests[s.droppableId][s.index],"approved"!==r.droppableId){n.next=12;break}return p(!0),w(a.amount),S(a.id),I(s.droppableId),D(s.index),z(r.index),n.abrupt("return");case 12:return e.requests[s.droppableId].splice(s.index,1),e.requests[r.droppableId].splice(r.index,0,a),i((function(e){var n;return(0,x.Z)((0,x.Z)({},e),{},(n={},(0,C.Z)(n,s.droppableId,e[s.droppableId]-parseFloat(a.amount)),(0,C.Z)(n,r.droppableId,e[r.droppableId]+parseFloat(a.amount)),n))})),n.next=17,(0,se.N)("/approval/".concat(a.id,"/"),"PUT",{status:r.droppableId,comments:[]});case 17:if(o=n.sent,c=(0,h.Z)(o,2),d=c[0],l=c[1],d){n.next=24;break}return u(l.error),n.abrupt("return");case 24:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),J=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(t,r){var s,a,o,c,d;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,se.N)("/approval/".concat(P,"/"),"PUT",{status:"approved",comments:t,amount:r});case 2:if(s=n.sent,a=(0,h.Z)(s,2),o=a[0],c=a[1],o){n.next=12;break}if(407!==c.status){n.next=10;break}return u({errorMessage:"User has not set payment information."}),n.abrupt("return");case 10:return u(c.error),n.abrupt("return");case 12:d=e.requests[N].splice(T,1)[0],K(d),e.requests.approved.splice(B,0,d),i((function(e){var n;return(0,x.Z)((0,x.Z)({},e),{},(n={},(0,C.Z)(n,N,e[N]-parseFloat(d.amount)),(0,C.Z)(n,"approved",e.approved+parseFloat(r)),n))})),p(!1),O(!0);case 18:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();return(0,L.jsxs)(L.Fragment,{children:[o&&(0,L.jsx)(ie.C,{open:!!o,error:o}),(0,L.jsx)(Te,{open:l,onClose:function(){return p(!1)},requestedAmount:j,onSubmit:J,userName:e.userName}),H&&(0,L.jsx)(Ve,{open:H,onClose:function(n){O(!1),n&&(e.requests.approved=e.requests.approved.filter((function(e){return e.id!==X.id})),e.requests.paid.splice(0,0,X),i((function(e){return(0,x.Z)((0,x.Z)({},e),{},{approved:e.approved-parseFloat(X.amount),paid:e.paid+parseFloat(X.amount)})})))}}),(0,L.jsx)(re.Z5,{onDragEnd:W,children:(0,L.jsx)(b.Z,{direction:"row",spacing:1,children:en.map((function(n){var t=n.replace(/([A-Z])/g," $1"),s=t.charAt(0).toUpperCase()+t.slice(1);return(0,L.jsxs)(ln,{style:"approved"===n?{border:"2px solid rgb(255, 138, 0)"}:{},children:[(0,L.jsxs)(b.Z,{direction:"row",justifyContent:"center",alignItems:"center",style:{paddingBottom:"16px"},gap:1,children:[(0,L.jsxs)(pn,{children:[s,e.requests&&0!==e.requests[n].length&&"approved"!==n?": $".concat(r[n].toFixed(2)):""]}),"approved"===n&&(0,L.jsx)(k.Z,{title:"Moving a request here will pay it through Bluevine, then move it to Paid.",children:(0,L.jsx)(Qe.Z,{style:{cursor:"pointer",color:"grey"},fontSize:"small"})})]}),(0,L.jsxs)(b.Z,{spacing:1,children:["pendingReview"===n&&null!==e.requests&&(0,L.jsx)(y.Z,{startIcon:g.cloneElement((0,L.jsx)(xe.Z,{})),onClick:e.onRequest,children:"Request Reimbursement"}),(0,L.jsx)(re.bK,{droppableId:n,children:function(t){return(0,L.jsxs)(b.Z,(0,x.Z)((0,x.Z)({spacing:1,ref:t.innerRef},t.droppableProps),{},{children:[e.requests&&("paid"!==n?e.requests[n].sort((function(e,n){return n.amount-e.amount})):e.requests[n]).map((function(n,t){return(0,L.jsx)(ae,{request:n,index:t,onEdit:function(t){return e.onEdit(n,t)},mine:!e.isTreasurer||n.user_id===(0,he.Z)((0,Ae.LP)()).sub,onClickName:function(){return function(n){e.refreshRequests(n.user_id);var t={pendingReview:0,underReview:0,errors:0,approved:0,paid:0};e.requests&&(en.forEach((function(n){e.requests[n].forEach((function(e){return t[n]+=parseFloat(e.amount)}))})),i(t))}(n)}},n.id)})),t.placeholder]}))}})]})]},n)}))})})]})}var tn,rn,sn,an,on,un,cn,dn,ln=(0,P.Z)(R.Z)(Xe||(Xe=(0,p.Z)(["\n  width: calc(20% - 8px);\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n  border-radius: 24px;\n"]))),pn=j.ZP.h2(Ke||(Ke=(0,p.Z)(["\n  margin: 0px;\n"]))),mn=t(1550),Zn=t(5178),fn=t(55685),xn=t(83929),hn=t(74268),gn=t(51997),vn=t(26719),jn=t.n(vn),bn=t(6465),wn=t(98727),qn=t(36059),Cn={item_description:"",amount:"",team_budget:"",is_food:!1,images:[],status:"pendingReview",comments:[]};function kn(e){var n,t,r,i=(0,g.useState)(Cn),s=(0,h.Z)(i,2),a=s[0],o=s[1],u=(0,g.useState)(!1),c=(0,h.Z)(u,2),d=c[0],l=c[1],p=(0,g.useState)(!1),v=(0,h.Z)(p,2),j=v[0],w=v[1],q=(0,g.useState)(!1),C=(0,h.Z)(q,2),k=C[0],R=C[1],P=(0,g.useState)(!1),S=(0,h.Z)(P,2),E=S[0],_=S[1],I=(0,g.useState)(!1),F=(0,h.Z)(I,2),T=F[0],D=F[1],M=(0,g.useState)(""),z=(0,h.Z)(M,2),U=z[0],$=z[1],H=(0,g.useState)([]),O=(0,h.Z)(H,2),G=O[0],V=O[1],X=(0,g.useState)(!1),K=(0,h.Z)(X,2),W=K[0],J=K[1];(0,g.useEffect)((function(){if(e.request){var n=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(){var t,r,i,s;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return J(!0),n.next=3,(0,se.N)("/requests/","PUT",{comment:!0,request_id:e.request?e.request.id:null});case 3:if(t=n.sent,r=(0,h.Z)(t,2),i=r[0],s=r[1],i){n.next=10;break}return e.onError(s.error),n.abrupt("return");case 10:return J(!1),o((0,x.Z)((0,x.Z)({},e.request),{},{amount:e.request.amount.toString(),comments:s.comments.map((function(e){return(0,x.Z)((0,x.Z)({},e),{},{date:Fe()(e.date)})})),images:[]})),n.next=14,oe();case 14:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}else Q()}),[]);var Q=function(){o((0,x.Z)((0,x.Z)({},Cn),{},{comments:[]}))},ee=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(t){var r;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.target.files[0]){n.next=2;break}return n.abrupt("return");case 2:_(!0),(r=(0,m.Z)(t.target.files)).forEach((function(n,t){"application/pdf"!==n.type?new(jn())(n,{quality:.2,success:function(e){o((function(n){return(0,x.Z)((0,x.Z)({},n),{},{images:[].concat((0,m.Z)(n.images),[{name:e.name,data:e,isBase64:!1}])})})),t===r.length-1&&_(!1)},error:function(n){e.onError({errorMessage:"Image compression failed"})}}):o((function(e){return(0,x.Z)((0,x.Z)({},e),{},{images:[].concat((0,m.Z)(e.images),[{name:n.name,data:n,isBase64:!1}])})}))})),_(!1);case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),ne=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(){return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:R(!1),(0,se.N)("/requests/","DELETE",{id:e.request.id}),e.onClose(),e.onSubmit(e.request,!0);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),te=function(e){return new Promise((function(n){var t="",r=new FileReader;r.readAsDataURL(e),r.onload=function(){t=r.result,n(t)}}))},re=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(t){var r,i,s,o,u;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),!(j||""===a.amount||""===a.item_description||e.receiptRequired&&0===a.images.length||E||""===a.team_budget)){n.next=4;break}return l(!0),n.abrupt("return");case 4:return w(!0),n.t0=x.Z,n.t1=(0,x.Z)({},a),n.t2={},n.next=10,Promise.all(a.images.map(function(){var e=(0,f.Z)((0,Z.Z)().mark((function e(n){return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.isBase64){e.next=8;break}return e.t1=n.name,e.next=4,te(n.data);case 4:e.t2=e.sent,e.t0={name:e.t1,data:e.t2,isBase64:!0},e.next=9;break;case 8:e.t0=n;case 9:return e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()));case 10:return n.t3=n.sent,n.t4=parseFloat(a.amount),n.t5={images:n.t3,amount:n.t4},r=(0,n.t0)(n.t1,n.t2,n.t5),n.next=16,(0,se.N)("/requests/",e.request?"PUT":"POST",(0,x.Z)((0,x.Z)((0,x.Z)({},r),{},{date:Fe()()},e.userName),{},{request_id:e.request?e.request.id:null}));case 16:if(i=n.sent,s=(0,h.Z)(i,2),o=s[0],u=s[1],o){n.next=23;break}return e.onError(u.error),n.abrupt("return");case 23:Q(),l(!1),e.onClose(),e.onSubmit((0,x.Z)((0,x.Z)({},r),{},{id:e.request?e.request.id:u.id,comments:[],date:Fe()(),user_id:e.request?e.request.user_id:(0,he.Z)((0,Ae.LP)()).sub})),qn.Am.success("Submitted!"),w(!1);case 29:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),ie=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(t){var r;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),""!==U){n.next=3;break}return n.abrupt("return");case 3:r={message:U,date:Fe()(),user_id:(0,he.Z)((0,Ae.LP)()).sub,first_name:e.userName.first_name,last_name:e.userName.last_name},a.comments.push(r),e.request&&(0,se.N)("/requests/","POST",{comment:r,request_id:e.request.id}),$("");case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),ae=function(){var e=(0,f.Z)((0,Z.Z)().mark((function e(){return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return J(!0),D(!0),e.next=4,oe();case 4:J(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),oe=function(){var n=(0,f.Z)((0,Z.Z)().mark((function n(){var t,r,i,s,a;return(0,Z.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,se.N)("/requests/","PUT",{images:!0,request_id:null===(t=e.request)||void 0===t?void 0:t.id});case 2:if(r=n.sent,i=(0,h.Z)(r,2),s=i[0],a=i[1],s){n.next=9;break}return e.onError(a.error),n.abrupt("return");case 9:V(a.images);case 10:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,L.jsxs)(Rn,{elevation:3,children:[(0,L.jsx)(qn.x7,{}),(0,L.jsx)(bn.A,{open:k,onClose:function(){return R(!1)},onDelete:ne,item:"request"}),(0,L.jsx)(B,{loading:W,open:T,onClose:function(){return D(!1)},images:G,itemDescription:null===(n=e.request)||void 0===n?void 0:n.item_description}),(0,L.jsxs)(Pn,{direction:"row",justifyContent:"space-between",alignItems:"center",style:{marginBottom:"16px"},children:[(0,L.jsx)(En,{children:"Reimbursement Request Form"}),e.canEdit&&e.request?(0,L.jsx)(A.Z,{onClick:function(){R(!0)},children:(0,L.jsx)(gn.Z,{fontSize:"large"})}):(0,L.jsx)(_n,{children:"*required"})]}),(0,L.jsx)("form",{children:(0,L.jsxs)(b.Z,{spacing:3,alignItems:"flex-start",children:[(0,L.jsx)(Nn,{variant:"outlined",onChange:function(e){var n=e.target;return o((function(e){return(0,x.Z)((0,x.Z)({},e),{},{item_description:n.value})}))},value:a.item_description,label:"Item Description",required:!0,error:d&&""===a.item_description,helperText:d&&""===a.item_description&&"Required",disabled:!e.canEdit}),(0,L.jsxs)(b.Z,{direction:"row",spacing:3,alignItems:"center",children:[(0,L.jsx)(be.Z,{variant:"outlined",onChange:function(e){var n=e.target;return o((function(e){return(0,x.Z)((0,x.Z)({},e),{},{amount:n.value})}))},type:"number",value:a.amount,label:"Amount",InputProps:{startAdornment:(0,L.jsx)(ve.Z,{position:"start",children:"$"})},required:!0,error:d&&""===a.amount,helperText:d&&""===a.amount&&"Required",disabled:!e.canEdit}),W&&(0,L.jsx)(In,{})]}),(0,L.jsx)(ge.Z,{}),(0,L.jsxs)(mn.Z,{children:[(0,L.jsx)(Zn.Z,{disabled:!e.canEdit,children:"Team Budget?"}),(0,L.jsxs)(fn.Z,{row:!0,"aria-labelledby":"demo-row-radio-buttons-group-label",name:"row-radio-buttons-group",onChange:function(e){var n=e.target;o((function(e){return(0,x.Z)((0,x.Z)({},e),{},{team_budget:n.value})}))},children:[wn.categories.map((function(n){return(0,L.jsx)(xn.Z,{value:n,control:(0,L.jsx)(hn.Z,{disabled:!e.canEdit}),label:n,disabled:!e.canEdit,required:!0},n)})),(0,L.jsx)(xn.Z,{value:"Miscellaneous",control:(0,L.jsx)(hn.Z,{disabled:!e.canEdit}),label:"Miscellaneous",disabled:!e.canEdit,required:!0})]})]}),(0,L.jsx)(Sn,{variant:"middle",light:!0}),(0,L.jsxs)(b.Z,{spacing:1,alignItems:"flex-start",children:[(0,L.jsxs)(b.Z,{direction:"row",alignItems:"center",spacing:3,children:[e.canEdit?(0,L.jsxs)(y.Z,{variant:"contained",component:"label",style:{color:d&&0===a.images.length&&e.receiptRequired?"red":"rgb(255, 138, 0)"},startIcon:g.cloneElement((0,L.jsx)(N.Z,{})),children:[E?(0,L.jsx)(In,{size:20}):"Upload Receipt(s) *",(0,L.jsx)("input",{accept:"image/*,application/pdf",onChange:ee,type:"file",multiple:!0,hidden:!0})]}):(0,L.jsx)(y.Z,{variant:"contained",startIcon:g.cloneElement((0,L.jsx)(N.Z,{})),onClick:ae,children:"Receipt(s)"}),(0,L.jsx)("p",{children:e.request?"Submitted ".concat(e.request.date.format("MM/DD/YYYY")," by ").concat(null===(t=e.request)||void 0===t?void 0:t.first_name," ").concat(null===(r=e.request)||void 0===r?void 0:r.last_name):Fe()().format("MM/DD/YYYY")})]}),(0,L.jsx)(ge.Z,{}),e.canEdit&&[].concat((0,m.Z)(G),(0,m.Z)(a.images)).map((function(e,n){return(0,L.jsxs)(b.Z,{direction:"row",alignItems:"center",spacing:1,children:[(0,L.jsx)(N.Z,{}),(0,L.jsx)("p",{children:e.name.length>20?"".concat(e.name.substring(0,20),"..."):e.name}),(0,L.jsx)(A.Z,{onClick:function(){return function(e){o((function(n){return(0,x.Z)((0,x.Z)({},n),{},{images:n.images.filter((function(n,t){return t!==e}))})}))}(n)},children:(0,L.jsx)(Y.Z,{})})]},n)}))]}),(0,L.jsx)(Sn,{variant:"middle",light:!0}),0===a.comments.length||(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(Fn,{children:"Comments"}),a.comments.map((function(e){return(0,L.jsx)(qe,{id:(0,he.Z)((0,Ae.LP)()).sub,comment:e},e.date.toString())})).sort(),(0,L.jsx)(Sn,{variant:"middle",light:!0})]}),(0,L.jsx)(we.E,{comment:U,onChange:$,onSubmit:ie,message:"Add Comment (optional)"}),(0,L.jsxs)(Pn,{direction:"row",justifyContent:"space-between",children:[(0,L.jsxs)(b.Z,{spacing:1,direction:"row",children:[(0,L.jsx)(y.Z,{variant:"contained",onClick:function(){Q(),e.onClose()},children:"Cancel"}),(0,L.jsx)(y.Z,{variant:"contained",onClick:Q,disabled:!e.canEdit,children:"Reset"})]}),(0,L.jsx)(y.Z,{variant:"contained",style:{backgroundColor:"rgb(255, 138, 0)",color:"white"},onClick:re,type:"submit",disabled:!e.canEdit,children:j?(0,L.jsx)(In,{size:20}):"Submit"})]})]})})]})}var yn,Rn=(0,P.Z)(R.Z)(tn||(tn=(0,p.Z)(["\n  padding: 48px;\n  border-radius: 48px;\n"]))),Pn=(0,j.ZP)(b.Z)(rn||(rn=(0,p.Z)(["\n  width: 100%;\n"]))),Sn=(0,j.ZP)(ge.Z)(sn||(sn=(0,p.Z)(["\n  width: 100%;\n"]))),En=j.ZP.h1(an||(an=(0,p.Z)(["\n  margin: 0;\n"]))),_n=j.ZP.p(on||(on=(0,p.Z)(["\n  margin: 0;\n  color: grey;\n"]))),Nn=(0,j.ZP)(be.Z)(un||(un=(0,p.Z)(["\n  width: 100%;\n"]))),In=(0,P.Z)(q.Z)(cn||(cn=(0,p.Z)(["\n  color: rgb(255, 138, 0);\n"]))),Fn=j.ZP.h3(dn||(dn=(0,p.Z)(["\n  margin: 0;\n"])));function An(e){var n=e.text,t=e.onClick,r=e.icon,i=e.sx;return(0,L.jsx)(Mn,{onClick:t,startIcon:r,disableElevation:!0,disableFocusRipple:!0,disableRipple:!0,TouchRippleProps:{style:{display:"none"}},sx:i,children:n})}var Tn,Dn,Yn,Mn=(0,P.Z)(y.Z)(yn||(yn=(0,p.Z)(["\n  position: fixed;\n  bottom: 8px;\n  margin: auto;\n  left: 50%;\n  transition: transform 0.3s ease-in-out;\n"]))),Ln=t(3665),Bn=t(21411);function zn(e){var n=(0,g.useState)({pendingReview:[],underReview:[],errors:[],approved:[],paid:[]}),t=(0,h.Z)(n,2),r=t[0],i=t[1],s=(0,g.useState)(!1),a=(0,h.Z)(s,2),o=a[0],u=a[1],c=(0,g.useState)(!1),d=(0,h.Z)(c,2),l=d[0],p=d[1],j=(0,g.useState)(null),b=(0,h.Z)(j,2),w=b[0],q=b[1],C=(0,g.useState)(),k=(0,h.Z)(C,2),y=k[0],R=k[1],P=(0,g.useState)(!1),S=(0,h.Z)(P,2),E=S[0],_=S[1],N=(0,g.useState)(!1),I=(0,h.Z)(N,2),F=I[0],A=I[1],T=(0,g.useState)({firstName:"",lastName:""}),D=(0,h.Z)(T,2),Y=D[0],M=D[1],B=(0,g.useState)(!1),z=(0,h.Z)(B,2),U=z[0],$=z[1],H=(0,g.useState)(!1),O=(0,h.Z)(H,2),G=O[0],V=O[1],X=(0,g.useState)(!1),K=(0,h.Z)(X,2),W=K[0],J=K[1];(0,g.useEffect)((function(){var e=function(){window.scrollY>300?V(!0):V(!1)};return window.addEventListener("scroll",e),function(){return window.removeEventListener("scroll",e)}}),[]);var Q=function(e){return(0,x.Z)((0,x.Z)({},e),{},{amount:parseFloat(e.amount).toFixed(2),date:Fe()(e.date)})};(0,g.useEffect)((function(){var e=function(){var e=(0,f.Z)((0,Z.Z)().mark((function e(){var n,t,r,s;return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.next=3,(0,se.N)("/requests/","GET");case 3:if(n=e.sent,t=(0,h.Z)(n,2),r=t[0],s=t[1],r){e.next=11;break}return R(s.error),p(!1),e.abrupt("return");case 11:_(s.treasurer),M({firstName:s.firstName,lastName:s.lastName}),delete s.treasurer,delete s.firstName,delete s.lastName,i({pendingReview:s.pendingReview.map(Q),underReview:s.underReview.map(Q),errors:s.errors.map(Q),approved:s.approved.map(Q),paid:s.paid.map(Q)}),p(!1);case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[e]);var ee=function(){u(!1)},ne=function(e,n){q(e),A(!E||n||!e),u(!0),J(!e)},te=function(){var e=(0,f.Z)((0,Z.Z)().mark((function e(n){var t,r,s,a;return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return $(!!n),p(!0),e.next=4,(0,se.N)(n?"/requests/?user_filter=".concat(n):"/requests/","GET");case 4:if(t=e.sent,r=(0,h.Z)(t,2),s=r[0],a=r[1],s){e.next=11;break}return R(a.error),e.abrupt("return");case 11:_(a.treasurer),M({firstName:a.firstName,lastName:a.lastName}),delete a.treasurer,delete a.firstName,delete a.lastName,i({pendingReview:a.pendingReview.map(Q),underReview:a.underReview.map(Q),errors:a.errors.map(Q),approved:a.approved.map(Q),paid:a.paid.map(Q)}),p(!1);case 18:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(v.ql,{children:[(0,L.jsx)("title",{children:"Reimbursements"}),(0,L.jsx)("meta",{name:"description",content:"Your finance dashboard"})]}),y?(0,L.jsx)(ie.C,{open:!y,error:y}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)($n,{open:o,onClose:ee,children:(0,L.jsx)(L.Fragment,{children:(0,L.jsx)(kn,{request:w,setRequests:i,onClose:ee,onSubmit:function(e,n){i(n?function(n){return(0,x.Z)((0,x.Z)({},n),{},{pendingReview:(0,m.Z)(n.pendingReview.filter((function(n){return n.id!==e.id}))),errors:(0,m.Z)(n.errors.filter((function(n){return n.id!==e.id})))})}:function(n){return(0,x.Z)((0,x.Z)({},n),{},{pendingReview:[e].concat((0,m.Z)(n.pendingReview.filter((function(n){return n.id!==e.id})))),errors:(0,m.Z)(n.errors.filter((function(n){return n.id!==e.id})))})})},onError:function(e){R(e)},canEdit:F,userName:{first_name:Y.firstName,last_name:Y.lastName},receiptRequired:W})})}),l&&(0,L.jsx)(Hn,{}),U&&(0,L.jsx)(An,{text:"Back to All",onClick:function(){return te()},icon:(0,L.jsx)(Bn.Z,{}),sx:{transform:"translateX(-50%)","&:hover":{background:"transparent"}}}),(0,L.jsx)(Un,{justifyContent:"space-between",children:(0,L.jsx)(nn,{requests:l?null:r,onEdit:ne,onRequest:function(){ne(null,!1)},isTreasurer:E,userName:Y,refreshRequests:te})}),(0,L.jsx)(An,{text:"Back to Top",onClick:function(){return window.scrollTo({top:0,behavior:"smooth"})},icon:(0,L.jsx)(Ln.Z,{}),sx:{transform:"translateX(-50%) ".concat(G?"translateY(0%)":"translateY(100%)"),transition:G?"transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)":"transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)","&:hover":{background:"transparent"}}})]})]})}var Un=(0,j.ZP)(b.Z)(Tn||(Tn=(0,p.Z)(["\n  width: 100%;\n  height: 100%;\n  padding-top: 24px;\n  padding-left: 48px;\n  padding-right: 48px;\n"]))),$n=(0,j.ZP)(w.Z)(Dn||(Dn=(0,p.Z)(["\n  width: 50%;\n  min-width: 500px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 64px;\n  overflow: auto;\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none;\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"]))),Hn=(0,P.Z)(q.Z)(Yn||(Yn=(0,p.Z)(["\n  color: rgb(255, 138, 0);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n"])))}}]);