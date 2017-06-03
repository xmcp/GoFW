var gapi=document.getElementById('gapi');
var gana=document.getElementById('gana');
var gser=document.getElementById('gser');
var icon=document.getElementById('icon');
var jque=document.getElementById('jque');
var bgpage=chrome.extension.getBackgroundPage();
function save_options(name) {
  localStorage[name.id]=localStorage[name.id]!=='true';
  restore_options();
  if(bgpage.working) {
    bgpage.unbind(true);
    bgpage.bindreq();
  }
}
function restore_options() {
  gapi.checked=localStorage["gapi"]==='true';
  gana.checked=localStorage["gana"]==='true';
  gser.checked=localStorage["gser"]==='true';
  icon.checked=localStorage["icon"]==='true';
  jque.checked=localStorage["jque"]==='true';
}

document.addEventListener('DOMContentLoaded',function(){
  restore_options();
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://s.xmcp.ml/gofw/ad.html");
  xhr.onload = function(event) {
    document.querySelector("#ad").innerHTML = xhr.response;
  };
  xhr.send();
});
gapi.addEventListener('click',function(){save_options(gapi);});
gana.addEventListener('click',function(){save_options(gana);});
gser.addEventListener('click',function(){save_options(gser);});
icon.addEventListener('click',function(){save_options(icon);});
jque.addEventListener('click',function(){save_options(jque);});
