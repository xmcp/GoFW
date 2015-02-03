var count=document.querySelector('#count');
var all=document.querySelector("#all");
var killer=document.querySelector("#killer");
var bgpage=chrome.extension.getBackgroundPage();
chrome.extension.sendRequest({},function(response){
  tabid=response["tabid"];
  if(tabid!==0) {
    count.innerText = bgpage.count[tabid]||0;
    urls=bgpage.urls[tabid]||[];
    for (var now=0; now<urls.length; now++) {
      var sub = document.createElement("li");
      var main = document.createElement("nobr");
      var sub1 = document.createElement("b");
      var sub2 = document.createElement("span");
      sub1.innerText = urls[now][1];
      sub2.innerText = ' ' + urls[now][0];
      sub.appendChild(sub1);
      sub.appendChild(sub2);
      main.appendChild(sub);
      all.appendChild(main);
    }
  }
});