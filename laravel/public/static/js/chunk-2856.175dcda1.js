(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2856"],{"/cac":function(t,e,r){"use strict";r.r(e);var n=r("JCNI"),o=r("xAVR"),a={data:function(){return{item:"",category:[],form:{title:"",category_id:"",author:"admin",keywords:"",tag_ids:"",markdown:"",content:"0",is_top:0,loading:!1},rules:{title:[{required:!0,message:"请输入名称",trigger:"blur"}],category_id:[{required:!0,message:"请选择栏目",trigger:"blur"}],author:[{required:!0,message:"请输入作者",trigger:"blur"}],keywords:[{required:!0,message:"请输入关键词",trigger:"blur"}],tag_ids:[{required:!0,message:"请选择一个标签",trigger:"blur"}],markdown:[{required:!0,message:"请输入内容",trigger:"blur"}]},redirect:"/article/index"}},watch:{item:function(t){this.form.category_id=t,this.getItem()}},created:function(){this.init()},methods:{getItem:function(){this.$emit("getItem",this.form.category)},init:function(){var t=this;Object(o.c)({perPage:20}).then(function(e){t.category=e.data.data})},onSubmit:function(t){var e=this;console.log(this.form),this.$refs[t].validate(function(t){if(!t)return!1;e.loading=!0,Object(n.e)(e.form).then(function(t){e.loading=!1,200===t.code?(e.$message({message:"操作成功",type:"success"}),e.$router.push({path:e.redirect||"/"})):e.$message.error(t.reason)})})},onCancel:function(){this.$message({message:"cancel!",type:"warning"})},resetForm:function(t){this.$refs[t].resetFields()},imgAdd:function(t,e){var r=this,o=new FormData;o.append("image",e),Object(n.a)({url:"http://localhost/",method:"post",data:o,headers:{"Content-Type":"multipart/form-data"}}).then(function(e){console.log(t),console.log(e),r.$refs.md.$img2Url(t,e.data)})},imgDel:function(t){}}},i=(r("ZQ00"),r("KHd+")),c=Object(i.a)(a,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"栏目",prop:"category_id"}},[r("el-select",{attrs:{placeholder:"请选择栏目","value-key":"name"},model:{value:t.item,callback:function(e){t.item=e},expression:"item"}},t._l(t.category,function(e,n){return r("el-option",{key:n,attrs:{label:e.name,value:e.id}},[r("span",{staticStyle:{float:"left",color:"#8492a6","font-size":"13px"}},[t._v(t._s(e.name))])])}))],1),t._v(" "),r("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[r("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"作者",prop:"author"}},[r("el-input",{model:{value:t.form.author,callback:function(e){t.$set(t.form,"author",e)},expression:"form.author"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"关键词",prop:"keywords"}},[r("el-input",{model:{value:t.form.keywords,callback:function(e){t.$set(t.form,"keywords",e)},expression:"form.keywords"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"标签",prop:"tag_ids"}},[r("el-input",{model:{value:t.form.tag_ids,callback:function(e){t.$set(t.form,"tag_ids",e)},expression:"form.tag_ids"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"内容",prop:"markdown"}},[r("mavon-editor",{ref:"md",on:{imgAdd:t.imgAdd,imgDel:t.imgDel},model:{value:t.form.markdown,callback:function(e){t.$set(t.form,"markdown",e)},expression:"form.markdown"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"是否置顶"}},[r("el-radio-group",{model:{value:t.form.is_top,callback:function(e){t.$set(t.form,"is_top",e)},expression:"form.is_top"}},[r("el-radio",{attrs:{label:1}},[t._v("是")]),t._v(" "),r("el-radio",{attrs:{label:0}},[t._v("否")])],1)],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit("form")}}},[t._v("提交")]),t._v(" "),r("el-button",{on:{click:function(e){t.resetForm("form")}}},[t._v("重置")])],1)],1)],1)},[],!1,null,"b691f970",null);c.options.__file="add.vue";e.default=c.exports},JCNI:function(t,e,r){"use strict";r.d(e,"d",function(){return o}),r.d(e,"e",function(){return a}),r.d(e,"c",function(){return i}),r.d(e,"f",function(){return c}),r.d(e,"b",function(){return u}),r.d(e,"g",function(){return l}),r.d(e,"a",function(){return s});var n=r("t3Un");function o(t){return Object(n.a)({url:"/api/article",method:"get",params:t})}function a(t){return n.a.post("/api/article",t)}function i(t){return n.a.get("/api/article/"+t)}function c(t,e){return n.a.patch("/api/article/"+t,e)}function u(t){return n.a.delete("/api/article/"+t)}function l(t){return Object(n.a)({url:"/api/article_search",method:"get",params:t})}function s(t){return Object(n.a)(t)}},ZQ00:function(t,e,r){"use strict";var n=r("wTpc");r.n(n).a},wTpc:function(t,e,r){},xAVR:function(t,e,r){"use strict";r.d(e,"c",function(){return o}),r.d(e,"d",function(){return a}),r.d(e,"b",function(){return i}),r.d(e,"e",function(){return c}),r.d(e,"a",function(){return u}),r.d(e,"f",function(){return l});var n=r("t3Un");function o(t){return Object(n.a)({url:"/api/category",method:"get",params:t})}function a(t){return n.a.post("/api/category",t)}function i(t){return n.a.get("/api/category/"+t)}function c(t,e){return n.a.patch("/api/category/"+t,e)}function u(t){return n.a.delete("/api/category/"+t)}function l(t){return Object(n.a)({url:"/api/category_search",method:"get",params:t})}}}]);