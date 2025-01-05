"use strict";(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[238],{63931:function(e,n,t){t.d(n,{C:function(){return g}});var r,i,a,s,c=t(30168),o=t(42832),d=t(47131),u=t(70501),l=t(25673),x=t(47313),h=t(96694),p=t(53115),Z=t(32094),f=t(85979),m=t(46417);function g(e){return(0,x.useEffect)((function(){console.warn(e.error)})),(0,m.jsx)(w,{open:e.open,children:(0,m.jsx)(j,{children:(0,m.jsxs)(o.Z,{spacing:2,children:[(0,m.jsxs)(o.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,m.jsxs)(v,{children:["Error",e.error.errorCode&&" ".concat(e.error.errorCode),":"," ",e.error.errorMessage]}),(0,m.jsx)(d.Z,{onClick:function(){window.location.reload()},children:(0,m.jsx)(Z.Z,{})})]}),(0,m.jsxs)(b,{children:["Try refreshing the page and contact"," ",(0,m.jsx)("a",{href:"mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]",children:"shamith09@berkeley.edu"})," ","if the issue persists."]}),(0,m.jsx)("img",{src:f.Uf,alt:"error"})]})})})}var j=(0,h.Z)(u.Z)(r||(r=(0,c.Z)(["\n  padding: 48px;\n  border-radius: 48px;\n"]))),v=p.ZP.h1(i||(i=(0,c.Z)(["\n  margin: 0px;\n"]))),b=p.ZP.p(a||(a=(0,c.Z)(["\n  margin: 0px;\n"]))),w=(0,p.ZP)(l.Z)(s||(s=(0,c.Z)(["\n  width: 50%;\n  min-width: 500px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  padding: 64px;\n"])))},11238:function(e,n,t){t.r(n),t.d(n,{AttendancePage:function(){return ye}});var r,i,a,s,c,o,d,u=t(30168),l=t(4942),x=t(1413),h=t(74165),p=t(15861),Z=t(29439),f=t(63931),m=t(47313),g=t(65964),j=t(53115),v=t(10658),b=t.n(v),w=t(98426),y=t(49124),k=t(43394),C=t(42832),P=t(63681),I=t(69099),S=t(83929),T=t(44758),E=t(70501),A=t(85281),N=t(96694),M=t(51095),O=t(45439),L=t(7861),U=t(9019),q=t(73365),F=t(73428),R=t(47196),V=t(17592),z=t(46417);function B(e){var n=e.attendees,t=e.startTime;return(0,z.jsx)(Q,{children:(0,z.jsxs)(C.Z,{spacing:3,alignItems:"center",children:[(0,z.jsxs)(W,{spacing:1,alignItems:"center",direction:"row",justifyContent:"space-between",children:[(0,z.jsx)(H,{children:"Attendees"}),(0,z.jsxs)(C.Z,{spacing:1,direction:"row",alignItems:"center",children:[(0,z.jsx)(Y,{}),(0,z.jsx)(_,{children:"Scan the QR code and log in to mark yourself present."})]})]}),(0,z.jsx)(U.ZP,{container:!0,spacing:1,children:Object.keys(n).map((function(e){if("Manual"===n[e][0])return(0,z.jsx)(q.Z,{in:!0,children:(0,z.jsx)(U.ZP,{item:!0,xs:6,children:(0,z.jsx)(X,{style:n[e][2]?{backgroundColor:"rgba(255, 138, 0, 0.3)"}:{},children:(0,z.jsx)(K,{children:n[e][1]})})})},e);var r=n[e][0].split(":"),i=(0,Z.Z)(r,3),a=i[0],s=i[1],c=i[2],o=n[e][0].includes("PM"),d=b()().hour(parseInt(a)%12+(o?12:0)).minute(parseInt(s)).second(parseInt(c));return(0,z.jsx)(q.Z,{in:!0,children:(0,z.jsx)(U.ZP,{item:!0,xs:6,children:(0,z.jsx)(X,{style:d>t?{backgroundColor:"rgba(255, 138, 0, 0.3)"}:{},children:(0,z.jsxs)(K,{children:[n[e][1]," - ",n[e][0]]})})})},e)}))})]})})}var D,G,J,Q=(0,V.ZP)(E.Z)(r||(r=(0,u.Z)(["\n  min-height: 95%;\n  width: 60%;\n  min-width: 500px;\n  margin: auto;\n  padding: 64px;\n  border-radius: 48px;\n"]))),W=(0,j.ZP)(C.Z)(i||(i=(0,u.Z)(["\n  width: 100%;\n"]))),Y=(0,V.ZP)(R.Z)(a||(a=(0,u.Z)(["\n  color: grey;\n  font-size: small;\n"]))),_=j.ZP.p(s||(s=(0,u.Z)(["\n  margin: 0;\n  color: grey;\n"]))),H=j.ZP.h1(c||(c=(0,u.Z)(["\n  margin: 0;\n"]))),K=j.ZP.h3(o||(o=(0,u.Z)(["\n  margin: 0;\n"]))),X=(0,V.ZP)(F.Z)(d||(d=(0,u.Z)(["\n  padding: 24px;\n  border-radius: 24px;\n  width: 100%;\n  text-align: center;\n"]))),$=t(85979);function ee(e){var n;if(402===(null===(n=e.error)||void 0===n?void 0:n.errorCode))return(0,z.jsx)(oe,{children:(0,z.jsxs)(C.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,z.jsx)(ce,{children:"Sorry! This code is invalid, please try scanning it again."}),(0,z.jsx)(se,{src:$.lh,alt:"Plexie cold"})]})});var t=function(e){var n=e.split(":"),t=(0,Z.Z)(n,3),r=t[0],i=t[1],a=t[2],s=e.includes("PM");return b()().hour(parseInt(r)%12+(s?12:0)).minute(parseInt(i)).second(parseInt(a))},r=t(e.attendanceTime).isAfter(t(e.startTime));return(0,z.jsx)(oe,{children:(0,z.jsx)(C.Z,{spacing:2,children:(0,z.jsxs)(C.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,z.jsxs)(C.Z,{spacing:1,children:[r?(0,z.jsx)(ce,{style:{color:"red"},children:"You are late!"}):(0,z.jsx)(ce,{style:{color:"green"},children:"You are on time!"}),(0,z.jsxs)(ce,{children:["Code scanned at: ",e.attendanceTime]}),(0,z.jsxs)(ce,{children:["Meeting start time: ",e.startTime]})]}),r?(0,z.jsx)(se,{src:$.WF,alt:"Plexie sad"}):(0,z.jsx)(se,{src:$.kw,alt:"Plexie happy"})]})})})}var ne,te,re,ie,ae,se=j.ZP.img(D||(D=(0,u.Z)(["\n  max-height: 200px;\n"]))),ce=j.ZP.h2(G||(G=(0,u.Z)(["\n  margin: 0;\n"]))),oe=(0,V.ZP)(E.Z)(J||(J=(0,u.Z)(["\n  min-height: 95%;\n  width: 50%;\n  min-width: 700px;\n  margin: auto;\n  padding: 64px;\n  border-radius: 48px;\n  margin-top: 32px;\n"]))),de=t(45279);function ue(e){var n=e.absent;return(0,z.jsx)(Ze,{children:(0,z.jsxs)(C.Z,{spacing:3,alignItems:"center",children:[(0,z.jsx)(fe,{spacing:1,alignItems:"center",direction:"row",justifyContent:"space-between",children:(0,z.jsx)(me,{children:"Absent"})}),(0,z.jsx)(U.ZP,{container:!0,spacing:1,children:n.map((function(e){return(0,z.jsx)(q.Z,{in:!0,children:(0,z.jsx)(U.ZP,{item:!0,xs:6,children:(0,z.jsx)(je,{children:(0,z.jsx)(ge,{children:e})})})},e)}))})]})})}var le,xe,he,pe,Ze=(0,V.ZP)(E.Z)(ne||(ne=(0,u.Z)(["\n  min-height: 95%;\n  width: 60%;\n  min-width: 500px;\n  margin: auto;\n  padding: 64px;\n  border-radius: 48px;\n"]))),fe=(0,j.ZP)(C.Z)(te||(te=(0,u.Z)(["\n  width: 100%;\n"]))),me=j.ZP.h1(re||(re=(0,u.Z)(["\n  margin: 0;\n"]))),ge=j.ZP.h3(ie||(ie=(0,u.Z)(["\n  margin: 0;\n"]))),je=(0,V.ZP)(F.Z)(ae||(ae=(0,u.Z)(["\n  padding: 24px;\n  border-radius: 24px;\n  width: 100%;\n  text-align: center;\n"]))),ve=t(12549),be=t(68507),we=30;function ye(e){var n=(0,m.useState)("hi"),t=(0,Z.Z)(n,2),r=t[0],i=t[1],a=(0,m.useState)(""),s=(0,Z.Z)(a,2),c=s[0],o=s[1],d=(0,m.useState)({}),u=(0,Z.Z)(d,2),j=u[0],v=u[1],E=(0,m.useState)([]),A=(0,Z.Z)(E,2),N=A[0],U=A[1],q=(0,m.useState)(!1),F=(0,Z.Z)(q,2),R=F[0],V=F[1],D=(0,m.useState)(),G=(0,Z.Z)(D,2),J=G[0],Q=G[1],W=(0,m.useState)(b()()),Y=(0,Z.Z)(W,2),_=Y[0],H=Y[1],K=(0,m.useState)(""),X=(0,Z.Z)(K,2),$=X[0],ne=X[1],te=(0,m.useState)(),re=(0,Z.Z)(te,2),ie=re[0],ae=re[1],se=(0,m.useState)(!1),ce=(0,Z.Z)(se,2),oe=ce[0],le=ce[1],xe=(0,m.useState)(we),he=(0,Z.Z)(xe,2),pe=he[0],Ze=he[1],fe=(0,m.useState)(""),me=(0,Z.Z)(fe,2),ge=me[0],je=me[1],ye=(0,m.useState)(!1),Se=(0,Z.Z)(ye,2),Te=Se[0],Ee=Se[1],Ae=function(){var e=(0,p.Z)((0,h.Z)().mark((function e(){var n,t,r,a,s,d,u,l,x;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(V(!0),oe){e.next=19;break}return le(!0),e.next=5,(0,O.N)("/attendance/","POST",{name:$,meetingLeader:(0,L.Z)((0,de.LP)()).sub,startTime:null===_||void 0===_?void 0:_.format("h:mm:ss A"),set:!0});case 5:if(n=e.sent,t=(0,Z.Z)(n,2),r=t[0],a=t[1],r){e.next=13;break}return Q(a.error),le(!1),e.abrupt("return");case 13:i(a.code),o(a.id),v(a.attendees),U(a.absent),e.next=37;break;case 19:return le(!1),e.next=22,(0,O.N)("/attendance/","DELETE",{id:c});case 22:if(s=e.sent,d=(0,Z.Z)(s,2),u=d[0],l=d[1],u){e.next=30;break}return Q(l.error),le(!0),e.abrupt("return");case 30:return x={attendees:Object.values(j).map((function(e){return e[1]})),absent:N},e.next=33,navigator.clipboard.writeText(JSON.stringify(x));case 33:i(""),o(""),v([]),U([]);case 37:V(!1);case 38:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ne=function(){var e=(0,p.Z)((0,h.Z)().mark((function e(){var n;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={attendees:Object.values(j).map((function(e){return e[1]})),absent:N},e.next=3,navigator.clipboard.writeText(JSON.stringify(n));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Me=function(){var e="Name,Arrival Time\n"+Object.values(j).map((function(e){var n=e[0],t=e[1];return"".concat(t,",").concat(n)})).join("\n"),n=new Blob([e],{type:"text/csv;charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(n),t.download="attendees.csv",document.body.appendChild(t),t.click(),document.body.removeChild(t)},Oe=new URLSearchParams(window.location.search),Le=Oe.get("attendancecode"),Ue=Oe.get("attendancetime"),qe=Oe.get("starttime"),Fe=Oe.get("meetingid"),Re=(0,m.useState)({}),Ve=(0,Z.Z)(Re,2),ze=Ve[0],Be=Ve[1];(0,m.useEffect)((function(){if(Ue)return Be({attendanceTime:Ue,startTime:qe}),be.Z.remove("attendanceTime"),void be.Z.remove("attendanceId");if(Le){var e=function(){var e=(0,p.Z)((0,h.Z)().mark((function e(){var n,t,r,i;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(!0),e.next=3,(0,O.N)("/attendance/","PUT",{attendancecode:Le,meetingId:Fe,time:b()().format("h:mm:ss A")});case 3:if(n=e.sent,t=(0,Z.Z)(n,2),r=t[0],i=t[1],r||402===i.error.errorCode){e.next=10;break}return Q(i.error),e.abrupt("return");case 10:i.redirect?(window.location=i.redirect,be.Z.set("attendanceTime",i.attendanceTime),be.Z.set("attendanceId",i.attendanceId)):(V(!1),Be(i));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}}),[Le,Fe,e,Ue,qe]),(0,m.useEffect)((function(){var e=null,n=null,t=null;if(oe&&c){var r=function(){var n=(0,p.Z)((0,h.Z)().mark((function n(t){var r,a,s,o;return(0,h.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t&&V(!0),n.next=3,(0,O.N)("/attendance/","POST",{id:c,set:t});case 3:if(r=n.sent,a=(0,Z.Z)(r,2),s=a[0],o=a[1],s){n.next=12;break}return Q(o.error),le(!1),clearInterval(e),n.abrupt("return");case 12:v(o.attendees),U(o.absent),t&&(i(o.code),Ze(we),V(!1));case 15:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return oe&&(r(!0),e=setInterval((function(){return r(!0)}),1e3*we),n=setInterval((function(){return r(!1)}),1e3),t=setInterval((function(){return Ze((function(e){return e?e-1:e}))}),1e3)),function(){clearInterval(e),clearInterval(n),clearInterval(t)}}}),[oe,c,e]);var De=function(){var e=(0,p.Z)((0,h.Z)().mark((function e(){var n,t,r,i;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(!0),e.next=3,(0,O.N)("/attendance/?query=sessions","GET");case 3:if(n=e.sent,t=(0,Z.Z)(n,2),r=t[0],i=t[1],r){e.next=11;break}return Q(i.error),V(!1),e.abrupt("return");case 11:ae(i.sessions),V(!1);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ge=function(){var e=(0,p.Z)((0,h.Z)().mark((function e(n){var t,r,i,a;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(!0),e.next=3,(0,O.N)("/attendance/?query=".concat(n),"GET");case 3:if(t=e.sent,r=(0,Z.Z)(t,2),i=r[0],a=r[1],i){e.next=10;break}return Q(a.error),e.abrupt("return");case 10:v(a.attendees),U(a.absent),V(!1);case 13:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Je=function(){var e=(0,p.Z)((0,h.Z)().mark((function e(){var n,t,r,i,a,s;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,ve.Z)(),t=["Manual",ge,Te],v((function(e){return(0,x.Z)((0,x.Z)({},e),{},(0,l.Z)({},n,t))})),je(""),Ee(!1),V(!0),e.next=8,(0,O.N)("/attendance/","PUT",{meetingId:c,attendee:t,attendeeId:n});case 8:if(r=e.sent,i=(0,Z.Z)(r,2),a=i[0],s=i[1],V(!1),a){e.next=16;break}return Q(s.error),e.abrupt("return");case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(g.ql,{children:[(0,z.jsx)("title",{children:"Attendance"}),(0,z.jsx)("meta",{name:"description",content:"Take attendance here"})]}),ze.attendanceTime&&ze.startTime||ze&&ze.error?(0,z.jsx)(ee,(0,x.Z)({},ze)):(0,z.jsxs)(C.Z,{spacing:2,alignItems:"center",children:[(0,z.jsx)(ke,{children:(0,z.jsxs)(C.Z,{spacing:3,alignItems:"center",children:[(0,z.jsxs)(Ce,{direction:"row",justifyContent:"space-evenly",alignItems:"center",children:[(0,z.jsx)(P.Z,{label:"Meeting Name",disabled:oe,value:$,onChange:function(e){ne(e.target.value)},error:!$,required:!0}),(0,z.jsx)(k._,{dateAdapter:y.y,children:(0,z.jsx)(w.j,{label:"Meeting Start Time",value:_,onChange:function(e){H(e)},renderInput:function(e){return(0,z.jsx)(P.Z,(0,x.Z)({},e))},disabled:oe})})]}),oe||ie?ie?(0,z.jsxs)(z.Fragment,{children:[0===ie.length?(0,z.jsx)("p",{children:"No sessions found"}):ie.map((function(e){var n=e._id,t=e.name;return(0,z.jsx)(I.Z,{onClick:function(){return Ge(n)},children:t})})),(0,z.jsxs)(C.Z,{direction:"row",gap:2,children:[(0,z.jsx)(I.Z,{variant:"contained",onClick:Me,children:"Export to CSV"}),(0,z.jsx)(I.Z,{variant:"contained",onClick:Ne,children:"Copy"}),(0,z.jsx)(I.Z,{variant:"contained",onClick:function(){ae(void 0),v([]),U([])},children:"Back"})]})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(Ie,{children:["Code will change in ",pe," second",1!==pe?"s":""]}),(0,z.jsxs)("div",{style:{position:"relative",width:"300px",height:"300px"},children:[(0,z.jsx)(M.Qd,{id:"qrCode",value:"".concat(window.location,"/?attendancecode=").concat(r,"&meetingid=").concat(c),size:300,bgColor:"#ffffff",level:"H",style:{opacity:R?.5:1,transition:"opacity 0.3s ease-in-out"}}),R&&(0,z.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:(0,z.jsx)(Pe,{})})]}),(0,z.jsxs)(C.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,z.jsx)(I.Z,{variant:"contained",onClick:Ae,children:"Stop Session"}),(0,z.jsx)(I.Z,{variant:"contained",onClick:Me,children:"Export to CSV"})]}),(0,z.jsxs)(C.Z,{direction:"row",gap:4,alignItems:"center",children:[(0,z.jsx)(P.Z,{label:"Add Attendee Manually",variant:"outlined",margin:"normal",fullWidth:!0,onChange:function(e){return je(e.target.value)},value:ge,onKeyDown:function(e){"Enter"===e.key&&Je()}}),(0,z.jsx)(S.Z,{control:(0,z.jsx)(T.Z,{checked:Te,onChange:function(e){return Ee(e.target.checked)},name:"late"}),label:"Late"})]}),(0,z.jsx)(I.Z,{variant:"contained",onClick:Je,children:"Add Attendee"})]}):(0,z.jsxs)(Ce,{direction:"row",justifyContent:"space-evenly",alignItems:"center",children:[(0,z.jsx)(I.Z,{variant:"contained",onClick:Ae,children:"Start Session"}),(0,z.jsx)(I.Z,{variant:"contained",onClick:De,children:"View Previous Sessions"})]})]})}),(0,z.jsx)("div",{}),(oe&&_||ie)&&(0,z.jsx)(B,{attendees:j,startTime:_}),(oe&&_||ie)&&(0,z.jsx)(ue,{absent:N})]}),J&&(0,z.jsx)(f.C,{open:!!J,error:J})]})}var ke=(0,N.Z)(E.Z)(le||(le=(0,u.Z)(["\n  min-height: 95%;\n  width: 40%;\n  min-width: 500px;\n  margin: auto;\n  padding: 64px;\n  border-radius: 48px;\n  margin-top: 32px;\n"]))),Ce=(0,j.ZP)(C.Z)(xe||(xe=(0,u.Z)(["\n  width: 100%;\n"]))),Pe=(0,N.Z)(A.Z)(he||(he=(0,u.Z)(["\n  color: rgb(255, 138, 0);\n  width: 50px !important;\n  height: 50px !important;\n  "]))),Ie=j.ZP.p(pe||(pe=(0,u.Z)(["\n  margin: 0;\n  color: grey;\n"])))}}]);