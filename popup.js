var count=document.querySelector('#count');
var all=document.querySelector("#all");
var killer=document.querySelector("#killer");
chrome.extension.sendRequest({},function(response){
  killer.className=response["working"]?"on":"off";
  count.innerText=response["count"];
  for(var i=0;i<response["urls"].length;i++) {
    var sub=document.createElement("li");
    var main=document.createElement("nobr");
    var sub1=document.createElement("b");
    var sub2=document.createElement("span");
    sub1.innerText=response["urls"][i][1];
    sub2.innerText=' '+response["urls"][i][0];
    sub.appendChild(sub1);
    sub.appendChild(sub2);
    main.appendChild(sub);
    all.appendChild(main);
  }
});