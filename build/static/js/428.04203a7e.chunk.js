"use strict";(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[428],{31144:(e,s,t)=>{t.d(s,{o:()=>l});var r=t(2257),n=t(2046),a=t(25333),i=(t(9950),t(79693)),o=t(44414);function l(e){return(0,o.jsx)("form",{className:"w-full",children:(0,o.jsx)(r.A,{variant:"outlined",onChange:s=>e.onChange(s.target.value),value:e.comment,label:e.message,fullWidth:!0,InputProps:{endAdornment:(0,o.jsx)(n.A,{position:"end",children:(0,o.jsx)(a.A,{onClick:e.onSubmit,type:"submit",children:(0,o.jsx)(i.A,{})})})}})})}},20954:(e,s,t)=>{t.d(s,{C:()=>l});var r=t(96583),n=t(40033),a=t(79739),i=t(75165),o=(t(9950),t(44414));function l(e){return(0,o.jsxs)(r.A,{onClose:e.onClose,open:e.open,PaperProps:{className:"!rounded-2xl p-6"},children:[(0,o.jsxs)(n.A,{children:["Are you sure you want to delete this ",e.item,"?"]}),(0,o.jsxs)(a.A,{children:[(0,o.jsx)(i.A,{onClick:e.onClose,children:"Cancel"}),(0,o.jsx)(i.A,{onClick:e.onDelete,variant:"contained",className:"!bg-[rgb(255,138,0)] !text-white",children:"Delete"})]})]})}},58574:(e,s,t)=>{t.d(s,{A:()=>u});var r=t(5446),n=t(2235),a=t(88981),i=t(25333),o=t(9950),l=t(4804),d=t(54975),c=t(44414);function u(e){return(0,o.useEffect)((()=>{console.warn(e.error)})),(0,c.jsx)(r.A,{open:e.open,className:"w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16",children:(0,c.jsx)(n.A,{className:"p-12 !rounded-[48px]",children:(0,c.jsxs)(a.A,{spacing:2,children:[(0,c.jsxs)(a.A,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,c.jsxs)("h1",{className:"m-0",children:["Error",e.error.errorCode&&" ".concat(e.error.errorCode),":"," ",e.error.errorMessage]}),(0,c.jsx)(i.A,{onClick:()=>{window.location.reload()},children:(0,c.jsx)(l.A,{})})]}),(0,c.jsxs)("p",{className:"m-0",children:["Try refreshing the page and contact"," ",(0,c.jsx)("a",{href:"mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]",children:"shamith09@berkeley.edu"})," ","if the issue persists."]}),(0,c.jsx)("img",{src:d.kD,alt:"error"})]})})})}},8036:(e,s,t)=>{t.d(s,{C:()=>i});t(9950);var r=t(28510),n=t(96583),a=t(44414);function i(e){return setTimeout((()=>{e.onClose()}),4e3),(0,a.jsx)(n.A,{onClose:e.onClose,open:e.open,PaperProps:{className:"!rounded-[48px] p-12"},children:(0,a.jsx)(r.A,{mode:r.F.SUCCESS})})}},26182:(e,s,t)=>{t.r(s),t.d(s,{CategoriesPage:()=>u,categories:()=>c});var r=t(89379),n=t(9950),a=t(76455),i=t(4159),o=t.n(i),l=t(64068),d=t(44414);const c=["NMEP"];function u(e){const[s,t]=(0,n.useState)({pendingReview:[],underReview:[],errors:[],approved:[],paid:[]}),[i,c]=(0,n.useState)(!1),u=e=>(0,r.A)((0,r.A)({},e),{},{amount:e.amount.toFixed(2),date:o()(e.date)});return(0,n.useEffect)((()=>{(async()=>{const[,e]=await(0,l.A)("/requests/","GET");c(e.treasurer),delete e.treasurer,delete e.firstName,delete e.lastName,t({pendingReview:e.pendingReview.map(u),underReview:e.underReview.map(u),errors:e.errors.map(u),approved:e.approved.map(u),paid:e.paid.map(u)})})()}),[e]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a.mg,{children:[(0,d.jsx)("title",{children:"Categories"}),(0,d.jsx)("meta",{name:"description",content:"Your finance dashboard"})]}),i?Object.values(s.pendingReview.reduce(((e,s)=>{const t=s.team_budget;return e[t]=(e[t]||0)+Number(s.amount),e}),{})).map(((e,t)=>(0,d.jsx)("p",{children:"Total amount for category ".concat(s.pendingReview[t].team_budget,": $").concat(e.toFixed(2))},t))):(0,d.jsx)("p",{children:"You do not have access to this section."})]})}},7661:(e,s,t)=>{t.r(s),t.d(s,{ReimbursementsPage:()=>ce});var r=t(89379),n=t(9950),a=t(76455),i=t(5446),o=t(46639),l=t(88981),d=t(2235),c=t(83274),u=t(75165),m=t(14857),p=t(48089),x=t(7999),h=t(74834),A=t(72661),g=t(68179),j=t(25333),f=t(31556),v=t(97916),b=t(96319),w=t(53777),q=t(44414);function C(e){return(0,q.jsx)(i.A,{open:e.open,onClose:e.onClose,className:"w-1/2 h-full absolute inset-0 m-auto p-16",children:(0,q.jsxs)(d.A,{className:"p-12 !rounded-[48px] h-full",children:[(0,q.jsxs)(l.A,{direction:"row",alignItems:"center",justifyContent:"space-between",className:"w-full mb-6",children:[(0,q.jsxs)("h1",{className:"m-0 overflow-hidden whitespace-nowrap text-ellipsis",children:["Receipts for ",e.itemDescription]}),(0,q.jsx)(j.A,{onClick:e.onClose,children:(0,q.jsx)(b.A,{})})]}),e.loading?(0,q.jsx)(o.A,{className:"text-[rgb(255,138,0)]"}):(0,q.jsx)(q.Fragment,{children:e.images&&(0,q.jsx)(f.A,{cols:3,rowHeight:300,className:"h-full",children:e.images.map((e=>(0,q.jsx)(v.A,{cols:1,children:(0,q.jsx)("a",{download:e.name,href:e.data,children:(0,q.jsx)("img",{src:e.data,alt:"receipt",loading:"lazy",className:"max-w-full max-h-full brightness-100 hover:brightness-75 transition-all duration-250"})})},e.name)))})}),(0,q.jsx)("div",{className:"absolute bottom-[108px]",children:(0,q.jsxs)(l.A,{direction:"row",alignItems:"center",spacing:1,children:[(0,q.jsx)(w.A,{className:"text-gray-500 text-sm"}),(0,q.jsx)("p",{className:"text-gray-500 m-0",children:"Click on an image to download it."})]})})]})})}var N=t(38824),R=t(58574),S=t(64068);function y(e){const[s,t]=(0,n.useState)(!1),[a,i]=(0,n.useState)([]),[o,d]=(0,n.useState)(),[j,f]=(0,n.useState)(!1),v=()=>{t(!1)},b=async()=>{f(!0),t(!0);const[s,r]=await(0,S.A)("/requests/","PUT",{images:!0,request_id:e.request.id});s?(i(r.images),f(!1)):d(r.error)},w=(0,m.A)();return(0,q.jsx)(N.sx,{draggableId:e.request.id,index:e.index,children:t=>{var i;return(0,q.jsxs)(p.A,(0,r.A)((0,r.A)((0,r.A)({elevation:2},t.draggableProps),t.dragHandleProps),{},{ref:t.innerRef,className:"p-4 text-left flex flex-col !rounded-2xl w-full",children:[o&&(0,q.jsx)(R.A,{open:!!o,error:o}),s&&(0,q.jsx)(C,{images:a,onClose:v,open:s,itemDescription:e.request.item_description,loading:j}),(0,q.jsxs)(l.A,{spacing:1,children:[(0,q.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",className:"w-full",children:[(0,q.jsx)("h3",{className:"m-0 overflow-hidden whitespace-nowrap text-ellipsis",children:e.request.item_description}),(0,q.jsxs)("h3",{className:"m-0 flex-shrink-0 pl-2",children:["$",e.request.amount]})]}),(0,q.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.mine?(0,q.jsx)(u.A,{size:"small",startIcon:n.cloneElement((0,q.jsx)(h.A,{})),onClick:b,style:{color:w.palette.text.primary},children:"Receipt(s)"}):(0,q.jsxs)(l.A,{direction:"row",spacing:1,children:[(0,q.jsx)(c.A,{title:"Filter requests by ".concat(e.request.first_name),children:(0,q.jsxs)("p",{className:"m-0 overflow-hidden cursor-pointer",onClick:e.onClickName,children:[e.request.first_name," ",null===(i=e.request.last_name)||void 0===i?void 0:i.charAt(0)]})}),!e.request.bank_set&&(0,q.jsx)(c.A,{title:"Bank info not set",children:(0,q.jsx)("p",{className:"m-0 overflow-hidden text-red-500",children:"!"})})]}),e.request.comments.length>0&&(0,q.jsxs)(l.A,{direction:"row",spacing:1,onClick:()=>e.onEdit(e.mine),alignItems:"center",className:"text-gray-500",children:[(0,q.jsx)(A.A,{fontSize:"small"}),(0,q.jsx)("p",{className:"m-0 overflow-hidden text-xs",children:e.request.comments.length})]}),(0,q.jsx)(u.A,{style:{color:w.palette.text.primary,zIndex:999},size:"small",startIcon:n.cloneElement(e.mine?(0,q.jsx)(x.A,{}):(0,q.jsx)(g.A,{})),onClick:()=>e.onEdit(e.mine),disabled:!1,children:e.mine?"Edit":"View"})]})]})]}),e.request.id)}})}var E=t(99532),_=t(42891),k=t(74745),I=t(2257),F=t(2046),P=t(87498),T=t(31144);function D(e){const{id:s,comment:t}=e,r=s===t.user_id;return(0,q.jsxs)(p.A,{className:"w-1/2 p-4 !rounded-t-2xl ".concat(r?"self-end !rounded-bl-2xl bg-[rgba(255,138,0,0.3)]":"self-start !rounded-br-2xl bg-white"),children:[(0,q.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,q.jsxs)("h4",{className:"m-0",children:[t.first_name," ",t.last_name]}),(0,q.jsx)("h4",{className:"m-0",children:t.date.format("MM/DD/YYYY")})]}),(0,q.jsx)("p",{className:"m-0 text-gray-500",children:t.message})]})}var Y=t(4159),M=t.n(Y),z=t(72301);function U(e){const[s,t]=(0,n.useState)(0);(0,n.useEffect)((()=>{t(e.requestedAmount)}),[e.requestedAmount]);const[r,a]=(0,n.useState)([]),[o,c]=(0,n.useState)("");return(0,q.jsx)(i.A,{open:e.open,onClose:e.onClose,className:"w-1/2 min-h-full absolute inset-0 m-auto p-16",children:(0,q.jsx)(d.A,{className:"p-12 !rounded-[48px] min-h-full",children:(0,q.jsxs)(l.A,{spacing:3,children:[(0,q.jsx)("h1",{className:"m-0 overflow-hidden whitespace-nowrap text-ellipsis text-3xl",children:"Reimbursement Request Approval"}),(0,q.jsx)(k.A,{}),(0,q.jsx)("h3",{className:"m-0",children:"How much do you want to approve this request for?"}),(0,q.jsxs)(l.A,{direction:"row",alignItems:"center",spacing:2,children:[(0,q.jsx)(I.A,{className:"w-2/5",variant:"outlined",type:"number",value:s,label:"Amount",InputProps:{startAdornment:(0,q.jsx)(F.A,{position:"start",children:"$"})},required:!0,onChange:e=>{let{target:s}=e;return t(s.value)}}),(0,q.jsx)(u.A,{variant:"text",onClick:()=>t(e.requestedAmount),children:"Reset"})]}),(0,q.jsx)(P.Ay,{defaultValue:100,value:Math.round(s/e.requestedAmount*100),step:5,min:0,max:100,onChange:s=>{let{target:r}=s;return t(+(e.requestedAmount/100*r.value).toFixed(2))},valueLabelDisplay:"auto",marks:[{value:0,label:"0%"},{value:50,label:"50%"},{value:100,label:"100%"}],className:"mx-2 mb-6"}),(0,q.jsx)(k.A,{}),(0,z.gf)()&&[...r,{message:"Request approved for $".concat(s," (").concat(Math.round(s/e.requestedAmount*100),"%)"),date:M()(),user_id:(0,_.A)((0,z.gf)()).sub,first_name:e.userName.firstName,last_name:e.userName.lastName}].map(((e,s)=>(0,q.jsx)(D,{id:(0,_.A)((0,z.gf)()).sub,comment:e},s))).sort(),(0,q.jsx)(T.o,{comment:o,message:"Add Comment",onChange:e=>c(e),onSubmit:s=>{s.preventDefault(),a((s=>[...s,{message:o,date:M()(),user_id:(0,_.A)((0,z.gf)()).sub,first_name:e.userName.firstName,last_name:e.userName.lastName}]))}}),(0,q.jsxs)(l.A,{direction:"row",justifyContent:"space-between",className:"w-full",children:[(0,q.jsx)(u.A,{variant:"contained",onClick:()=>{a([]),e.onSubmit(r,s)},type:"submit",children:"Approve"}),(0,q.jsx)(u.A,{variant:"contained",onClick:()=>{e.onClose()},children:"Cancel"})]})]})})})}var B=t(96583),$=t(79739),L=t(8036);function O(e){const[s,t]=(0,n.useState)(""),[r,a]=(0,n.useState)(),[i,o]=(0,n.useState)(!1);return(0,q.jsxs)(q.Fragment,{children:[r&&(0,q.jsx)(R.A,{error:r,open:!!r}),(0,q.jsx)(B.A,{onClose:()=>e.onClose(!1),open:e.open,PaperProps:{className:"!rounded-[48px] p-12"},children:i?(0,q.jsx)(L.C,{open:i,onClose:()=>e.onClose(!0)}):(0,q.jsxs)(q.Fragment,{children:[(0,q.jsxs)(l.A,{spacing:3,children:[(0,q.jsx)("h1",{className:"m-0 overflow-hidden whitespace-nowrap text-ellipsis text-3xl",children:"Reimbursement Request Approval"}),(0,q.jsx)(k.A,{}),(0,q.jsx)("h3",{className:"m-0 text-xl",children:"An MFA code has been sent from BlueVine. Please enter the code below to approve the reimbursement request."}),(0,q.jsx)(I.A,{label:"MFA Code",variant:"outlined",value:s,onChange:e=>t(e.target.value)})]}),(0,q.jsxs)($.A,{children:[(0,q.jsx)(u.A,{onClick:()=>e.onClose(!1),children:"Cancel"}),(0,q.jsx)(u.A,{onClick:async()=>{const[e,t]=await(0,S.A)("/approval/_/","POST",{code:s});e?o(!0):a(t.error)},variant:"contained",children:"Submit"})]})]})})]})}var G=t(63364);const H=["pendingReview","underReview","errors","approved","paid"];function V(e){const[s,t]=(0,n.useState)({pendingReview:0,underReview:0,errors:0,approved:0,paid:0}),[a,i]=(0,n.useState)(),[o,m]=(0,n.useState)(!1),[p,x]=(0,n.useState)(0),[h,A]=(0,n.useState)(""),[g,j]=(0,n.useState)(""),[f,v]=(0,n.useState)(0),[b,w]=(0,n.useState)(0),[C,k]=(0,n.useState)(!1),[I,F]=(0,n.useState)();(0,n.useEffect)((()=>{const s={pendingReview:0,underReview:0,errors:0,approved:0,paid:0};e.requests&&(H.forEach((t=>{e.requests[t].forEach((e=>s[t]+=parseFloat(e.amount)))})),t(s))}),[e.requests]);return(0,q.jsxs)(q.Fragment,{children:[a&&(0,q.jsx)(R.A,{open:!!a,error:a}),(0,q.jsx)(U,{open:o,onClose:()=>m(!1),requestedAmount:p,onSubmit:async(s,n)=>{const[a,o]=await(0,S.A)("/approval/".concat(h,"/"),"PUT",{status:"approved",comments:s,amount:n});if(!a)return 407===o.status?void i({errorMessage:"User has not set payment information."}):void i(o.error);const l=e.requests[g].splice(f,1)[0];F(l),e.requests.approved.splice(b,0,l),t((e=>(0,r.A)((0,r.A)({},e),{},{[g]:e[g]-parseFloat(l.amount),approved:e.approved+parseFloat(n)}))),m(!1),k(!0)},userName:e.userName}),C&&(0,q.jsx)(O,{open:C,onClose:s=>{k(!1),s&&(e.requests.approved=e.requests.approved.filter((e=>e.id!==I.id)),e.requests.paid.splice(0,0,I),t((e=>(0,r.A)((0,r.A)({},e),{},{approved:e.approved-parseFloat(I.amount),paid:e.paid+parseFloat(I.amount)}))))}}),(0,q.jsx)(N.JY,{onDragEnd:async s=>{const{destination:n,source:a}=s;if(null===n||n.droppableId===a.droppableId||!e.isTreasurer)return;const o=e.requests[a.droppableId][a.index];if("approved"===n.droppableId)return m(!0),x(o.amount),A(o.id),j(a.droppableId),v(a.index),void w(n.index);e.requests[a.droppableId].splice(a.index,1),e.requests[n.droppableId].splice(n.index,0,o),t((e=>(0,r.A)((0,r.A)({},e),{},{[a.droppableId]:e[a.droppableId]-parseFloat(o.amount),[n.droppableId]:e[n.droppableId]+parseFloat(o.amount)})));const[l,d]=await(0,S.A)("/approval/".concat(o.id,"/"),"PUT",{status:n.droppableId,comments:[]});l||i(d.error)},children:(0,q.jsx)(l.A,{direction:"row",spacing:1,children:H.map((a=>{const i=a.replace(/([A-Z])/g," $1"),o=i.charAt(0).toUpperCase()+i.slice(1);return(0,q.jsxs)(d.A,{className:"w-[calc(20%-8px)] h-full p-8 text-center !rounded-2xl",style:"approved"===a?{border:"2px solid rgb(255, 138, 0)"}:{},children:[(0,q.jsxs)(l.A,{direction:"row",justifyContent:"center",alignItems:"center",className:"pb-4",gap:1,children:[(0,q.jsxs)("h2",{className:"m-0 text-2xl",children:[o,e.requests&&0!==e.requests[a].length&&"approved"!==a?": $".concat(s[a].toFixed(2)):""]}),"approved"===a&&(0,q.jsx)(c.A,{title:"Moving a request here will pay it through Bluevine, then move it to Paid.",children:(0,q.jsx)(G.A,{className:"cursor-pointer text-gray-500",fontSize:"small"})})]}),(0,q.jsxs)(l.A,{spacing:1,children:["pendingReview"===a&&null!==e.requests&&(0,q.jsx)(u.A,{startIcon:n.cloneElement((0,q.jsx)(E.A,{})),onClick:e.onRequest,children:"Request Reimbursement"}),(0,q.jsx)(N.gL,{droppableId:a,children:s=>(0,q.jsxs)(l.A,(0,r.A)((0,r.A)({spacing:1,ref:s.innerRef},s.droppableProps),{},{children:[e.requests&&("paid"!==a?e.requests[a].sort(((e,s)=>s.amount-e.amount)):e.requests[a]).map(((s,r)=>(0,q.jsx)(y,{request:s,index:r,onEdit:t=>e.onEdit(s,t),mine:!e.isTreasurer||s.user_id===(0,_.A)((0,z.gf)()).sub,onClickName:()=>(s=>{e.refreshRequests(s.user_id);const r={pendingReview:0,underReview:0,errors:0,approved:0,paid:0};e.requests&&(H.forEach((s=>{e.requests[s].forEach((e=>r[s]+=parseFloat(e.amount)))})),t(r))})(s)},s.id))),s.placeholder]}))})]})]},a)}))})})]})}var X=t(25979),J=t(29277),W=t(41626),Z=t(16497),K=t(85815),Q=t(57988),ee=t(93465),se=t.n(ee),te=t(20954),re=t(26182),ne=t(35887);const ae={item_description:"",amount:"",team_budget:"",is_food:!1,images:[],status:"pendingReview",comments:[]};function ie(e){var s,t,a;const[i,c]=(0,n.useState)(ae),[m,p]=(0,n.useState)(!1),[x,A]=(0,n.useState)(!1),[g,f]=(0,n.useState)(!1),[v,w]=(0,n.useState)(!1),[N,R]=(0,n.useState)(!1),[y,E]=(0,n.useState)(""),[P,Y]=(0,n.useState)([]),[U,B]=(0,n.useState)(!1);(0,n.useEffect)((()=>{if(!e.request)return void $();(async()=>{B(!0);const[s,t]=await(0,S.A)("/requests/","PUT",{comment:!0,request_id:e.request?e.request.id:null});s?(B(!1),c((0,r.A)((0,r.A)({},e.request),{},{amount:e.request.amount.toString(),comments:t.comments.map((e=>(0,r.A)((0,r.A)({},e),{},{date:M()(e.date)}))),images:[]})),await L()):e.onError(t.error)})()}),[]);const $=()=>{c((0,r.A)((0,r.A)({},ae),{},{comments:[]}))},L=async()=>{var s;const[t,r]=await(0,S.A)("/requests/","PUT",{images:!0,request_id:null===(s=e.request)||void 0===s?void 0:s.id});t?Y(r.images):e.onError(r.error)};return(0,q.jsxs)(d.A,{className:"p-12 !rounded-[48px]",elevation:3,children:[(0,q.jsx)(ne.l$,{}),(0,q.jsx)(te.C,{open:g,onClose:()=>f(!1),onDelete:async()=>{f(!1),(0,S.A)("/requests/","DELETE",{id:e.request.id}),e.onClose(),e.onSubmit(e.request,!0)},item:"request"}),(0,q.jsx)(C,{loading:U,open:N,onClose:()=>R(!1),images:P,itemDescription:null===(s=e.request)||void 0===s?void 0:s.item_description}),(0,q.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",className:"w-full mb-4",children:[(0,q.jsx)("h1",{className:"m-0 text-2xl",children:"Reimbursement Request Form"}),e.canEdit&&e.request?(0,q.jsx)(j.A,{onClick:()=>{f(!0)},children:(0,q.jsx)(Q.A,{fontSize:"large"})}):(0,q.jsx)("p",{className:"m-0 text-gray-500",children:"*required"})]}),(0,q.jsx)("form",{children:(0,q.jsxs)(l.A,{spacing:3,alignItems:"flex-start",children:[(0,q.jsx)(I.A,{className:"w-full",variant:"outlined",onChange:e=>{let{target:s}=e;return c((e=>(0,r.A)((0,r.A)({},e),{},{item_description:s.value})))},value:i.item_description,label:"Item Description",required:!0,error:m&&""===i.item_description,helperText:m&&""===i.item_description&&"Required",disabled:!e.canEdit}),(0,q.jsxs)(l.A,{direction:"row",spacing:3,alignItems:"center",children:[(0,q.jsx)(I.A,{variant:"outlined",onChange:e=>{let{target:s}=e;return c((e=>(0,r.A)((0,r.A)({},e),{},{amount:s.value})))},type:"number",value:i.amount,label:"Amount",InputProps:{startAdornment:(0,q.jsx)(F.A,{position:"start",children:"$"})},required:!0,error:m&&""===i.amount,helperText:m&&""===i.amount&&"Required",disabled:!e.canEdit}),U&&(0,q.jsx)(o.A,{className:"text-[rgb(255,138,0)]"})]}),(0,q.jsx)(k.A,{}),(0,q.jsxs)(X.A,{children:[(0,q.jsx)(J.A,{disabled:!e.canEdit,children:"Team Budget?"}),(0,q.jsxs)(W.A,{row:!0,"aria-labelledby":"demo-row-radio-buttons-group-label",name:"row-radio-buttons-group",onChange:e=>{let{target:s}=e;c((e=>(0,r.A)((0,r.A)({},e),{},{team_budget:s.value})))},children:[re.categories.map((s=>(0,q.jsx)(Z.A,{value:s,control:(0,q.jsx)(K.A,{disabled:!e.canEdit}),label:s,disabled:!e.canEdit,required:!0},s))),(0,q.jsx)(Z.A,{value:"Miscellaneous",control:(0,q.jsx)(K.A,{disabled:!e.canEdit}),label:"Miscellaneous",disabled:!e.canEdit,required:!0})]})]}),(0,q.jsx)(k.A,{className:"w-full",variant:"middle",light:!0}),(0,q.jsxs)(l.A,{spacing:1,alignItems:"flex-start",children:[(0,q.jsxs)(l.A,{direction:"row",alignItems:"center",spacing:3,children:[e.canEdit?(0,q.jsxs)(u.A,{variant:"contained",component:"label",style:{color:m&&0===i.images.length&&e.receiptRequired?"red":"rgb(255, 138, 0)"},startIcon:n.cloneElement((0,q.jsx)(h.A,{})),children:[v?(0,q.jsx)(o.A,{className:"text-[rgb(255,138,0)]",size:20}):"Upload Receipt(s) *",(0,q.jsx)("input",{accept:"image/*,application/pdf",onChange:async s=>{if(!s.target.files[0])return;w(!0);let t=[...s.target.files];t.forEach(((s,n)=>{"application/pdf"!==s.type?new(se())(s,{quality:.2,success(e){c((s=>(0,r.A)((0,r.A)({},s),{},{images:[...s.images,{name:e.name,data:e,isBase64:!1}]}))),n===t.length-1&&w(!1)},error(s){e.onError({errorMessage:"Image compression failed"})}}):c((e=>(0,r.A)((0,r.A)({},e),{},{images:[...e.images,{name:s.name,data:s,isBase64:!1}]})))})),w(!1)},type:"file",multiple:!0,hidden:!0})]}):(0,q.jsx)(u.A,{variant:"contained",startIcon:n.cloneElement((0,q.jsx)(h.A,{})),onClick:async()=>{B(!0),R(!0),await L(),B(!1)},children:"Receipt(s)"}),(0,q.jsx)("p",{children:e.request?"Submitted ".concat(e.request.date.format("MM/DD/YYYY")," by ").concat(null===(t=e.request)||void 0===t?void 0:t.first_name," ").concat(null===(a=e.request)||void 0===a?void 0:a.last_name):M()().format("MM/DD/YYYY")})]}),(0,q.jsx)(k.A,{}),e.canEdit&&[...P,...i.images].map(((e,s)=>(0,q.jsxs)(l.A,{direction:"row",alignItems:"center",spacing:1,children:[(0,q.jsx)(h.A,{}),(0,q.jsx)("p",{children:e.name.length>20?"".concat(e.name.substring(0,20),"..."):e.name}),(0,q.jsx)(j.A,{onClick:()=>(e=>{c((s=>(0,r.A)((0,r.A)({},s),{},{images:s.images.filter(((s,t)=>t!==e))})))})(s),children:(0,q.jsx)(b.A,{})})]},s)))]}),(0,q.jsx)(k.A,{className:"w-full",variant:"middle",light:!0}),0===i.comments.length||(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)("h3",{className:"m-0",children:"Comments"}),i.comments.map((e=>(0,q.jsx)(D,{id:(0,_.A)((0,z.gf)()).sub,comment:e},e.date.toString()))).sort(),(0,q.jsx)(k.A,{className:"w-full",variant:"middle",light:!0})]}),(0,q.jsx)(T.o,{comment:y,onChange:E,onSubmit:async s=>{if(s.preventDefault(),""===y)return;const t={message:y,date:M()(),user_id:(0,_.A)((0,z.gf)()).sub,first_name:e.userName.first_name,last_name:e.userName.last_name};i.comments.push(t),e.request&&(0,S.A)("/requests/","POST",{comment:t,request_id:e.request.id}),E("")},message:"Add Comment (optional)"}),(0,q.jsxs)(l.A,{direction:"row",justifyContent:"space-between",className:"w-full",children:[(0,q.jsxs)(l.A,{spacing:1,direction:"row",children:[(0,q.jsx)(u.A,{variant:"contained",onClick:()=>{$(),e.onClose()},children:"Cancel"}),(0,q.jsx)(u.A,{variant:"contained",onClick:$,disabled:!e.canEdit,children:"Reset"})]}),(0,q.jsx)(u.A,{variant:"contained",style:{backgroundColor:"rgb(255, 138, 0)",color:"white"},onClick:async s=>{if(s.preventDefault(),x||""===i.amount||""===i.item_description||e.receiptRequired&&0===i.images.length||v||""===i.team_budget)return void p(!0);A(!0);const t=(0,r.A)((0,r.A)({},i),{},{images:await Promise.all(i.images.map((async e=>{return e.isBase64?e:{name:e.name,data:await(s=e.data,new Promise((e=>{let t="",r=new FileReader;r.readAsDataURL(s),r.onload=()=>{t=r.result,e(t)}}))),isBase64:!0};var s}))),amount:parseFloat(i.amount)}),[n,a]=await(0,S.A)("/requests/",e.request?"PUT":"POST",(0,r.A)((0,r.A)((0,r.A)({},t),{},{date:M()()},e.userName),{},{request_id:e.request?e.request.id:null}));n?($(),p(!1),e.onClose(),e.onSubmit((0,r.A)((0,r.A)({},t),{},{id:e.request?e.request.id:a.id,comments:[],date:M()(),user_id:e.request?e.request.user_id:(0,_.A)((0,z.gf)()).sub})),ne.oR.success("Submitted!"),A(!1)):e.onError(a.error)},type:"submit",disabled:!e.canEdit,children:x?(0,q.jsx)(o.A,{className:"text-[rgb(255,138,0)]",size:20}):"Submit"})]})]})})]})}function oe(e){const{text:s,onClick:t,icon:r,sx:n}=e;return(0,q.jsx)(u.A,{onClick:t,startIcon:r,disableElevation:!0,disableFocusRipple:!0,disableRipple:!0,TouchRippleProps:{style:{display:"none"}},sx:n,className:"fixed bottom-2 left-1/2 m-auto transition-transform duration-300 ease-in-out",children:s})}var le=t(47644),de=t(45092);function ce(e){const[s,t]=(0,n.useState)({pendingReview:[],underReview:[],errors:[],approved:[],paid:[]}),[d,c]=(0,n.useState)(!1),[u,m]=(0,n.useState)(!1),[p,x]=(0,n.useState)(null),[h,A]=(0,n.useState)(),[g,j]=(0,n.useState)(!1),[f,v]=(0,n.useState)(!1),[b,w]=(0,n.useState)({firstName:"",lastName:""}),[C,N]=(0,n.useState)(!1),[y,E]=(0,n.useState)(!1),[_,k]=(0,n.useState)(!1);(0,n.useEffect)((()=>{const e=()=>{window.scrollY>300?E(!0):E(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)}),[]);const I=e=>(0,r.A)((0,r.A)({},e),{},{amount:parseFloat(e.amount).toFixed(2),date:M()(e.date)});(0,n.useEffect)((()=>{(async()=>{m(!0);const[e,s]=await(0,S.A)("/requests/","GET");if(!e)return A(s.error),void m(!1);j(s.treasurer),w({firstName:s.firstName,lastName:s.lastName}),delete s.treasurer,delete s.firstName,delete s.lastName,t({pendingReview:s.pendingReview.map(I),underReview:s.underReview.map(I),errors:s.errors.map(I),approved:s.approved.map(I),paid:s.paid.map(I)}),m(!1)})()}),[e]);const F=()=>{c(!1)},P=(e,s)=>{x(e),v(!g||s||!e),c(!0),k(!e)},T=async e=>{N(!!e),m(!0);const[s,r]=await(0,S.A)(e?"/requests/?user_filter=".concat(e):"/requests/","GET");s?(j(r.treasurer),w({firstName:r.firstName,lastName:r.lastName}),delete r.treasurer,delete r.firstName,delete r.lastName,t({pendingReview:r.pendingReview.map(I),underReview:r.underReview.map(I),errors:r.errors.map(I),approved:r.approved.map(I),paid:r.paid.map(I)}),m(!1)):A(r.error)};return(0,q.jsxs)(q.Fragment,{children:[(0,q.jsxs)(a.mg,{children:[(0,q.jsx)("title",{children:"Reimbursements"}),(0,q.jsx)("meta",{name:"description",content:"Your finance dashboard"})]}),h?(0,q.jsx)(R.A,{open:!h,error:h}):(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(i.A,{open:d,onClose:F,className:"w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16 overflow-auto scrollbar-hide",children:(0,q.jsx)(q.Fragment,{children:(0,q.jsx)(ie,{request:p,setRequests:t,onClose:F,onSubmit:(e,s)=>{t(s?s=>(0,r.A)((0,r.A)({},s),{},{pendingReview:[...s.pendingReview.filter((s=>s.id!==e.id))],errors:[...s.errors.filter((s=>s.id!==e.id))]}):s=>(0,r.A)((0,r.A)({},s),{},{pendingReview:[e,...s.pendingReview.filter((s=>s.id!==e.id))],errors:[...s.errors.filter((s=>s.id!==e.id))]}))},onError:e=>{A(e)},canEdit:f,userName:{first_name:b.firstName,last_name:b.lastName},receiptRequired:_})})}),u&&(0,q.jsx)(o.A,{className:"text-[rgb(255,138,0)] absolute inset-0 m-auto"}),C&&(0,q.jsx)(oe,{text:"Back to All",onClick:()=>T(),icon:(0,q.jsx)(de.A,{}),sx:{transform:"translateX(-50%)","&:hover":{background:"transparent"}}}),(0,q.jsx)(l.A,{className:"w-full h-full pt-6 px-12",justifyContent:"space-between",children:(0,q.jsx)(V,{requests:u?null:s,onEdit:P,onRequest:()=>{P(null,!1)},isTreasurer:g,userName:b,refreshRequests:T})}),(0,q.jsx)(oe,{text:"Back to Top",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),icon:(0,q.jsx)(le.A,{}),sx:{transform:"translateX(-50%) ".concat(y?"translateY(0%)":"translateY(100%)"),transition:y?"transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)":"transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)","&:hover":{background:"transparent"}}})]})]})}}}]);