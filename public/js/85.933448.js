(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{"WW/u":function(t,e,r){"use strict";r.r(e);var s=r("o0o1"),a=r.n(s),n=r("yXPU"),u=r.n(n),i=r("+Awk"),o=r("U3AO"),c=r("e+/y"),h=r("pmkW"),p=new i.a("users"),l={name:"EditUser",components:{UserBio:o.a,UserCard:c.a,UserActivity:h.a},data:function(){return{user:{}}},watch:{$route:"getUser"},created:function(){var t=this.$route.params&&this.$route.params.id;t!==this.$store.getters.userId?this.getUser(t):this.$router.push("/profile/edit")},methods:{getUser:function(t){var e=this;return u()(a.a.mark((function r(){var s,n;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,p.get(t);case 2:s=r.sent,n=s.data,e.user=n;case 5:case"end":return r.stop()}}),r)})))()}}},d=r("KHd+"),f=Object(d.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-container"},[this.user?e("el-form",{attrs:{model:this.user}},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:6}},[e("user-card",{attrs:{user:this.user}})],1),this._v(" "),e("el-col",{attrs:{span:18}},[e("user-activity",{attrs:{user:this.user}})],1)],1)],1):this._e()],1)}),[],!1,null,null,null);e.default=f.exports}}]);