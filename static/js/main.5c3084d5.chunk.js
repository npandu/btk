(this.webpackJsonpbtk=this.webpackJsonpbtk||[]).push([[0],{113:function(t,e,n){t.exports=n(142)},118:function(t,e,n){},142:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),o=n(48),i=n.n(o),c=(n(118),n(51)),l=n(165),u=n(161),s=n(164),f=n(160),d=n(166),h=n(159),p=function(){return a.a.createElement("div",null,a.a.createElement(d.a,{position:"static"},a.a.createElement(h.a,null,a.a.createElement(f.a,{variant:"h5",color:"green"},"Binary Tree Kudapattu"))))},m=n(12),x=function(t){var e=Object(r.useRef)(null);return Object(r.useEffect)((function(){t.data&&e.current&&function(){var n=m.b(t.data),r={top:10,right:120,bottom:10,left:90},a=900,o=a/6,i=m.c().x((function(t){return t.y})).y((function(t){return t.x})),c=m.e().nodeSize([10,o]);n.x0=o/2,n.y0=0,n.descendants().forEach((function(t,e){t.id=e,t._children=t.children,t.depth&&7!==t.data.name.length&&(t.children=null)}));var l=m.d(e.current).attr("viewBox",[-r.left,-r.top,a,10]).style("font","10px sans-serif").style("user-select","none"),u=l.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",3.5),s=l.append("g").attr("cursor","pointer").attr("pointer-events","all");(function t(e){var o=m.a&&m.a.altKey?2500:250,f=n.descendants().reverse(),d=n.links();c(n);var h=n,p=n;n.eachBefore((function(t){t.x<h.x&&(h=t),t.x>p.x&&(p=t)}));var x=p.x-h.x+r.top+r.bottom,g=l.transition().duration(o).attr("viewBox",[-r.left,h.x-r.top,a,x]).tween("resize",window.ResizeObserver?null:function(){return function(){return l.dispatch("toggle")}}),v=s.selectAll("g").data(f,(function(t){return t.id})),y=v.enter().append("g").attr("transform",(function(t){return"translate(".concat(e.y0,",").concat(e.x0,")")})).attr("fill-opacity",0).attr("stroke-opacity",0).on("click",(function(e){e.children=e.children?null:e._children,t(e)}));y.append("circle").attr("r",3.5).attr("fill",(function(t){return t._children?"#555":"#999"})).attr("stroke-width",10),y.append("text").attr("dy","0.31em").attr("x",(function(t){return t._children?-9:9})).attr("text-anchor",(function(t){return t._children?"end":"start"})).text((function(t){return t.data.name})).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","white");v.merge(y).transition(g).attr("transform",(function(t){return"translate(".concat(t.y,",").concat(t.x,")")})).attr("fill-opacity",1).attr("stroke-opacity",1),v.exit().transition(g).remove().attr("transform",(function(t){return"translate(".concat(e.y,",").concat(e.x,")")})).attr("fill-opacity",0).attr("stroke-opacity",0);var $=u.selectAll("path").data(d,(function(t){return t.target.id})),E=$.enter().append("path").attr("d",(function(t){var n={x:e.x0,y:e.y0};return i({source:n,target:n})}));$.merge(E).transition(g).attr("d",i),$.exit().transition(g).remove().attr("d",(function(t){var n={x:e.x,y:e.y};return i({source:n,target:n})})),n.eachBefore((function(t){t.x0=t.x,t.y0=t.y}))})(n),l.node()}()}),[t.data,e.current]),a.a.createElement("svg",{ref:e})},g=n(49),v=n.n(g),y=n(9),$=n.n(y),E=function(){var t=Object(r.useState)([]),e=Object(c.a)(t,2),n=e[0],o=e[1],i=function(){v.a.get("https://spreadsheets.google.com/feeds/list/1wpyciQu2aXL8IzqQBXtwMyP4oGBuJc82K9B--jqVwHk/1/public/values?alt=json").then((function(t){var e=function(t){var e={};e.name=t[0].gsx$name.$t,e.id=t[0].gsx$id.$t;var n=$.a.filter(t,(function(t){return"M"===t.gsx$gender.$t&&t.gsx$father.$t}));if(!e.children){var r=$.a.filter(n,(function(t){return t.gsx$father.$t===e.id})),a=[];r.forEach((function(t){var e={};e.name=t.gsx$name.$t,e.id=t.gsx$id.$t,a.push(e)})),e.children=$.a.cloneDeep(a)}return e.children.forEach((function(t){if(!t.children){var e=$.a.filter(n,(function(e){return e.gsx$father.$t===t.id})),r=[];e.forEach((function(t){var e={};e.name=t.gsx$name.$t,e.id=t.gsx$id.$t,r.push(e)})),t.children=$.a.cloneDeep(r),t.children.forEach((function(t){var e=$.a.filter(n,(function(e){return e.gsx$father.$t===t.id})),r=[];e.forEach((function(t){var e={};e.name=t.gsx$name.$t,e.id=t.gsx$id.$t,r.push(e)})),t.children=$.a.cloneDeep(r),t.children.forEach((function(t){var e=$.a.filter(n,(function(e){return e.gsx$father.$t===t.id})),r=[];e.forEach((function(t){var e={};e.name=t.gsx$name.$t,e.id=t.gsx$id.$t,r.push(e)})),t.children=$.a.cloneDeep(r)}))}))}})),e}(t.data.feed.entry);console.log(e),o(e)})).catch((function(t){console.log(t)})).finally((function(){}))};return Object(r.useEffect)((function(){n.length||i()}),[]),a.a.createElement(u.a,null,a.a.createElement(l.a,null),a.a.createElement(p,null),a.a.createElement(s.a,{my:4},a.a.createElement(f.a,{variant:"h6",gutterBottom:!0},"Generations of People from Kudapattu"),a.a.createElement(x,{data:n})))},w=n(162),k=n(24),b=n(50),B=Object(b.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:k.a.A400},background:{default:"#fff"}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(w.a,{theme:B},a.a.createElement(l.a,null),a.a.createElement(E,null)),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[113,1,2]]]);
//# sourceMappingURL=main.5c3084d5.chunk.js.map