(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const c=document.querySelector(".cards"),s="https://anno-nymo.netlify.app/.netlify/functions/index";window.post=async()=>{var n=new URL(s);n.searchParams.set("title",document.querySelector("#title").value),n.searchParams.set("creater",document.querySelector("#creater").value),n.searchParams.set("content",document.querySelector("textarea").value);var o=await(await fetch(n)).text();document.location.hash=o,document.querySelector(".upload-menu").classList.toggle("card-focus"),window.location.reload()};function l(n){return c.innerHTML+=`<div class="card" onclick="!this.classList.contains('card-focus') && this.classList.add('card-focus')"><h2>Loading...</h2><p>Loading...</p><p>Loading...</p><button style="position: relative; margin: 10px" onclick="share('${n}')">Share</button><button onpointerdown="event.preventDefault()||this.parentElement.classList.remove('card-focus')">CLOSE</button></div>`,c.lastChild.childNodes}window.share=n=>{document.location.hash=n,navigator.share({url:document.location})};async function m(){return await(await fetch(`${s}/random`)).json()}const d=async n=>{for(let o=0;o<n;o++){const{title:i,content:a,meta:e,id:t}=await m(),[r,u,f]=l(t);r.innerText=i,u.innerText=e,f.innerText=a}};c.onscroll=n=>{c.scrollHeight-c.scrollTop-c.clientHeight<200&&d(2)};async function h(){const{title:n,content:o,meta:i,id:a}=await(await fetch(`${s}/id?id=${document.location.hash.replace("#","")}`)).json(),[e,t,r]=l(a);e.parentElement.classList.add("card-focus"),e.innerText=n,t.innerText=i,r.innerText=o}document.location.hash?h():d(10);
