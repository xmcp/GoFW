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
  killer.className=bgpage.working ?"btn btn-sm on":"btn btn-sm off";
  gapi.className=localStorage["gapi"]==='true'?"btn btn-xs on":"btn btn-xs off";
  gana.className=localStorage["gana"]==='true'?"btn btn-xs on":"btn btn-xs off";
  gser.className=localStorage["gser"]==='true'?"btn btn-xs on":"btn btn-xs off";
  icon.className=localStorage["icon"]==='true'?"btn btn-xs on":"btn btn-xs off";
  jque.className=localStorage["jque"]==='true'?"btn btn-xs on":"btn btn-xs off";
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
document.addEventListener('DOMContentLoaded',restore_options);
gapi.addEventListener('click',function(){save_options(gapi);});
gana.addEventListener('click',function(){save_options(gana);});
gser.addEventListener('click',function(){save_options(gser);});
icon.addEventListener('click',function(){save_options(icon);});
jque.addEventListener('click',function(){save_options(jque);});
killer.addEventListener('click',switchkiller);