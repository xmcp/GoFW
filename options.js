var gapi=document.querySelector('#gapi');
var gana=document.querySelector('#gana');
var gser=document.querySelector('#gser');
var icon=document.querySelector('#icon');
var jque=document.querySelector('#jque');
var netchk=document.querySelector('#netchk');
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
  netchk.checked=localStorage["netchk"]==='true';
  gapi.checked=localStorage["gapi"]==='true';
  gana.checked=localStorage["gana"]==='true';
  gser.checked=localStorage["gser"]==='true';
  icon.checked=localStorage["icon"]==='true';
  jque.checked=localStorage["jque"]==='true';
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
netchk.addEventListener('click',function(){
  localStorage["netchk"]=netchk.checked;
  if(netchk.checked) {
    chrome.permissions.request({permissions: ['idle']});
    bgpage.startCheckNetwork();
  }
  else
    bgpage.stopCheckNetwork();
});