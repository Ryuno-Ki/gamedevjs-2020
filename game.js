/**
 * This game is a homage to https://xkcd.com/2291/
 * Copyright (C) 2020 - André Jaenisch
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";let t,e,i={};function n(t,e){i[t]=i[t]||[],i[t].push(e)}function s(t,e){let n;!i[t]||(n=i[t].indexOf(e))<0||i[t].splice(n,1)}function o(t,...e){i[t]&&i[t].map(t=>t(...e))}function r(){return t}function h(){return e}function a(i){if(t=document.getElementById(i)||i||document.querySelector("canvas"),!t)throw Error("You must provide a canvas element for the game");return e=t.getContext("2d"),e.imageSmoothingEnabled=!1,o("init"),{canvas:t,context:e}}class c{constructor({spriteSheet:t,frames:e,frameRate:i,loop:n=!0}={}){this.spriteSheet=t,this.frames=e,this.frameRate=i,this.loop=n;let{width:s,height:o,margin:r=0}=t.frame;this.width=s,this.height=o,this.margin=r,this._f=0,this._a=0}clone(){return d(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:i=this.width,height:n=this.height,context:s=h()}={}){let o=this.frames[this._f]/this.spriteSheet._f|0,r=this.frames[this._f]%this.spriteSheet._f|0;s.drawImage(this.spriteSheet.image,r*this.width+(2*r+1)*this.margin,o*this.height+(2*o+1)*this.margin,this.width,this.height,t,e,i,n)}}function d(t){return new c(t)}d.prototype=c.prototype,d.class=c;let l=/(jpeg|jpg|gif|png)$/,u=/(wav|mp3|ogg|aac)$/,f=/^\//,p=/\/$/,m=new WeakMap,g="",y="",w="";function _(t,e){return new URL(t,e).href}function x(t,e){return[t.replace(p,""),t?e.replace(f,""):e].filter(t=>t).join("/")}function v(t){return t.split(".").pop()}function b(t){let e=t.replace("."+v(t),"");return 2==e.split("/").length?e.replace(f,""):e}let S={},A={},P={};function E(){window.__k||(window.__k={dm:m,u:_,d:P,i:S})}function O(t){g=t}function j(t){y=t}function k(t){w=t}function I(t){return E(),new Promise((e,i)=>{let n,s,r;if(n=x(g,t),S[n])return e(S[n]);s=new Image,s.onload=function(){r=_(n,window.location.href),S[b(t)]=S[n]=S[r]=this,o("assetLoaded",this,t),e(this)},s.onerror=function(){i("Unable to load image "+n)},s.src=n})}function L(t){return new Promise((e,i)=>{let n,s,r,h;var a;return n=new Audio,s={wav:"",mp3:(a=n).canPlayType("audio/mpeg;"),ogg:a.canPlayType('audio/ogg; codecs="vorbis"'),aac:a.canPlayType("audio/aac;")},(t=[].concat(t).reduce((t,e)=>t||(s[v(e)]?e:null),0))?(r=x(y,t),A[r]?e(A[r]):(n.addEventListener("canplay",(function(){h=_(r,window.location.href),A[b(t)]=A[r]=A[h]=this,o("assetLoaded",this,t),e(this)})),n.onerror=function(){i("Unable to load audio "+r)},n.src=r,void n.load())):i("cannot play any of the audio formats provided"+t)})}function M(t){let e,i;return E(),e=x(w,t),P[e]?Promise.resolve(P[e]):fetch(e).then(t=>{if(!t.ok)throw t;return t.clone().json().catch(()=>t.text())}).then(n=>(i=_(e,window.location.href),"object"==typeof n&&m.set(n,i),P[b(t)]=P[e]=P[i]=n,o("assetLoaded",n,t),n))}function D(...t){return E(),Promise.all(t.map(t=>{let e=v([].concat(t)[0]);return e.match(l)?I(t):e.match(u)?L(t):M(t)}))}const W=()=>{};function T(){let t=r();h().clearRect(0,0,t.width,t.height)}function C({fps:t=60,clearCanvas:e=!0,update:i,render:n}={}){if(!i||!n)throw Error("You must provide update() and render() functions");let s,r,h,a,c,d=0,l=1e3/t,u=1/t,f=e?T:W;function p(){if(r=requestAnimationFrame(p),h=performance.now(),a=h-s,s=h,!(a>1e3)){for(o("tick"),d+=a;d>=l;)c.update(u),d-=l;f(),c.render()}}return c={update:i,render:n,isStopped:!0,start(){s=performance.now(),this.isStopped=!1,requestAnimationFrame(p)},stop(){this.isStopped=!0,cancelAnimationFrame(r)},_frame:p,set _last(t){s=t}},c}let R={},z={},N={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"left",ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"};function Y(t){let e=N[t.code||t.which];z[e]=!0,R[e]&&R[e](t)}function U(t){z[N[t.code||t.which]]=!1}function H(){z={}}function B(){let t;for(t=0;t<26;t++)N[t+65]=N["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)N[48+t]=N["Digit"+t]=""+t;window.addEventListener("keydown",Y),window.addEventListener("keyup",U),window.addEventListener("blur",H)}function K(t,e){[].concat(t).map(t=>R[t]=e)}function G(t){[].concat(t).map(t=>R[t]=0)}function X(t){return!!z[t]}function $(t){let e=t.substr(t.search(/[A-Z]/));return e[0].toLowerCase()+e.substr(1)}function q(t,e){let i=t.indexOf(e);-1!==i&&t.splice(i,1)}function F(t,e){let i=t.prototype;i&&(i._inc||(i._inc={},i._bInc=function(t,e,...i){return this._inc[e].before.reduce((e,i)=>{let n=i(t,...e);return n||e},i)},i._aInc=function(t,e,i,...n){return this._inc[e].after.reduce((e,i)=>{let s=i(t,e,...n);return s||e},i)}),Object.getOwnPropertyNames(e).forEach(t=>{let n=$(t);i[n]&&(i["_o"+n]||(i["_o"+n]=i[n],i[n]=function(...t){let e=this._bInc(this,n,...t),s=i["_o"+n].call(this,...e);return this._aInc(this,n,s,...t)}),i._inc[n]||(i._inc[n]={before:[],after:[]}),t.startsWith("before")?i._inc[n].before.push(e[t]):t.startsWith("after")&&i._inc[n].after.push(e[t]))}))}function J(t,e){let i=t.prototype;i&&i._inc&&Object.getOwnPropertyNames(e).forEach(t=>{let n=$(t);t.startsWith("before")?q(i._inc[n].before,e[t]):t.startsWith("after")&&q(i._inc[n].after,e[t])})}function Q(t,e){let i=t.prototype;i&&Object.getOwnPropertyNames(e).forEach(t=>{i[t]||(i[t]=e[t])})}let V=[],Z=[],tt={},et=[],it={},nt={0:"left",1:"middle",2:"right"},st={x:0,y:0,radius:5};function ot(t,e){const i=e||st;let n=t.x,s=t.y;t.anchor&&(n-=t.width*t.anchor.x,s-=t.height*t.anchor.y);let o=i.x-Math.max(n,Math.min(i.x,n+t.width)),r=i.y-Math.max(s,Math.min(i.y,s+t.height));return o*o+r*r<i.radius*i.radius}function rt(t){const e=t||st;let i,n,s=Z.length?Z:V;for(let t=s.length-1;t>=0;t--)if(i=s[t],n=i.collidesWithPointer?i.collidesWithPointer(e):ot(i,e),n)return i}function ht(t){let e=void 0!==t.button?nt[t.button]:"left";it[e]=!0,lt(t,"onDown")}function at(t){let e=void 0!==t.button?nt[t.button]:"left";it[e]=!1,lt(t,"onUp")}function ct(t){lt(t,"onOver")}function dt(){it={}}function lt(t,e){let i,n,s=r();if(!s)return;let o=s.height/s.offsetHeight,h=s.getBoundingClientRect(),a=-1!==["touchstart","touchmove","touchend"].indexOf(t.type);if(a){st.touches={};for(var c=0;c<t.touches.length;c++)st.touches[t.touches[c].identifier]={id:t.touches[c].identifier,x:(t.touches[c].clientX-h.left)*o,y:(t.touches[c].clientY-h.top)*o,changed:!1};for(c=t.changedTouches.length;c--;){const s=t.changedTouches[c].identifier;void 0!==st.touches[s]&&(st.touches[s].changed=!0),i=t.changedTouches[c].clientX,n=t.changedTouches[c].clientY;let r=rt({id:s,x:(i-h.left)*o,y:(n-h.top)*o,radius:st.radius});r&&r[e]&&r[e](t),tt[e]&&tt[e](t,r)}}else i=t.clientX,n=t.clientY;if(st.x=(i-h.left)*o,st.y=(n-h.top)*o,t.preventDefault(),!a){let i=rt();i&&i[e]&&i[e](t),tt[e]&&tt[e](t,i)}}function ut(){let t=r();t.addEventListener("mousedown",ht),t.addEventListener("touchstart",ht),t.addEventListener("mouseup",at),t.addEventListener("touchend",at),t.addEventListener("touchcancel",at),t.addEventListener("blur",dt),t.addEventListener("mousemove",ct),t.addEventListener("touchmove",ct),n("tick",()=>{Z.length=0,V.map(t=>{Z.push(t)}),V.length=0})}function ft(t){[].concat(t).map(t=>{t._r||(t._r=t.render,t.render=function(){V.push(this),this._r()},et.push(t))})}function pt(t){[].concat(t).map(t=>{t.render=t._r,t._r=0;let e=et.indexOf(t);-1!==e&&et.splice(e,1)})}function mt(t){return!!et.includes(t)&&rt()===t}function gt(t){tt.onDown=t}function yt(t){tt.onUp=t}function wt(t){return!!it[t]}class _t{constructor({create:t,maxSize:e=1024}={}){let i;if(!t||!(i=t())||!(i.update&&i.init&&i.isAlive))throw Error("Must provide create() function which returns an object with init(), update(), and isAlive() functions");this._c=t,this.objects=[t()],this.size=0,this.maxSize=e}get(t={}){if(this.size===this.objects.length){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.push(this._c())}let e=this.objects[this.size];return this.size++,e.init(t),e}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let e,i=!1;for(let n=this.size;n--;)e=this.objects[n],e.update(t),e.isAlive()||(i=!0,this.size--);i&&this.objects.sort((t,e)=>e.isAlive()-t.isAlive())}render(){for(let t=this.size;t--;)this.objects[t].render()}}function xt(t){return new _t(t)}function vt(t,e){let i=[],n=e.x+e.width/2,s=e.y+e.height/2,o=t.y<s&&t.y+t.height>=e.y,r=t.y+t.height>=s&&t.y<e.y+e.height;return t.x<n&&t.x+t.width>=e.x&&(o&&i.push(0),r&&i.push(2)),t.x+t.width>=n&&t.x<e.x+e.width&&(o&&i.push(1),r&&i.push(3)),i}xt.prototype=_t.prototype,xt.class=_t;class bt{constructor({maxDepth:t=3,maxObjects:e=25,bounds:i}={}){this.maxDepth=t,this.maxObjects=e;let n=r();this.bounds=i||{x:0,y:0,width:n.width,height:n.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map((function(t){t.clear()})),this._b=!1,this._o.length=0}get(t){let e,i,n=new Set;for(;this._s.length&&this._b;){for(e=vt(t,this.bounds),i=0;i<e.length;i++)this._s[e[i]].get(t).forEach(t=>n.add(t));return Array.from(n)}return this._o.filter(e=>e!==t)}add(){let t,e,i,n;for(e=0;e<arguments.length;e++)if(i=arguments[e],Array.isArray(i))this.add.apply(this,i);else if(this._b)this._a(i);else if(this._o.push(i),this._o.length>this.maxObjects&&this._d<this.maxDepth){for(this._sp(),t=0;n=this._o[t];t++)this._a(n);this._o.length=0}}_a(t,e,i){for(e=vt(t,this.bounds),i=0;i<e.length;i++)this._s[e[i]].add(t)}_sp(t,e,i){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,i=0;i<4;i++)this._s[i]=St({bounds:{x:this.bounds.x+(i%2==1?t:0),y:this.bounds.y+(i>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[i]._d=this._d+1,this._s[i]._p=this}}function St(t){return new bt(t)}St.prototype=bt.prototype,St.class=bt;class At{constructor(t=0,e=0){this._x=t,this._y=e}add(t,e=1){return Pt(this.x+(t.x||0)*e,this.y+(t.y||0)*e,this)}clamp(t,e,i,n){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=n}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}}function Pt(t,e,i={}){let n=new At(t,e);return i._c&&(n.clamp(i._a,i._b,i._d,i._e),n.x=t,n.y=e),n}Pt.prototype=At.prototype,Pt.class=At;class Et{constructor(t){this.init(t)}init(t={}){let{x:e,y:i,dx:n,dy:s,ddx:o,ddy:r,width:a,height:c,image:d}=t;this.position=Pt(e,i),this.velocity=Pt(n,s),this.acceleration=Pt(o,r),this._fx=this._fy=1,this.width=this.height=this.rotation=0,this.ttl=1/0,this.anchor={x:0,y:0},this.context=h();for(let e in t)this[e]=t[e];d&&(this.width=void 0!==a?a:d.width,this.height=void 0!==c?c:d.height),this.sx=0,this.sy=0}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}get animations(){return this._a}get viewX(){return this.x-this.sx}get viewY(){return this.y-this.sy}get width(){return this._w}get height(){return this._h}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}set viewX(t){}set viewY(t){}set width(t){let e=t<0?-1:1;this._fx=e,this._w=t*e}set height(t){let e=t<0?-1:1;this._fy=e,this._h=t*e}isAlive(){return this.ttl>0}collidesWith(t){if(this.rotation||t.rotation)return null;let e=this.x-this.width*this.anchor.x,i=this.y-this.height*this.anchor.y,n=t.x,s=t.y;return t.anchor&&(n-=t.width*t.anchor.x,s-=t.height*t.anchor.y),e<n+t.width&&e+this.width>n&&i<s+t.height&&i+this.height>s}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){this.velocity=this.velocity.add(this.acceleration,t),this.position=this.position.add(this.velocity,t),this.ttl--,this.currentAnimation&&this.currentAnimation.update(t)}draw(){let t=-this.width*this.anchor.x,e=-this.height*this.anchor.y;if(this.context.save(),this.context.translate(this.viewX,this.viewY),this.rotation&&this.context.rotate(this.rotation),-1==this._fx||-1==this._fy){let i=this.width/2+t,n=this.height/2+e;this.context.translate(i,n),this.context.scale(this._fx,this._fy),this.context.translate(-i,-n)}this.image?this.context.drawImage(this.image,0,0,this.image.width,this.image.height,t,e,this.width,this.height):this.currentAnimation?this.currentAnimation.render({x:t,y:e,width:this.width,height:this.height,context:this.context}):(this.context.fillStyle=this.color,this.context.fillRect(t,e,this.width,this.height)),this.context.restore()}}function Ot(t){return new Et(t)}function jt(t){if(+t===t)return t;let e=[],i=t.split(".."),n=+i[0],s=+i[1],o=n;if(n<s)for(;o<=s;o++)e.push(o);else for(;o>=s;o--)e.push(o);return e}Ot.prototype=Et.prototype,Ot.class=Et;class kt{constructor({image:t,frameWidth:e,frameHeight:i,frameMargin:n,animations:s}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:i,margin:n},this._f=t.width/e|0,this.createAnimations(s)}createAnimations(t){let e,i;for(i in t){let{frames:n,frameRate:s,loop:o}=t[i];if(e=[],void 0===n)throw Error("Animation "+i+" must provide a frames property");[].concat(n).map(t=>{e=e.concat(jt(t))}),this.animations[i]=d({spriteSheet:this,frames:e,frameRate:s,loop:o})}}}function It(t){return new kt(t)}function Lt(t,e){void 0===e?localStorage.removeItem(t):localStorage.setItem(t,JSON.stringify(e))}function Mt(t){let e=localStorage.getItem(t);try{e=JSON.parse(e)}catch(t){}return e}function Dt(t={}){let{width:e,height:i,tilewidth:n,tileheight:s,context:o=h(),tilesets:a,layers:c}=t,d=e*n,l=i*s,u=document.createElement("canvas"),f=u.getContext("2d");u.width=d,u.height=l;let p={},m={},g=[],y=Object.assign({context:o,mapwidth:d,mapheight:l,_sx:0,_sy:0,_d:!1,get sx(){return this._sx},get sy(){return this._sy},set sx(t){this._sx=Math.min(Math.max(0,t),d-r().width),g.forEach(t=>t.sx=this._sx)},set sy(t){this._sy=Math.min(Math.max(0,t),l-r().height),g.forEach(t=>t.sy=this._sy)},render(){this._d&&(this._d=!1,this._p()),v(u)},renderLayer(t){let e=m[t],i=p[t];e||(e=document.createElement("canvas"),e.width=d,e.height=l,m[t]=e,y._r(i,e.getContext("2d"))),i._d&&(i._d=!1,e.getContext("2d").clearRect(0,0,e.width,e.height),y._r(i,e.getContext("2d"))),v(e)},layerCollidesWith(t,e){let i=e.x,n=e.y;e.anchor&&(i-=e.width*e.anchor.x,n-=e.height*e.anchor.y);let s=w(n),o=_(i),r=w(n+e.height),h=_(i+e.width),a=p[t];for(let t=s;t<=r;t++)for(let e=o;e<=h;e++)if(a.data[e+t*this.width])return!0;return!1},tileAtLayer(t,e){let i=e.row||w(e.y),n=e.col||_(e.x);return p[t]?p[t].data[n+i*y.width]:-1},setTileAtLayer(t,e,i){let n=e.row||w(e.y),s=e.col||_(e.x);p[t]&&(p[t]._d=!0,p[t].data[s+n*y.width]=i)},setLayer(t,e){p[t]&&(p[t]._d=!0,p[t].data=e)},addObject(t){g.push(t),t.sx=this._sx,t.sy=this._sy},removeObject(t){let e=g.indexOf(t);-1!==e&&(g.splice(e,1),t.sx=t.sy=0)},_r:function(t,e){e.save(),e.globalAlpha=t.opacity,(t.data||[]).map((t,i)=>{if(!t)return;let n;for(let e=y.tilesets.length-1;e>=0&&(n=y.tilesets[e],!(t/n.firstgid>=1));e--);let s=n.tilewidth||y.tilewidth,o=n.tileheight||y.tileheight,r=n.margin||0,h=n.image,a=t-n.firstgid,c=n.columns||h.width/(s+r)|0,d=i%y.width*s,l=(i/y.width|0)*o,u=a%c*(s+r),f=(a/c|0)*(o+r);e.drawImage(h,u,f,s,o,d,l,s,o)}),e.restore()},_p:x,layerCanvases:m,layerMap:p},t);function w(t){return t/y.tileheight|0}function _(t){return t/y.tilewidth|0}function x(){y.layers&&y.layers.map(t=>{t._d=!1,p[t.name]=t,!1!==t.visible&&y._r(t,f)})}function v(t){const{width:e,height:i}=r(),n=Math.min(t.width,e),s=Math.min(t.height,i);y.context.drawImage(t,y.sx,y.sy,n,s,0,0,n,s)}return y.tilesets.map(e=>{let i=(window.__k?window.__k.dm.get(t):"")||window.location.href;if(e.source){if(!window.__k)throw Error('You must use "load" or "loadData" to resolve tileset.source');let t=window.__k.d[window.__k.u(e.source,i)];if(!t)throw Error(`You must load the tileset source "${e.source}" before loading the tileset`);Object.keys(t).map(i=>{e[i]=t[i]})}if(""+e.image===e.image){if(!window.__k)throw Error('You must use "load" or "loadImage" to resolve tileset.image');let t=window.__k.i[window.__k.u(e.image,i)];if(!t)throw Error(`You must load the image "${e.image}" before loading the tileset`);e.image=t}}),x(),y}It.prototype=kt.prototype,It.class=kt;let Wt={Animation:d,imageAssets:S,audioAssets:A,dataAssets:P,setImagePath:O,setAudioPath:j,setDataPath:k,loadImage:I,loadAudio:L,loadData:M,load:D,init:a,getCanvas:r,getContext:h,on:n,off:s,emit:o,GameLoop:C,keyMap:N,initKeys:B,bindKeys:K,unbindKeys:G,keyPressed:X,registerPlugin:F,unregisterPlugin:J,extendObject:Q,initPointer:ut,pointer:st,track:ft,untrack:pt,pointerOver:mt,onPointerDown:gt,onPointerUp:yt,pointerPressed:wt,Pool:xt,Quadtree:St,Sprite:Ot,SpriteSheet:It,setStoreItem:Lt,getStoreItem:Mt,TileEngine:Dt,Vector:Pt};var Tt,Ct=(Tt=Object.freeze({__proto__:null,Animation:d,imageAssets:S,audioAssets:A,dataAssets:P,setImagePath:O,setAudioPath:j,setDataPath:k,loadImage:I,loadAudio:L,loadData:M,load:D,init:a,getCanvas:r,getContext:h,on:n,off:s,emit:o,GameLoop:C,keyMap:N,initKeys:B,bindKeys:K,unbindKeys:G,keyPressed:X,registerPlugin:F,unregisterPlugin:J,extendObject:Q,initPointer:ut,pointer:st,track:ft,untrack:pt,pointerOver:mt,onPointerDown:gt,onPointerUp:yt,pointerPressed:wt,Pool:xt,Quadtree:St,Sprite:Ot,SpriteSheet:It,setStoreItem:Lt,getStoreItem:Mt,TileEngine:Dt,Vector:Pt,default:Wt}))&&Tt.default||Tt;const{load:Rt}=Ct,zt=["./assets/Tilesheet/elements.png","./assets/Tilesheet/groundGravel.png","./assets/Spritesheet/sheet_characters.png","./assets/Spritesheet/sheet_charactersEquipment.png"];var Nt=function(){return Rt(...zt)};const{TileEngine:Yt}=Ct;var Ut=function(t){return Yt({tilewidth:64,tileheight:64,width:11,height:9,tilesets:[{firstgid:1,image:t}],layers:[{name:"ground",data:[1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,4,3,3,3,3,5,101,102,1,1,1,17,1,1,1,94,95,15,1,116,1,8,47,10,1,106,1,18,15,1,129,1,21,17,23,1,119,1,18,15,1,142,1,34,49,36,1,132,1,18,153,154,1,1,1,17,1,1,1,146,147,41,42,42,42,42,43,42,42,42,42,44,1,1,1,1,1,1,1,1,1,1,1]}]})};const{Sprite:Ht,SpriteSheet:Bt}=Ct;var Kt=function(t){const e=Bt({frameWidth:17,frameHeight:17,frameMargin:2,image:t,animations:{stand:{frames:[47.7]}}});return Ht({x:337,y:272,animations:e.animations})};const{Sprite:Gt,SpriteSheet:Xt}=Ct;var $t=function(t,e){const i=Xt({frameWidth:64,frameHeight:64,image:t,animations:{stand:{frames:e?63:64}}});return Gt({x:e?8:632,y:256,animations:i.animations})};const{pointerPressed:qt,Sprite:Ft,SpriteSheet:Jt}=Ct,Qt=706,Vt=572,Zt=window.innerWidth,te=window.innerHeight;var ee=function(t){const e=Jt({frameWidth:64,frameHeight:64,image:t,animations:{stand:{frames:53}}});return Ft({x:64,y:512,animations:e.animations,collidesWithPointer:function(t){const{x:e,y:i}=t,n=e*Qt/Zt/.95,s=i*Vt/te/.95,o=n>=this.x&&n<=this.x+this.width,r=s>=this.y&&s<=this.y+this.height;return o&&r}})};const{Sprite:ie,SpriteSheet:ne}=Ct;var se=function(t,e){const i=ne({frameWidth:21,frameHeight:31,image:t,animations:{stand:{frames:e,frameRate:1,loop:!1}}});return ie({x:53+64*(3+e),y:272,animations:i.animations,flipped:!1,turned:0,render:function(){this.context.save(),this.draw(),this.flipped&&console.log("TODO: IMPLEMENT FLIPPING"),-1===this.turned&&console.log("TODO: IMPLEMENT TURNING UPWARDS"),1===this.turned&&console.log("TODO: IMPLEMENT TURNING DOWNWARDS"),this.context.restore()}})};const{Sprite:oe,SpriteSheet:re}=Ct;var he=function(t,e){const i=re({frameWidth:64,frameHeight:64,image:t,animations:{score0:{frames:195,loop:!1},score1:{frames:196,loop:!1},score2:{frames:197,loop:!1},score3:{frames:198,loop:!1},score4:{frames:199,loop:!1},score5:{frames:200,loop:!1},score6:{frames:201,loop:!1},score7:{frames:202,loop:!1},score8:{frames:203,loop:!1},score9:{frames:204,loop:!1}}});return oe({x:e?256:384,y:0,animations:i.animations})};const{keyPressed:ae}=Ct;function ce(t,e){t.playAnimation(e)}var de={moveBall:function({player:t,opponent:e,ball:i,playerBasket:n,opponentBasket:s,playerScore:o,opponentScore:r}){const h=t.x-i.x,a=t.y-i.y,c=e.x-i.x,d=e.y-i.y,l=h*h+a*a,u=c*c+d*d;l<u&&(i.x=i.x+h/2,i.y=i.y+a/2),u<l&&(i.x=i.x+c/2,i.y=i.y+d/2),n.collidesWith(i)&&e.collidesWith(i)&&ce(r,"score1"),s.collidesWith(i)&&t.collidesWith(i)&&ce(o,"score1"),i.update()},moveOpponent:function(t,e){ae("a")&&t.x>=8&&(t.flipped=!0,t.turned=0,t.x-=8),ae("d")&&t.x<=e.width-21-8&&(t.flipped=!1,t.turned=0,t.x+=8),ae("w")&&t.y>=8&&(t.turned=-1,t.y-=8),ae("s")&&t.y<=e.height-31-8&&(t.turned=1,t.y+=8),t.update()},movePlayer:function({player:t,canvas:e,tileEngine:i}){ae("left")&&t.x>=8&&(t.flipped=!0,t.turned=0,t.x-=8),ae("right")&&t.x<=e.width-21-8&&(t.flipped=!1,t.turned=0,t.x+=8),ae("up")&&t.y>=8&&(t.turned=-1,t.y-=8),ae("down")&&t.y<=e.height-31-8&&(t.turned=1,t.y+=8),i.sx=t.x,i.sy=t.y,t.update()}};const{GameLoop:le,init:ue,initKeys:fe,initPointer:pe,keyPressed:me,track:ge}=Ct,{moveBall:ye,moveOpponent:we,movePlayer:_e}=de;window.onload=async()=>{const{canvas:t,context:e}=ue();!function(t,e){const i=window.innerWidth,n=window.innerHeight;if(i>t.width)return;if(n>t.height)return;const s=.95*i/t.width,o=.95*n/t.height;e.imageSmoothingEnabled=!1,e.scale(s,o)}(t,e),t.onwheel=t=>t.preventDefault(),t.onmousewheel=t=>t.preventDefault(),fe(),pe();const i=await Nt(),[n,s,o,r]=i,h=Ut(s),a=ee(s),c=se(o,1),d=se(o,2),l=Kt(r),u=$t(n,!0),f=$t(n,!1),p=he(s,!0),m=he(s,!1);ge(a),h.addObject(a),h.addObject(c),h.addObject(d),h.addObject(l),h.addObject(u),h.addObject(f),h.addObject(p),h.addObject(m),le({update:()=>{_e({player:c,canvas:t,tileEngine:h}),we(d,t),ye({player:c,opponent:d,ball:l,playerBasket:u,opponentBasket:f,playerScore:p,opponentScore:m})},render:()=>{h.render(),a.render(),p.render(),m.render(),c.render(),d.render(),u.render(),f.render(),l.render()}}).start()}}));
