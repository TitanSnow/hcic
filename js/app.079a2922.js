(function(t){function e(e){for(var i,n,r=e[0],l=e[1],c=e[2],m=0,f=[];m<r.length;m++)n=r[m],o[n]&&f.push(o[n][0]),o[n]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,c||[]),s()}function s(){for(var t,e=0;e<a.length;e++){for(var s=a[e],i=!0,r=1;r<s.length;r++){var l=s[r];0!==o[l]&&(i=!1)}i&&(a.splice(e--,1),t=n(n.s=s[0]))}return t}var i={},o={app:0},a=[];function n(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=i,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="";var r=this["webpackJsonp"]=this["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;a.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("cd49")},"0af1":function(t,e,s){},"42db":function(t,e,s){"use strict";var i=s("7da3"),o=s.n(i);o.a},"620e":function(t,e,s){"use strict";var i=s("8944"),o=s.n(i);o.a},"740a":function(t,e){t.exports={css:{blur:{args:[{name:"radius",type:"length",min:0,max:50,default:0}]},brightness:{args:[{name:"amount",type:"number",min:0,max:2,default:1}]},contrast:{args:[{name:"amount",type:"number",min:0,max:2,default:1}]},grayscale:{args:[{name:"amount",type:"number",min:0,max:1,default:0}]},"hue-rotate":{args:[{name:"angle",type:"angle",min:0,max:360,default:0}]},invert:{args:[{name:"amount",type:"number",min:0,max:1,default:0}]},opacity:{args:[{name:"amount",type:"number",min:0,max:1,default:1}]},saturate:{args:[{name:"amount",type:"number",min:0,max:2,default:1}]},sepia:{args:[{name:"amount",type:"number",min:0,max:1,default:0}]}}}},"7da3":function(t,e,s){},"7faf":function(t,e,s){"use strict";var i=s("0af1"),o=s.n(i);o.a},"833c":function(t,e,s){},8944:function(t,e,s){},9112:function(t,e,s){"use strict";var i=s("833c"),o=s.n(i);o.a},ac8e:function(t,e,s){t.exports=function(){return new Worker(s.p+"f97f2ded6907584e085b.worker.js")}},cd49:function(t,e,s){"use strict";s.r(e);var i=s("2b0e"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return null===t.editingImage?s("div",{staticClass:"hola-container"},[s("div",{staticClass:"hola-columns hola-card-stack"},[s("div",{staticClass:"hola-columns-item"},[s("div",{staticClass:"hola-card ctrl-card"},[s("config-form",{attrs:{config:t.config}}),s("div",{staticClass:"global-actions"},[s("button",{staticClass:"hola-button hola-button-primary",attrs:{type:"button",disabled:0===t.images.length},on:{click:t.downloadAll}},[t._v("Download All")]),s("button",{staticClass:"hola-button hola-button-normal",attrs:{type:"button"},on:{click:t.clearAll}},[t._v("Clear All")])])],1)]),s("div",{staticClass:"hola-columns-item"},[s("div",{staticClass:"hola-card select-card"},[s("div",{attrs:{title:"Drop images here"},on:{dblclick:t.addImageByDialog,dragover:function(t){t.preventDefault()},drop:function(e){e.preventDefault(),t.addImageFiles(e.dataTransfer.files)}}},[s("button",{staticClass:"hola-button hola-button-primary material-icons",attrs:{type:"button"},on:{click:t.addImageByDialog}},[t._v("\n            add_photo_alternate\n          ")])])])]),t._l(t.images,function(e){return s("img-view",{key:e.key,ref:"img-views",refInFor:!0,attrs:{config:t.config,filters:t.filters,file:e.file},on:{close:function(s){t.removeImage(e)},"request-editmode":function(s){t.editingImage=e}}})})],2)]):s("img-view",{key:t.editingImage.key,attrs:{config:t.config,filters:t.filters,file:t.editingImage.file,editmode:!0},on:{close:function(e){t.editingImage=null}}})},a=[],n=s("9ab4"),r=s("60a3"),l=s("e1bd"),c=s.n(l),u=s("7c39"),m=s.n(u),f=s("2440"),g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.editmode?s("div",{staticClass:"hola-container hola-layout-container hola-layout-container-sidebar-right image-editor"},[s("div",{staticClass:"hola-layout-main"},[s("div",{staticClass:"hola-card hola-card-full-image"},[s("img",{staticClass:"hola-image",style:t.compressing?{}:{cursor:"zoom-in"},attrs:{src:(t.compressed||t.origin).src,alt:t.title},on:{click:function(e){t.compressing||t.showBig()}}})])]),s("div",{staticClass:"hola-layout-sidebar hola-card-stack"},[s("div",{staticClass:"hola-card editor-action-card"},[s("div",{staticClass:"image-actions"},[t.compressing?s("button",{staticClass:"hola-button hola-button-primary",attrs:{type:"button",disabled:""}},[s("progress-circular",{attrs:{color:"white",size:18}})],1):s("button",{staticClass:"hola-button hola-button-primary material-icons",attrs:{type:"button"},on:{click:t.download}},[t._v("save_alt")]),s("button",{staticClass:"hola-button hola-button-normal material-icons",attrs:{type:"button"},on:{click:t.close}},[t._v("exit_to_app")]),s("button",{staticClass:"hola-button hola-button-normal material-icons",attrs:{type:"button",disabled:0==t.currentConfigHistoryIdx},on:{click:t.undo}},[t._v("undo")]),s("button",{staticClass:"hola-button hola-button-normal material-icons",attrs:{type:"button",disabled:t.currentConfigHistoryIdx==t.configHistory.length-1},on:{click:t.redo}},[t._v("redo")])])]),s("div",{staticClass:"hola-card editor-ctrl-card"},[s("config-form",{attrs:{config:t.config}})],1),s("div",{staticClass:"hola-card editor-detail-card"},[s("div",{staticClass:"hola-infosheet"},[s("div",{staticClass:"hola-infosheet-row"},[s("span",{staticClass:"hola-infosheet-key"},[t._v("Title")]),s("p",{ref:"title",staticClass:"hola-infosheet-value",attrs:{contenteditable:"true",spellcheck:"false"}},[t._v(t._s(t.title))])]),s("div",{staticClass:"hola-infosheet-row"},[s("span",{staticClass:"hola-infosheet-key"},[t._v("Size")]),s("p",{staticClass:"hola-infosheet-value diff"},[s("span",{class:{before:t.compressed}},[t._v(t._s(t.toKB(t.origin.size))+"KB")]),t._v(t._s(" ")+"\n            "),t.compressed?s("span",{staticClass:"after"},[t._v(t._s(t.toKB(t.compressed.size))+"KB")]):t._e()])]),t.originWH?s("div",{staticClass:"hola-infosheet-row"},[s("span",{staticClass:"hola-infosheet-key"},[t._v("Reso")]),s("p",{staticClass:"hola-infosheet-value diff"},[s("span",{class:{before:t.compressedWH&&!t.whNoChange}},[t._v(t._s(t.toReso(t.originWH)))]),t._v(t._s(" ")+"\n            "),t.compressedWH&&!t.whNoChange?s("span",{staticClass:"after"},[t._v(t._s(t.toReso(t.compressedWH)))]):t._e()])]):t._e(),s("div",{staticClass:"hola-infosheet-row"},[s("span",{staticClass:"hola-infosheet-key"},[t._v("Date")]),s("p",{staticClass:"hola-infosheet-value"},[t._v(t._s(t.toDate(t.origin.blob.lastModified)))])])])]),s("filter-form",{staticClass:"hola-card editor-filter-card",attrs:{filters:t.filters}})],1)]):s("div",{staticClass:"hola-columns-item"},[s("div",{staticClass:"hola-card hola-card-with-image image-card"},[s("img",{staticClass:"hola-image",staticStyle:{cursor:"pointer"},attrs:{src:(t.compressed||t.origin).src,alt:t.title},on:{click:t.enterEditor}}),s("div",{staticClass:"image-headline"},[s("span",{ref:"title",staticClass:"image-title",attrs:{contenteditable:"true",spellcheck:"false"}},[t._v(t._s(t.title))]),s("span",{staticClass:"image-actions"},[t.compressing?s("button",{staticClass:"hola-button hola-button-primary",attrs:{type:"button",disabled:""}},[s("progress-circular",{attrs:{color:"white",size:18}})],1):s("button",{staticClass:"hola-button hola-button-primary material-icons",attrs:{type:"button"},on:{click:t.download}},[t._v("save_alt")]),s("button",{staticClass:"hola-button hola-button-normal material-icons",attrs:{type:"button"},on:{click:t.close}},[t._v("close")])])]),s("div",{staticClass:"image-info"},[s("div",{class:{before:!0,"no-diff":!t.compressed}},[s("span",{staticClass:"size"},[t._v(t._s(t.toKB(t.origin.size))+"KB")]),t.originWH?s("span",{class:{wh:!0,"no-diff":t.whNoChange}},[t._v(t._s(t.toReso(t.originWH)))]):t._e()]),t.compressed?s("div",{staticClass:"after"},[s("span",{staticClass:"size"},[t._v(t._s(t.toKB(t.compressed.size))+"KB")]),t.compressedWH?s("span",{directives:[{name:"show",rawName:"v-show",value:!t.whNoChange,expression:"!whNoChange"}],staticClass:"wh"},[t._v(t._s(t.toReso(t.compressedWH)))]):t._e()]):t._e()])])])},d=[],p=s("b047c"),h=s.n(p),v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"spinner-wrapper",style:{"--paper-spinner-color":t.color,transform:"scale("+t.size/28+")"}},[t._m(0)])},b=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"spinner-container active"},[s("div",{staticClass:"spinner-layer"},[s("div",{staticClass:"circle-clipper left"}),s("div",{staticClass:"circle-clipper right"})])])}],y={name:"ProgressCircular",props:{color:{type:String,default:"rgb(66, 133, 244)"},size:{type:Number,default:28}}},C=y,_=(s("620e"),s("2877")),w=Object(_["a"])(C,v,b,!1,null,"f1e81302",null);w.options.__file="ProgressCircular.vue";var S=w.exports,x=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("form",{ref:"form"},[s("p",[s("label",[s("span",[t._v("Quality:")]),t.compact?t._e():s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.config.level,expression:"config.level",modifiers:{number:!0}}],staticClass:"hola-form-ctrl",attrs:{type:"range",min:"0",max:"1",step:"0.01",disabled:!t.config.compress},domProps:{value:t.config.level},on:{__r:function(e){t.$set(t.config,"level",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.config.level,expression:"config.level",modifiers:{number:!0}}],staticClass:"hola-form-ctrl",attrs:{type:"number",min:"0",max:"1",step:"0.01",disabled:!t.config.compress},domProps:{value:t.config.level},on:{input:function(e){e.target.composing||t.$set(t.config,"level",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})])]),s("p",[s("label",[s("span",[t._v("Scale:")]),t.compact?t._e():s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.config.scale,expression:"config.scale",modifiers:{number:!0}}],staticClass:"hola-form-ctrl",attrs:{type:"range",min:"0",max:"2",step:"0.01"},domProps:{value:t.config.scale},on:{__r:function(e){t.$set(t.config,"scale",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.config.scale,expression:"config.scale",modifiers:{number:!0}}],staticClass:"hola-form-ctrl",attrs:{type:"number",min:"0",max:"2",step:"0.01"},domProps:{value:t.config.scale},on:{input:function(e){e.target.composing||t.$set(t.config,"scale",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})])]),s("p",[s("label",[s("span",[t._v("Type:")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.config.type,expression:"config.type"}],staticClass:"hola-form-ctrl",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.config,"type",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"image/webp"}},[t._v("WebP")]),s("option",{attrs:{value:"image/jpeg"}},[t._v("JPEG")]),s("option",{attrs:{value:"image/png"}},[t._v("PNG")])])])]),1!==t.config.scale?s("p",[s("label",[s("span",[t._v("Smooth:")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.config.smooth,expression:"config.smooth"}],staticClass:"hola-form-ctrl",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.config,"smooth",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"disabled"}},[t._v("Disabled")]),t.isSupportSmoothQuality?[s("option",{attrs:{value:"low"}},[t._v("Low")]),s("option",{attrs:{value:"medium"}},[t._v("Medium")]),s("option",{attrs:{value:"high"}},[t._v("High")])]:s("option",{attrs:{value:"high"}},[t._v("Enabled")])],2)])]):t._e()])},F=[];function I(){return"imageSmoothingQuality"in document.createElement("canvas").getContext("2d")}let k=class extends r["c"]{constructor(){super(...arguments),this.compact=!1,this.isSupportSmoothQuality=I()}mounted(){if("ResizeObserver"in window){const t=new ResizeObserver(t=>{this.compact=t[0].contentRect.width<250});t.observe(this.$refs.form)}}};n["a"]([Object(r["b"])()],k.prototype,"config",void 0),k=n["a"]([r["a"]],k);var j=k,O=j,H=(s("d506"),Object(_["a"])(O,x,F,!1,null,"5dc842ad",null));H.options.__file="ConfigForm.vue";var N=H.exports,$=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"filter-form"},[s("details",[s("summary",[t._v("CSS Filters")]),s("ul",{staticClass:"css-filter-list"},t._l(t.filters.css,function(e){return s("li",{key:e.key},[s("div",[s("select",{staticClass:"hola-form-ctrl",domProps:{value:e.functionName},on:{input:function(s){t.changeCSSFilterFunction(e,s.target.value)}}},t._l(Object.keys(t.filterInfo.css),function(e){return s("option",{key:e},[t._v(t._s(e))])})),s("div",{staticClass:"actions"},[s("button",{staticClass:"material-icons hola-button",attrs:{type:"button"},on:{click:function(s){t.removeCSSFilter(e)}}},[t._v("close")]),s("button",{staticClass:"material-icons hola-button",attrs:{type:"button"},on:{click:function(s){t.moveUpCSSFilter(e)}}},[t._v("arrow_upward")]),s("button",{staticClass:"material-icons hola-button",attrs:{type:"button"},on:{click:function(s){t.moveDownCSSFilter(e)}}},[t._v("arrow_downward")])])]),"number"===t.getCSSFilterFunctionArgInfo(e.functionName).type?s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.args,expression:"f.args"}],staticClass:"hola-form-ctrl",attrs:{type:"range",min:t.getCSSFilterFunctionArgInfo(e.functionName).min,max:t.getCSSFilterFunctionArgInfo(e.functionName).max,step:"0.01"},domProps:{value:e.args},on:{__r:function(s){t.$set(e,"args",s.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.args,expression:"f.args"}],staticClass:"hola-form-ctrl",attrs:{type:"number",min:t.getCSSFilterFunctionArgInfo(e.functionName).min,max:t.getCSSFilterFunctionArgInfo(e.functionName).max,step:"0.01"},domProps:{value:e.args},on:{input:function(s){s.target.composing||t.$set(e,"args",s.target.value)}}})]):"length"===t.getCSSFilterFunctionArgInfo(e.functionName).type?s("div",[s("input",{staticClass:"hola-form-ctrl",attrs:{type:"range",min:t.getCSSFilterFunctionArgInfo(e.functionName).min,max:t.getCSSFilterFunctionArgInfo(e.functionName).max,step:"0.01"},domProps:{value:parseFloat(e.args)},on:{input:function(t){e.args=t.target.value+"px"}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.args,expression:"f.args"}],staticClass:"hola-form-ctrl",attrs:{type:"text"},domProps:{value:e.args},on:{input:function(s){s.target.composing||t.$set(e,"args",s.target.value)}}})]):"angle"===t.getCSSFilterFunctionArgInfo(e.functionName).type?s("div",[s("input",{staticClass:"hola-form-ctrl",attrs:{type:"range",min:t.getCSSFilterFunctionArgInfo(e.functionName).min,max:t.getCSSFilterFunctionArgInfo(e.functionName).max,step:"0.01"},domProps:{value:parseFloat(e.args)},on:{input:function(t){e.args=t.target.value+"deg"}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.args,expression:"f.args"}],staticClass:"hola-form-ctrl",attrs:{type:"text"},domProps:{value:e.args},on:{input:function(s){s.target.composing||t.$set(e,"args",s.target.value)}}})]):t._e()])})),s("button",{staticClass:"hola-button hola-button-normal",attrs:{type:"button"},on:{click:t.addCSSFilter}},[t._v("Add Filter")])])])},P=[];const A=s("740a");class W{constructor(t,e,s=c()()){this.functionName=t,this.args=e,this.key=s}toCssString(){return`${this.functionName}(${this.args})`}}let B=class extends r["c"]{constructor(){super(...arguments),this.filterInfo=A}addCSSFilter(){const t=this.getCSSFilterFunctionArgInfo("blur");this.filters.css.push(new W("blur",this.addCSSFilterFunctionArgUnit(t.default,t.type)))}removeCSSFilter(t){const e=this.filters.css;e.splice(e.indexOf(t),1)}moveUpCSSFilter(t){const e=this.filters.css,s=e.indexOf(t);s>0&&(e.splice(s,1),e.splice(s-1,0,t))}moveDownCSSFilter(t){const e=this.filters.css,s=e.indexOf(t);s<e.length-1&&(e.splice(s,1),e.splice(s+1,0,t))}getCSSFilterFunctionArgInfo(t){return this.filterInfo.css[t].args[0]}addCSSFilterFunctionArgUnit(t,e){switch(e){case"length":return t+"px";case"angle":return t+"deg";case"number":default:return t+""}}changeCSSFilterFunction(t,e){if(t.functionName!==e){t.functionName=e;const s=this.getCSSFilterFunctionArgInfo(e);t.args=this.addCSSFilterFunctionArgUnit(s.default,s.type)}}};n["a"]([Object(r["b"])()],B.prototype,"filters",void 0),B=n["a"]([r["a"]],B);var D=B,E=D,z=(s("42db"),Object(_["a"])(E,$,P,!1,null,null,null));z.options.__file="FilterForm.vue";var U=z.exports,M=s("0644"),R=s.n(M);function K(t){return Object.assign({},t)}function T(t,e){for(const s of new Set([...Object.keys(t),...Object.keys(e)]))if(t[s]!==e[s])return!1;return!0}const Q=R.a,L=s("ac8e");class J{get size(){return this.blob.size}constructor(t){this.blob=t,this.src=URL.createObjectURL(t),this.bitmapPromise=createImageBitmap(t),this.whPromise=new Promise(t=>{this.bitmapPromise.then(e=>{return t({width:e.width,height:e.height}),e})})}}class q{constructor(t,e,s){this.origin=t,this.config=e,this.filters=s}compress(){return new Promise(t=>{this.origin.bitmapPromise.then(e=>{if("OffscreenCanvas"in window){const s=new L;s.postMessage({config:this.config,filters:this.filters,bitmap:e}),s.onmessage=(e=>{t(new J(e.data))})}else{const s=document.createElement("canvas"),i=this.config,o=s.width=Math.max(1,Math.round(e.width*i.scale)),a=s.height=Math.max(1,Math.round(e.height*i.scale)),n=s.getContext("2d");(n.imageSmoothingEnabled="disabled"!==i.smooth)&&"imageSmoothingQuality"in n&&(n.imageSmoothingQuality=i.smooth),n.filter=this.filters.css.map(t=>t.toCssString()).join(" "),n.drawImage(e,0,0,o,a),s.toBlob(e=>{t(new J(e))},this.config.type,this.config.compress?this.config.level:void 0)}return e})})}}function G(t){switch(t){case"image/webp":return"webp";case"image/jpeg":return"jpg";case"image/png":return"png";default:throw"Unknown mime"}}let V=class extends r["c"]{constructor(){super(...arguments),this.compressed=null,this.session=null,this.compressedWH=null,this.originWH=null,this.compressing=!0,this.configHistory=[],this.currentConfigHistoryIdx=NaN}getDownloadBlob(){if(!this.compressing)return this.compressed.blob}generateFilename(){const t=this.$refs.title.textContent,e="."+G(this.compressed.blob.type);return t?t+e:this.$vnode.key+e}get origin(){return new J(this.file)}updateSession(){this.session=new q(this.origin,this.config,this.filters)}get title(){return this.file.name.split(".").slice(0,-1).join(".")}async compress(){if(this.session){this.compressing=!0;const t=this.session,e=t.compress(),s=await t.origin.whPromise;if(t!==this.session)return;this.originWH=s;const i=await e,o=await i.whPromise;t===this.session&&(this.compressed=i,this.compressedWH=o,this.compressing=!1)}}created(){const t=h()(this.updateSession.bind(this),50),e=h()(this.recordConfigHistory.bind(this),50);this.$watch("origin",t,{immediate:!0}),this.$watch("config",()=>{t(),e()},{deep:!0}),this.$watch("filters",t,{deep:!0}),this.configHistory.push(K(this.config)),this.currentConfigHistoryIdx=0}toKB(t){return Math.round(t/10.24)/100}toReso(t){return`${t.width}x${t.height}`}toDate(t){return new Date(t).toLocaleString()}get whNoChange(){return this.originWH&&this.compressedWH&&this.originWH.width===this.compressedWH.width&&this.originWH.height===this.compressedWH.height}download(){Object(f["saveAs"])(this.getDownloadBlob(),this.generateFilename())}close(){this.$emit("close")}enterEditor(){this.$emit("request-editmode")}showBig(){window.open(this.compressed.src,"_blank")}recordConfigHistory(){T(this.config,this.configHistory[this.currentConfigHistoryIdx])||(this.configHistory.splice(this.currentConfigHistoryIdx+1),this.configHistory.push(K(this.config)),++this.currentConfigHistoryIdx)}undo(){Object.assign(this.config,this.configHistory[--this.currentConfigHistoryIdx])}redo(){Object.assign(this.config,this.configHistory[++this.currentConfigHistoryIdx])}};n["a"]([Object(r["b"])()],V.prototype,"file",void 0),n["a"]([Object(r["b"])()],V.prototype,"config",void 0),n["a"]([Object(r["b"])({default:!1})],V.prototype,"editmode",void 0),n["a"]([Object(r["b"])()],V.prototype,"filters",void 0),n["a"]([Object(r["d"])("session",{immediate:!0})],V.prototype,"compress",null),V=n["a"]([Object(r["a"])({components:{ProgressCircular:S,ConfigForm:N,FilterForm:U}})],V);var X=V,Y=X,Z=(s("9112"),Object(_["a"])(Y,g,d,!1,null,null,null));Z.options.__file="ImgView.vue";var tt=Z.exports;function et(){const t=document.createElement("canvas");return t.width=t.height=1,t.toDataURL("image/webp").startsWith("data:image/webp;")}class st{constructor(t,e=c()()){this.file=t,this.key=e}}const it={level:.92,scale:1,type:et()?"image/webp":"image/jpeg",compress:!0,smooth:"high"},ot={css:[]},at=["image/webp","image/jpeg"];let nt=class extends r["c"]{constructor(){super(...arguments),this.config=K(it),this.images=[],this.editingImage=null,this.filters=Q(ot)}createFileInputElement(){const t=document.createElement("input");return t.type="file",t.multiple=!0,t.accept="image/*",t}addImageByDialog(){const t=this.createFileInputElement();t.onchange=(()=>{t.files&&this.addImageFiles(t.files)}),t.click()}addImageFiles(t){for(const e of t)this.addImageFile(e)}addImageFile(t){this.images.push(new st(t))}removeImage(t){this.images.splice(this.images.indexOf(t),1)}resetConfig(){this.config=K(it)}resetFilters(){this.filters=Q(ot)}clearAll(){this.images.splice(0),this.resetConfig(),this.resetFilters()}async downloadAll(){const t=new m.a;for(const e of this.$refs["img-views"]){const s=e.getDownloadBlob();if(s){const i=e.generateFilename();t.file(i,s)}}Object(f["saveAs"])(await t.generateAsync({type:"blob"}))}onTypeChange(t){this.config.compress=at.includes(t)}};n["a"]([Object(r["d"])("config.type")],nt.prototype,"onTypeChange",null),nt=n["a"]([Object(r["a"])({components:{ImgView:tt,ConfigForm:N}})],nt);var rt=nt,lt=rt,ct=(s("7faf"),Object(_["a"])(lt,o,a,!1,null,null,null));ct.options.__file="App.vue";var ut=ct.exports;i["default"].config.productionTip=!1,new i["default"]({render:t=>t(ut)}).$mount("#app")},cec5:function(t,e,s){},d506:function(t,e,s){"use strict";var i=s("cec5"),o=s.n(i);o.a}});
//# sourceMappingURL=app.079a2922.js.map