(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var i=n(537),s=n.n(i),r=n(645),a=n.n(r)()(s());a.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var d=0;d<t.length;d++){var c=[].concat(t[d]);i&&a[c[0]]||(void 0!==r&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=r),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),s&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=s):c[4]="".concat(s)),e.push(c))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",d="quarter",c="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=v;var $=function(t){return t instanceof C},b=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,s=o}return!i&&s&&(y=s),s||!i&&y},w=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new C(n)},M=_;M.l=b,M.i=$,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,d=!!M.u(e)||e,p=M.p(t),f=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return d?i:i.endOf(a)},h=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case c:return d?f(1,0):f(31,11);case l:return d?f(1,m):f(0,m+1);case o:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return f(d?_-$:_+(6-$),m);case a:case u:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,d=M.p(t),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[u]=p+"Date",o[l]=p+"Month",o[c]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[d],h=d===a?this.$D+(e-this.$W):e;if(d===l||d===c){var v=this.clone().set(u,1);v.$d[f](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[M.p(t)]()},m.add=function(n,d){var u,p=this;n=Number(n);var f=M.p(d),h=function(t){var e=w(p);return M.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return h(1);if(f===o)return h(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[f]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,d=n.months,c=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return M.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:M.s(o+1,2,"0"),MMM:c(n.monthsShort,o,d,3),MMMM:c(d,o),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:M.s(a,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,p){var f,h=M.p(u),v=w(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=M.m(this,v);return y=(f={},f[c]=y/12,f[l]=y,f[d]=y/3,f[o]=(_-m)/6048e5,f[a]=(_-m)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?y:M.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),E=C.prototype;return w.prototype=E,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",u]].forEach((function(t){E[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,C,w),t.$i=!0),w},w.locale=b,w.isDayjs=$,w.unix=function(t){return w(1e3*t)},w.en=g[y],w.Ls=g,w.p={},w}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},a=[],o=0;o<t.length;o++){var l=t[o],d=i.base?l[0]+i.base:l[0],c=r[d]||0,u="".concat(d," ").concat(c);r[d]=c+1;var p=n(u),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var h=s(f,i);i.byIndex=o,e.splice(o,0,{identifier:u,updater:h,references:1})}a.push(u)}return a}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var a=0;a<r.length;a++){var o=n(r[a]);e[o].references--}for(var l=i(t,s),d=0;d<r.length;d++){var c=n(r[d]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";function t(t,e,n="beforeend"){if(!(t instanceof g))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function e(t,e){if(!(t instanceof g&&e instanceof g))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function i(t){if(null!==t){if(!(t instanceof g))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}var s=n(379),r=n.n(s),a=n(795),o=n.n(a),l=n(569),d=n.n(l),c=n(565),u=n.n(c),p=n(216),f=n.n(p),h=n(589),v=n.n(h),m=n(10),_={};_.styleTagTransform=v(),_.setAttributes=u(),_.insert=d().bind(null,"head"),_.domAPI=o(),_.insertStyleElement=f(),r()(m.Z,_),m.Z&&m.Z.locals&&m.Z.locals;const y="shake";class g{#t=null;constructor(){if(new.target===g)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),t?.()}),600)}}class $ extends g{get template(){return'<ul class="trip-events__list"></ul>'}}class b extends g{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}}var w=n(484),M=n.n(w);const C=(t,e)=>{const n=Math.ceil(Math.min(t,e)),i=Math.floor(Math.max(t,e)),s=Math.random()*(i-n+1)+n;return Math.floor(s)},E=((t=0,e=Number.MAX_SAFE_INTEGER)=>{const n=[];return()=>{let i=0;if(n.length>=e-t+1)return console.error(`Перебраны все числа из диапазона от ${t} до ${e}`),null;do{i=C(t,e)}while(n.includes(i));return n.push(i),i}})(),S=t=>t[C(0,t.length-1)],A=(t,e)=>Array.from({length:t},e),D=(t,e)=>M()(t).format(e),T=(t,e,n)=>{const i=[],s=C(e,n),r=[];let a;if(0===s||0===t.length)return[];for(let e=0;e<s;e++){if(t.length<s)return i;do{a=S(t)}while(r.includes(a));i.push(a),r.push(a)}return i},k=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],x=["May 10, 2024 10:25:00","May 10, 2024 09:40:00","May 10, 2024 06:40:00","May 10, 2024 03:05:00","May 10, 2024 10:30:00"],F=["May 10, 2024 10:55:00","May 11, 2024 14:00:00","May 10, 2024 11:05:00","May 10, 2024 15:10:00","May 10, 2024 11:30:00"],L={basePrice:0,dateFrom:new Date,dateTo:new Date,destination:"",isFavorite:!1,offers:[],type:"Flight"},I={FULL:"DD/MM/YY HH:mm",ATTRIBUTE_WITH_TIME:"YYYY-MM-DD HH:mm",ATTRIBUTE_WITHOUT_TIME:"YYYY-MM-DD",DAY:"MMM DD",TIME:"HH:mm"},H="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus".split("."),O={taxi:["Switch to comfort","Switch to business"],bus:["Choose seats","Add luggage","Window seat"],train:["Transportation of animals","Add meal"],ship:[],drive:["Off-road","With a driver","Unique auto","Van"],flight:["Switch to business","Add luggage","Add meal"],"check-in":["Add breakfast"],sightseeing:["Book a ticket","Audio guide","Lunch in city"],restaurant:[]},W=t=>{const e=t.replace(/ /gi,"-");return e.charAt(0).toLowerCase()+e.slice(1)};class Y extends g{#e=null;#n=null;#i=null;#s=null;#r=null;#a=null;constructor({waypoint:t=L,destinations:e,offers:n,onFormSubmit:i,onFormReset:s}){super(),this.#e=t,this.#n=e,this.#i=n,this.#s=i,this.#r=s,this.#a=this.element.querySelector(".event--edit"),this.#a.addEventListener("submit",this.#o),this.#a.addEventListener("reset",this.#l),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l)}get template(){return((t,e,n)=>{const{type:i,dateFrom:s,dateTo:r,basePrice:a}=t,o=e.find((e=>e.id===t.destination)),l=n.find((e=>e.type===t.type)).offers,d=t.id||0;return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n           <label class="event__type  event__type-btn" for="event-type-toggle-${d}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${d}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n\n                ${k.map((t=>{return`\n                <div class="event__type-item">\n                  <input id="event-type-${t}-${d}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===i?"checked":""}>\n                  <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${d}">${e=t,e.charAt(0).toUpperCase()+e.slice(1)}</label>\n                </div>`;var e})).join("")}\n\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-${d}">\n              ${i}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-${d}" type="text" name="event-destination" value="${d?o.name:""}" list="destination-list-${d}">\n            <datalist id="destination-list-${d}">\n\n              ${e.map((t=>`<option value="${t.name}"></option>`)).join("")}\n\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${D(s,I.FULL)}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${D(r,I.FULL)}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">${a}</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${a}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">${d?"Delete":"Cancel"}</button>\n          ${d?'\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>':""}\n\n        </header>\n\n        ${o||l.length?`\n        <section class="event__details">\n\n          ${l.length?`\n            <section class="event__section  event__section--offers">\n              <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n              <div class="event__available-offers">\n\n                ${l.map((e=>`\n                  <div class="event__offer-selector">\n                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${W(e.title)}-${e.id}" type="checkbox" name="event-offer-${W(e.title)}" ${t.offers.includes(e.id)?"checked":""}>\n                      <label class="event__offer-label" for="event-offer-${W(e.title)}-${e.id}">\n                        <span class="event__offer-title">${e.title}</span>\n                        &plus;&euro;&nbsp;\n                        <span class="event__offer-price">${e.price}</span>\n                      </label>\n                  </div>`)).join("")}\n\n              </div>\n            </section>\n          `:""}\n\n            <section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">${o.description}</p>\n              ${o.pictures.length?`\n              <div class="event__photos-container">\n                <div class="event__photos-tape">\n\n                  ${o.pictures.map((t=>`<img class="event__photo" src=${t.src} alt="${t.description}"></img>`)).join("")}\n\n                </div>\n              </div>\n              `:""}\n\n            </section>\n\n        </section>`:""}\n\n      </form>\n    </li>`})(this.#e,this.#n,this.#i)}#o=t=>{t.preventDefault(),this.#s()};#l=t=>{t.preventDefault(),this.#r()}}const{ATTRIBUTE_WITH_TIME:U,ATTRIBUTE_WITHOUT_TIME:R,DAY:B,TIME:P}=I,{MINUTES:j,HOURS:q,DAYS:N}={MINUTES:"M",HOURS:"H",DAYS:"D"};class Z extends g{#e=null;#n=null;#i=null;#d=null;#c=null;constructor({waypoint:t,destinations:e,offers:n,onEditClick:i,onFavoriteClick:s}){super(),this.#e=t,this.#n=e,this.#i=n,this.#d=i,this.#c=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#u),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#p)}get template(){return((t,e,n)=>{const{type:i,dateFrom:s,dateTo:r,basePrice:a,isFavorite:o}=t,l=e.find((e=>e.id===t.destination)),d=n.find((e=>e.type===t.type)).offers.filter((e=>t.offers.includes(e.id))),c=o?"event__favorite-btn--active":"",u=M()(r).diff(M()(s));return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${D(s,R)}">${D(s,B)}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i.toLowerCase()}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${i} ${l.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${D(s,U)}">${D(s,P)}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${D(r,U)}">${D(r,P)}</time>\n          </p>\n          <p class="event__duration">${(({minutes:t,hours:e,days:n})=>t<60?`${String(t).padStart(2,"0")}${j}`:e<24?`${String(e).padStart(2,"0")}${q} ${String(t%60).padStart(2,"0")}${j}`:`${String(n).padStart(2,"0")}${N} ${String(e%24).padStart(2,"0")}${q} ${String(t%60).padStart(2,"0")}${j}`)((t=>{const e=t/1e3,n=Math.floor(e/60),i=Math.floor(n/60);return{minutes:n,hours:i,days:Math.floor(i/24)}})(u))}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${a}</span>\n        </p>\n\n        ${d.length?`\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n            ${d.map((t=>`\n              <li class="event__offer">\n                <span class="event__offer-title">${t.title}</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">${t.price}</span>\n              </li>\n            `)).join("")}\n          </ul>\n        `:""}\n\n        <button class="event__favorite-btn ${c}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`})(this.#e,this.#n,this.#i)}#u=t=>{t.preventDefault(),this.#d()};#p=t=>{t.preventDefault(),this.#c()}}const X="DEFAULT",z="EDITING";class J{#f=null;#h=null;#v=null;#m=null;#_=null;#e=null;#n=null;#i=null;#y=X;constructor(t,e,n){this.#f=t,this.#h=e,this.#v=n}init(n,s,r){this.#e=n,this.#n=s,this.#i=r;const a=this.#m,o=this.#_;this.#m=new Z({waypoint:this.#e,destinations:this.#n,offers:this.#i,onEditClick:this.#d,onFavoriteClick:this.#c}),this.#_=new Y({waypoint:this.#e,destinations:this.#n,offers:this.#i,onFormSubmit:this.#s,onFormReset:this.#r}),null!==a&&null!==o?(this.#y===X&&e(this.#m,a),this.#y===z&&e(this.#_,o),i(a),i(o)):t(this.#m,this.#f)}destroy(){i(this.#m),i(this.#_)}modeReset(){"DEFAULT"!==this.#y&&this.#g()}#$=t=>{(t=>"Escape"===t.key)(t)&&(t.preventDefault(),this.#g())};#b(){this.#v(),e(this.#_,this.#m),document.addEventListener("keydown",this.#$),this.#y=z}#g(){e(this.#m,this.#_),document.removeEventListener("keydown",this.#$),this.#y=X}#d=()=>{this.#b()};#s=()=>{this.#g()};#r=()=>{this.#g()};#c=()=>{this.#e.isFavorite=!this.#e.isFavorite,this.#h(this.#e)}}const K=()=>({src:`https://loremflickr.com/248/152?random=${C(1,100)}`,description:S(H)}),V=["Podgorica","London","Istanbul","Saint Petersburg","Berlin","Belgrade","Rome","Kyiv","Sofia"].map((t=>(t=>({id:E(),description:T(H,1,5).join(". "),name:t,pictures:A(C(0,5),K)}))(t))),G=k.map((t=>({type:t,offers:O[t].map((t=>({id:E(),title:t,price:C(25,125)})))}))),Q=A(8,(()=>{const t=S(k),e=(t=>{for(const e of G)if(e.type===t)return e.offers})(t).map((t=>t.id));return{id:E(),type:t,basePrice:C(200,1e3),dateFrom:new Date(S(x)),dateTo:new Date(S(F)),destination:S(V).id,isFavorite:Math.random()>.5,offers:T(e,0,2)}})),tt=document.querySelector(".trip-main"),et=tt.querySelector(".trip-controls__filters"),nt=document.querySelector(".trip-events"),it=new class{#w=Q;#n=V;#i=G;get waypoints(){return this.#w}get destinations(){return this.#n}get offers(){return this.#i}},st=new class{#M=null;#C=null;#E=new $;#S=[];#n=[];#i=[];#A=new Map;constructor({eventContainer:t,waypointsModel:e}){this.#M=t,this.#C=e}init(){this.#S=[...this.#C.waypoints],this.#n=[...this.#C.destinations],this.#i=[...this.#C.offers],t(new b,this.#M),t(this.#E,this.#M);for(let t=0;t<this.#S.length;t++)this.#D(this.#S[t],this.#n,this.#i)}#h=t=>{this.#S=this.#S.map((e=>e.id===t.id?t:e)),this.#A.get(t.id).init(t,this.#n,this.#i)};#v=()=>{this.#A.forEach((t=>t.modeReset()))};#D(t,e,n){const i=new J(this.#E.element,this.#h,this.#v);i.init(t,e,n),this.#A.set(t.id,i)}}({eventContainer:nt,waypointsModel:it});t(new class extends g{get template(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}},tt,"afterbegin"),t(new class extends g{get template(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}},et),st.init()})()})();
//# sourceMappingURL=bundle.2f5b8169ed42abed0bbd.js.map