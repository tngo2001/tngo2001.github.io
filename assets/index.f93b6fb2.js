import{S as e,P as n,W as t,T as o,M as i,a as r,b as a,A as d,c as s,B as c,d as l,e as u,f as w}from"./vendor.37082f73.js";var f,p,m,y,v,h,g,x,S,z,q,A,E,L,b;L=new e,y=new n(75,window.innerWidth/window.innerHeight,.1,1e3),(E=new t({canvas:document.querySelector("#bg")})).setPixelRatio(window.devicePixelRatio),E.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",(function(){return E.setSize(window.innerWidth,window.innerHeight),y.aspect=window.innerWidth/window.innerHeight,y.updateProjectionMatrix()})),y.position.setZ(30),y.position.setX(-3),E.render(L,y),v=new o(10,3,16,100),g=new i({wireframe:!0}),b=new r(v,g),L.add(b),(A=new a(16777215)).position.set(5,5,5),p=new d(16777215),L.add(A,p),f=function(){var e,n,t,o,a;return v=new u(.25,24,24),g=new i({color:16777215}),n=new r(v,g),e=.5*Math.random()+.1,n.scale.set(e,e,e),[t,o,a]=Array(3).fill().map((function(){return w.randFloatSpread(100)})),n.position.set(t,o,a),L.add(n)},Array(2e3).fill().forEach(f),q=(new s).load("https://i.imgur.com/vXaFLyI.jpg"),z=new r(new c(3,3,3),new l({map:q})),L.add(z),x=new r(new u(3,32,32),new i({wireframe:!0})),L.add(x),x.position.z=30,x.position.setX(-10),z.position.z=-5,z.position.x=2,S=function(){var e;return e=document.body.getBoundingClientRect().top,x.rotation.x+=.05,x.rotation.y+=.075,x.rotation.z+=.05,z.rotation.y+=.02,y.position.z=-.01*e,y.position.x=-2e-4*e,y.rotation.y=-2e-4*e},document.body.onscroll=S,S(),(m=function(){return requestAnimationFrame(m),b.rotation.x+=.01,b.rotation.y+=.005,b.rotation.z+=.01,x.rotation.x+=.005,E.render(L,y)})(),h=function(e){var n,t,o,i;t=function(e,n){o(i+=e,n)},n=function(e,n){o(i=e,n)},(o=function(e,n){var t,o,r;for(r=document.querySelectorAll("#"+n+" .slides div"),t=document.querySelectorAll("#"+n+" .dot"),e>r.length&&(i=1),e<1&&(i=r.length),o=0;o<r.length;)r[o].style.display="none",o++;for(o=0;o<t.length;)t[o].className=t[o].className.replace(" active",""),o++;r[i-1].style.display="block",t[i-1].className+=" active"})(i=1,e),document.querySelector("#"+e+" .prev").addEventListener("click",(function(){t(-1,e)})),document.querySelector("#"+e+" .next").addEventListener("click",(function(){t(1,e)})),document.querySelectorAll("#"+e+" .dot").forEach((function(t,o){return t.addEventListener("click",(function(){return n(o+1,e)}))}))},document.addEventListener("DOMContentLoaded",(function(){h("experience"),h("projects")}));