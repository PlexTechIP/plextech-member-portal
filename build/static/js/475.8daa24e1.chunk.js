"use strict";(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[475],{58574:(e,t,s)=>{s.d(t,{A:()=>u});var a=s(5446),n=s(2235),r=s(88981),i=s(25333),l=s(9950),c=s(4804),o=s(54975),d=s(44414);function u(e){return(0,l.useEffect)((()=>{console.warn(e.error)})),(0,d.jsx)(a.A,{open:e.open,className:"w-1/2 min-w-[500px] h-full absolute inset-0 m-auto p-16",children:(0,d.jsx)(n.A,{className:"p-12 !rounded-[48px]",children:(0,d.jsxs)(r.A,{spacing:2,children:[(0,d.jsxs)(r.A,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,d.jsxs)("h1",{className:"m-0 text-3xl",children:["Error",e.error.errorCode&&" ".concat(e.error.errorCode),":"," ",e.error.errorMessage]}),(0,d.jsx)(i.A,{onClick:()=>{window.location.reload()},children:(0,d.jsx)(c.A,{})})]}),(0,d.jsxs)("p",{className:"m-0",children:["Try refreshing the page and contact"," ",(0,d.jsx)("a",{href:"mailto:shamith09@berkeley.edu?subject=[Plexfinance Error]",children:"shamith09@berkeley.edu"})," ","if the issue persists."]}),(0,d.jsx)("img",{src:o.kD,alt:"error"})]})})})}},22475:(e,t,s)=>{s.r(t),s.d(t,{ProfilePage:()=>C});var a=s(89379),n=s(9950),r=s(76455),i=s(58574),l=s(88981),c=s(48089),o=s(75165),d=s(41413),u=s(25333),m=s(87498),h=s(2257),x=s(64068),p=s(53777),g=s(71559),j=s.n(g),f=s(96583),b=s(28170),w=s(79739),v=s(33742),y=s(70969),A=s(44414);const k=j();function C(e){const[t,s]=(0,n.useState)(),[g,j]=(0,n.useState)(),[C,N]=(0,n.useState)(""),[_,P]=(0,n.useState)(!1),[S,T]=(0,n.useState)(null),W=n.useRef(null),[q,I]=(0,n.useState)(!1),[U,E]=(0,n.useState)(""),[L,B]=(0,n.useState)(""),[R,D]=(0,n.useState)(""),[F,M]=(0,n.useState)(!1),[$,G]=(0,n.useState)(""),[Y,O]=(0,n.useState)(""),[Z,z]=(0,n.useState)(""),[H,J]=(0,n.useState)(""),[K,Q]=(0,n.useState)(""),[V,X]=(0,n.useState)(""),[ee,te]=(0,n.useState)(""),[se,ae]=(0,n.useState)(""),[ne,re]=(0,n.useState)(""),[ie,le]=(0,n.useState)(""),[ce,oe]=(0,n.useState)(1.2),[de,ue]=(0,n.useState)(""),[me,he]=(0,n.useState)(!1);(0,n.useEffect)((()=>{(async()=>{const[e,t]=await(0,x.A)("/profile/","GET");e?(j(t),I(t.treasurer),G(t.bluevine_email),O(t.bluevine_password),z(t.current_position||""),J(t.profile_blurb||""),Q(t.linkedin_username||""),X(t.instagram_username||""),te(t.calendly_username||""),ae(t.current_company||""),re(t.first_name||""),le(t.last_name||""),N("".concat("https://plextech.studentorg.berkeley.edu/member-portal-api","/profile/image/").concat(t.id,"?").concat((new Date).getTime())),he(!!t.plaid_access_token),t.bank&&(E(t.bank.account_number),B(t.bank.routing_number),D(t.bank.bank_name))):s(t.error)})()}),[e]),(0,n.useEffect)((()=>{(async()=>{const[e,t]=await(0,x.A)("/bank/","GET");e&&ue(t.link_token)})()}),[]);const{open:xe,ready:pe}=(0,y.usePlaidLink)({token:de,onSuccess:async(e,t)=>{const[a,n]=await(0,x.A)("/bank/","PUT",{public_token:e});a?M(!0):s(n.error)}});return(0,A.jsxs)(l.A,{spacing:4,justifyContent:"center",alignItems:"center",className:"w-full pt-8 px-8",children:[(0,A.jsxs)(r.mg,{children:[(0,A.jsx)("title",{children:"Profile"}),(0,A.jsx)("meta",{name:"description",content:"Profile information"})]}),t&&(0,A.jsx)(i.A,{open:!!t,error:t}),(0,A.jsx)(c.A,{className:"px-16 py-16 w-full max-w-[1000px] !rounded-[32px] justify-center items-center",children:(0,A.jsx)(l.A,{spacing:4,children:g&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,A.jsx)("h1",{className:"text-2xl m-0",children:"Member Details"}),(0,A.jsx)(o.A,{onClick:async()=>{const[e,t]=await(0,x.A)("/profile/","PUT",{current_position:Z,profile_blurb:H,linkedin_username:K,instagram_username:V,calendly_username:ee,current_company:se,first_name:ne,last_name:ie});e?M(!0):s(t.error)},variant:"contained",disabled:H===g.profile_blurb&&K===g.linkedin_username&&V===g.instagram_username&&ee===g.calendly_username&&se===g.current_company&&ne===g.first_name&&ie===g.last_name||""!==K&&!K.startsWith("https://www.linkedin.com/")||""!==V&&!V.startsWith("https://www.instagram.com/")||""!==ee&&!ee.startsWith("https://calendly.com/")||""===H||""===ne||""===ie,children:"Update"})]}),(0,A.jsx)("div",{className:"flex flex-col items-center mb-4",children:(0,A.jsx)("div",{className:"relative",children:(0,A.jsxs)("div",{className:"flex items-end",children:[(0,A.jsxs)("div",{className:"flex flex-col items-center",children:[(0,A.jsx)("h3",{className:"text-lg mb-2",children:"Profile Picture"}),(0,A.jsx)(d.A,{src:C,sx:{width:150,height:150},className:"cursor-pointer"}),(0,A.jsx)("input",{accept:"image/*",type:"file",id:"icon-button-file",onChange:e=>{e.target.files&&e.target.files[0]&&(T(e.target.files[0]),P(!0))},className:"hidden"})]}),(0,A.jsx)("label",{htmlFor:"icon-button-file",children:(0,A.jsx)(u.A,{className:"absolute bottom-0 right-0 bg-white shadow-md hover:bg-gray-100",component:"span",children:(0,A.jsx)(v.A,{})})})]})})}),(0,A.jsxs)(f.A,{open:_,onClose:()=>P(!1),PaperProps:{style:{borderRadius:"24px",padding:"16px"}},children:[(0,A.jsxs)(b.A,{className:"!pb-0",children:[(0,A.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Edit Profile Picture"}),S&&(0,A.jsxs)("div",{className:"flex flex-col items-center",children:[(0,A.jsx)(k,{ref:W,image:S,width:250,height:250,border:50,borderRadius:125,color:[0,0,0,.6],scale:ce}),(0,A.jsxs)("div",{className:"mt-6 w-full",children:[(0,A.jsx)("p",{className:"text-sm text-gray-600 mb-2",children:"Zoom"}),(0,A.jsx)(m.Ay,{value:ce,min:1,max:3,step:.1,onChange:(e,t)=>oe(t)})]})]})]}),(0,A.jsxs)(w.A,{className:"p-6",children:[(0,A.jsx)(o.A,{onClick:()=>P(!1),children:"Cancel"}),(0,A.jsx)(o.A,{variant:"contained",onClick:async()=>{if(W.current){const e=W.current.getImageScaledToCanvas(),t=document.createElement("canvas");t.width=500,t.height=500;const s=t.getContext("2d");null===s||void 0===s||s.drawImage(e,0,0,500,500),t.toBlob((async e=>{if(!e)return;const t=new FormData;t.append("image",e,"profile.jpg");const[s]=await(0,x.A)("/profile/image/","PUT",t);s&&(N("".concat("https://plextech.studentorg.berkeley.edu/member-portal-api","/profile/image/").concat(null===g||void 0===g?void 0:g.id,"?").concat((new Date).getTime())),P(!1),M(!0))}),"image/jpeg",.8)}},children:"Save"})]})]}),(0,A.jsxs)(l.A,{direction:"row",spacing:2,children:[(0,A.jsx)(h.A,{fullWidth:!0,label:"First Name",value:ne,onChange:e=>re(e.target.value),required:!0,error:""===ne,helperText:""===ne?"First name is required":""}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Last Name",value:ie,onChange:e=>le(e.target.value),required:!0,error:""===ie,helperText:""===ie?"Last name is required":""})]}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Current Position (admin only)",value:Z,onChange:e=>z(e.target.value),InputProps:{readOnly:!q},disabled:!q,error:q&&""===Z,helperText:q&&""===Z?"Position is required for admins":""}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Profile Blurb",value:H,onChange:e=>J(e.target.value),multiline:!0,rows:4,required:!0,inputProps:{maxLength:250},error:""===H,helperText:""===H?"Profile blurb is required":"".concat(H.length," / 250")}),(0,A.jsx)(h.A,{fullWidth:!0,label:"LinkedIn URL",value:K,onChange:e=>Q(e.target.value),error:""!==K&&!K.startsWith("https://www.linkedin.com/"),helperText:""===K||K.startsWith("https://www.linkedin.com/")?"":"Must be a valid LinkedIn URL",required:!0}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Instagram URL",value:V,onChange:e=>X(e.target.value),error:""!==V&&!V.startsWith("https://www.instagram.com/"),helperText:""===V||V.startsWith("https://www.instagram.com/")?"":"Must be a valid Instagram URL",required:!0}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Calendly URL",value:ee,onChange:e=>te(e.target.value),error:""!==ee&&!ee.startsWith("https://calendly.com/"),helperText:""===ee||ee.startsWith("https://calendly.com/")?"":"Must be a valid Calendly URL",required:!0}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Current Company",value:se,onChange:e=>ae(e.target.value),error:""===se,helperText:""===se?"Company is required":"",required:!0})]})})}),g&&(0,A.jsx)(c.A,{className:"px-16 py-16 w-full max-w-[1000px] !rounded-[32px] justify-center items-center",children:(0,A.jsxs)(l.A,{spacing:4,children:[(0,A.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,A.jsx)("h1",{className:"text-2xl m-0",children:"Bank Details"}),(0,A.jsx)(o.A,{onClick:()=>{pe&&xe()},variant:"contained",children:me?"Update Bank Connection":"Connect Bank Account"})]}),me?(0,A.jsx)("p",{className:"text-green-600",children:"\u2713 Bank account connected via Plaid"}):(0,A.jsx)("p",{className:"text-gray-500",children:"Connect your bank account to receive reimbursements"}),(0,A.jsxs)(l.A,{direction:"row",alignItems:"center",spacing:1,justifyContent:"flex-end",children:[(0,A.jsx)(p.A,{className:"text-gray-500 text-sm"}),(0,A.jsx)("p",{className:"m-0 text-gray-500",children:"Your bank connection is securely managed by Plaid."})]})]})}),q&&g&&(0,A.jsx)(c.A,{className:"px-16 py-16 w-full max-w-[1000px] !rounded-[32px] justify-center items-center",children:(0,A.jsxs)(l.A,{spacing:4,children:[(0,A.jsxs)(l.A,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,A.jsx)("h1",{className:"text-2xl m-0",children:"Bluevine Details (admin only)"}),(0,A.jsx)(o.A,{onClick:async()=>{const e={bluevineEmail:$};Y&&Y!==(null===g||void 0===g?void 0:g.bluevinePassword)&&(e.bluevinePassword=Y);const[t,n]=await(0,x.A)("/bluevine/","PUT",e);t?(j((t=>(0,a.A)((0,a.A)({},t),{},{bodyData:e}))),M(!0)):s(n.error)},variant:"contained",disabled:!$||!Y||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($)||Y===g.bluevinePassword&&$===g.bluevineEmail,children:g.bank?"Update":"Submit"})]}),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(h.A,{fullWidth:!0,label:"Bluevine Email",onChange:e=>G(e.target.value),required:!0,error:!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($),helperText:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($)?"":"Must be a valid email address",value:$}),(0,A.jsx)(h.A,{fullWidth:!0,label:"Bluevine Password",value:Y,onChange:e=>O(e.target.value),error:!Y,helperText:Y?"":"Password is required",required:!0,type:"password"})]}),(0,A.jsxs)(l.A,{direction:"row",alignItems:"center",spacing:1,justifyContent:"flex-end",children:[(0,A.jsx)(p.A,{className:"text-gray-500 text-sm"}),(0,A.jsx)("p",{className:"m-0 text-gray-500",children:"Your information is securely encrypted with Fernet."})]})]})})]})}}}]);