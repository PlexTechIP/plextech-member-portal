(self.webpackChunkplexfinance=self.webpackChunkplexfinance||[]).push([[727],{98727:function(t,e,n){"use strict";n.r(e),n.d(e,{CategoriesPage:function(){return $},categories:function(){return l}});var r=n(74165),i=n(15861),s=n(1413),u=n(29439),a=n(47313),o=n(65964),c=n(10658),f=n.n(c),h=n(45439),d=n(46417),l=["NMEP"];function $(t){var e=(0,a.useState)({pendingReview:[],underReview:[],errors:[],approved:[],paid:[]}),n=(0,u.Z)(e,2),c=n[0],l=n[1],$=(0,a.useState)(!1),p=(0,u.Z)($,2),v=p[0],m=p[1],g=function(t){return(0,s.Z)((0,s.Z)({},t),{},{amount:t.amount.toFixed(2),date:f()(t.date)})};return(0,a.useEffect)((function(){var t=function(){var t=(0,i.Z)((0,r.Z)().mark((function t(){var e,n,i;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,h.N)("/requests/","GET");case 2:e=t.sent,n=(0,u.Z)(e,2),i=n[1],m(i.treasurer),delete i.treasurer,delete i.firstName,delete i.lastName,l({pendingReview:i.pendingReview.map(g),underReview:i.underReview.map(g),errors:i.errors.map(g),approved:i.approved.map(g),paid:i.paid.map(g)});case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[t]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(o.ql,{children:[(0,d.jsx)("title",{children:"Categories"}),(0,d.jsx)("meta",{name:"description",content:"Your finance dashboard"})]}),v?Object.values(c.pendingReview.reduce((function(t,e){var n=e.team_budget;return t[n]=(t[n]||0)+Number(e.amount),t}),{})).map((function(t,e){return(0,d.jsx)("p",{children:"Total amount for category ".concat(c.pendingReview[e].team_budget,": $").concat(t.toFixed(2))},e)})):(0,d.jsx)("p",{children:"You do not have access to this section."})]})}},10658:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},M="en",y={};y[M]=v;var w=function(t){return t instanceof _},D=function t(e,n,r){var i;if(!e)return M;if("string"==typeof e){var s=e.toLowerCase();y[s]&&(i=s),n&&(y[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;y[a]=e,i=a}return!r&&i&&(M=i),i||!r&&M},S=function(t,e){if(w(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=D,O.i=w,O.w=function(t,e){return S(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function v(t){this.$L=D(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=S(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return S(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<S(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,f=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},p=this.$W,v=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,v):l(0,v+1);case o:var M=this.$locale().weekStart||0,y=(p<M?p+7:p)-M;return l(r?m-y:m+(6-y),v);case a:case d:return $(g+"Hours",0);case u:return $(g+"Minutes",1);case s:return $(g+"Seconds",2);case i:return $(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var p=this.clone().set(d,1);p.$d[l]($),p.init(),this.$d=p.set(d,Math.min(this.$D,p.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=O.p(f),p=function(t){var e=S(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return p(1);if($===o)return p(7);var v=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*v;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},h=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:f(n.monthsShort,a,c,3),MMMM:f(c,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,o,2),ddd:f(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:h(1),hh:h(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(p,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,p=O.p(d),v=S(r),m=(v.utcOffset()-this.utcOffset())*e,g=this-v,M=O.m(this,v);return M=($={},$[h]=M/12,$[c]=M,$[f]=M/3,$[o]=(g-m)/6048e5,$[a]=(g-m)/864e5,$[u]=g/n,$[s]=g/e,$[i]=g/t,$)[p]||g,l?M:O.a(M)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),x=_.prototype;return S.prototype=x,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),S.extend=function(t,e){return t.$i||(t(e,_,S),t.$i=!0),S},S.locale=D,S.isDayjs=w,S.unix=function(t){return S(1e3*t)},S.en=y[M],S.Ls=y,S.p={},S}()}}]);