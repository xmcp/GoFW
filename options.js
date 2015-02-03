var gapi=document.querySelector('#gapi');
var gana=document.querySelector('#gana');
var gser=document.querySelector('#gser');
var icon=document.querySelector('#icon');
var jque=document.querySelector('#jque');
var killer=document.querySelector('#killer');
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
  killer.checked=bgpage.working;
  gapi.checked=localStorage["gapi"]==='true';
  gana.checked=localStorage["gana"]==='true';
  gser.checked=localStorage["gser"]==='true';
  icon.checked=localStorage["icon"]==='true';
  jque.checked=localStorage["jque"]==='true';
}
function switchkiller() {
  if(bgpage.working) {
    bgpage.unbind();
    killer.className="btn btn-sm off";
  }
  else {
    bgpage.bindreq();
    killer.className="btn btn-sm on";
  }
}
document.addEventListener('DOMContentLoaded',function(){
  restore_options();
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://s.xmcp.tk/gofw/ad.html");
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
killer.addEventListener('click',switchkiller);