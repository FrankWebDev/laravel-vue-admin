(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c495"],{Hkeo:function(e,n,t){"use strict";var r=t("cp+d");t.n(r).a},XqkG:function(e,n,t){"use strict";t.r(n);var r=t("zF5t"),s={data:function(){return{checkAll:!1,isIndeterminate:!0,form:{name:"",checkedPermissions:[],permissions:[],loading:!1},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},redirect:"/role"}},created:function(){this.id=this.$route.params.id,this.getData(this.id)},methods:{getData:function(e){var n=this;Object(r.b)(e).then(function(e){n.loading=!1,200===e.code?(n.form.name=e.data.role.name,n.form.permissions=e.data.permissions,n.form.checkedPermissions=e.data.checkedPermissions,n.form.permissions.length===n.form.checkedPermissions.length&&(n.checkAll=!0)):n.$message.error(e.reason)})},CheckAll:function(e){if(this.form.checkedPermissions=[],e)for(var n=0,t=this.form.permissions.length;n<t;n++)this.form.checkedPermissions.push(this.form.permissions[n].id);this.isIndeterminate=!1},PerChange:function(e){var n=e.length;this.isIndeterminate=n>0&&n<this.form.permissions.length},onSubmit:function(e){var n=this;this.$refs[e].validate(function(e){if(!e)return!1;n.loading=!0,Object(r.f)(n.id,n.form).then(function(e){n.loading=!1,200===e.code?(n.$message({message:"操作成功",type:"success"}),n.$router.push({path:n.redirect||"/"})):n.$message.error(e.reason)})})},onCancel:function(){this.$message({message:"cancel!",type:"warning"})},resetForm:function(e){this.$refs[e].resetFields()}}},i=(t("Hkeo"),t("KHd+")),o=Object(i.a)(s,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-container"},[t("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"220px"}},[t("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[t("el-col",{attrs:{span:10}},[t("el-input",{model:{value:e.form.name,callback:function(n){e.$set(e.form,"name",n)},expression:"form.name"}})],1),e._v(" "),t("el-col",{attrs:{span:14}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新增角色赋值权限",prop:"roles"}},[[t("el-checkbox",{on:{change:e.CheckAll},model:{value:e.checkAll,callback:function(n){e.checkAll=n},expression:"checkAll"}},[e._v("全选")]),e._v(" "),t("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),t("el-checkbox-group",{on:{change:e.PerChange},model:{value:e.form.checkedPermissions,callback:function(n){e.$set(e.form,"checkedPermissions",n)},expression:"form.checkedPermissions"}},e._l(e.form.permissions,function(n){return t("el-checkbox",{key:n.id,attrs:{label:n.id}},[e._v(e._s(n.name))])}))]],2),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(n){e.onSubmit("form")}}},[e._v("提交")]),e._v(" "),t("el-button",{on:{click:function(n){e.resetForm("form")}}},[e._v("重置")])],1)],1)],1)},[],!1,null,"cc428b14",null);o.options.__file="edit.vue";n.default=o.exports},"cp+d":function(e,n,t){},zF5t:function(e,n,t){"use strict";t.d(n,"c",function(){return s}),t.d(n,"d",function(){return i}),t.d(n,"e",function(){return o}),t.d(n,"b",function(){return c}),t.d(n,"f",function(){return a}),t.d(n,"a",function(){return l}),t.d(n,"g",function(){return u});var r=t("t3Un");function s(e){return Object(r.a)({url:"/api/roles",method:"get",params:e})}function i(){return r.a.get("/api/roles/create")}function o(e){return r.a.post("/api/roles",e)}function c(e){return r.a.get("/api/roles/"+e)}function a(e,n){return r.a.patch("/api/roles/"+e,n)}function l(e){return r.a.delete("/api/roles/"+e)}function u(e){return Object(r.a)({url:"/api/roles_search",method:"get",params:e})}}}]);