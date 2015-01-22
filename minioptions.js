var gapi=document.querySelector('#gapi');
var gana=document.querySelector('#gana');
var gser=document.querySelector('#gser');
var icon=document.querySelector('#icon');
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
  gapi.className=localStorage["gapi"]==='true'?"on":"off";
  gana.className=localStorage["gana"]==='true'?"on":"off";
  gser.className=localStorage["gser"]==='true'?"on":"off";
  icon.className=localStorage["icon"]==='true'?"on":"off";
}
function switchkiller() {
  if(bgpage.working) {
    bgpage.unbind();
    killer.className="off";
  }
  else {
    bgpage.bindreq();
    killer.className="on";
  }
}
document.addEventListener('DOMContentLoaded',restore_options);
gapi.addEventListener('click',function(){save_options(gapi);});
gana.addEventListener('click',function(){save_options(gana);});
gser.addEventListener('click',function(){save_options(gser);});
icon.addEventListener('click',function(){save_options(icon);});
killer.addEventListener('click',switchkiller);