(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6637"],{"0o2y":function(t,e,n){"use strict";n.d(e,"c",function(){return a}),n.d(e,"d",function(){return i}),n.d(e,"b",function(){return o}),n.d(e,"e",function(){return s}),n.d(e,"a",function(){return u}),n.d(e,"f",function(){return c});var r=n("t3Un");function a(t){return Object(r.a)({url:"/api/tag",method:"get",params:t})}function i(t){return r.a.post("/api/tag",t)}function o(t){return r.a.get("/api/tag/"+t)}function s(t,e){return r.a.patch("/api/tag/"+t,e)}function u(t){return r.a.delete("/api/tag/"+t)}function c(t){return Object(r.a)({url:"/api/tag_search",method:"get",params:t})}},S2fK:function(t,e,n){"use strict";n.r(e);var r=n("0o2y"),a={data:function(){return{form:{name:"",loading:!1},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},redirect:"/tag"}},created:function(){this.id=this.$route.params.id,this.getData(this.id)},methods:{getData:function(t){var e=this;Object(r.b)(t).then(function(t){e.loading=!1,200===t.code?(e.form=t.data,e.form.is_task=1===t.data.is_task):e.$message.error(t.reason)})},onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.loading=!0,Object(r.e)(e.id,e.form).then(function(t){e.loading=!1,200===t.code?(e.$message({message:"操作成功",type:"success"}),e.$router.push({path:e.redirect||"/"})):e.$message.error(t.reason)})})},onCancel:function(){this.$message({message:"cancel!",type:"warning"})},resetForm:function(t){this.$refs[t].resetFields()}}},i=(n("i+0H"),n("KHd+")),o=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"标签名称",prop:"name"}},[n("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit("form")}}},[t._v("提交")]),t._v(" "),n("el-button",{on:{click:function(e){t.resetForm("form")}}},[t._v("重置")])],1)],1)],1)},[],!1,null,"ed13f94e",null);o.options.__file="edit.vue";e.default=o.exports},XQ5q:function(t,e,n){},"i+0H":function(t,e,n){"use strict";var r=n("XQ5q");n.n(r).a}}]);