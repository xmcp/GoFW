var count=[];
var urls=[];
var working=false;
chrome.browserAction.setBadgeBackgroundColor({color:'#AA00AA'});

function push(details,department) {
  chrome.tabs.query(
    {active:true,windowType:"normal",currentWindow: true},
    function(d) {
      var tabid=d[0].id;
      if(count[tabid]===undefined)
        count[tabid]=1;
      else
        count[tabid]+=1;
      if(urls[tabid]===undefined)
        urls[tabid]=[];
      urls[tabid].push([details.url,department]);
      chrome.browserAction.setBadgeText({text:count[tabid].toString(),tabId:tabid});
    }
  )
}

chrome.extension.onRequest.addListener(
  function(request,sender,sendResponse) {
    chrome.tabs.query(
      {active:true,windowType:"normal",currentWindow: true},
      function(d) {
        var tabid = [d[0].id];
        sendResponse({"working":working,"count": count[tabid]||0, "urls": urls[tabid]||[]})
      }
    )
  }
);

function nogapi(details){
  var url=details.url;
  push(details,'跳转Google API');
  return {redirectUrl: url.replace(".googleapis.com/",".useso.com/").replace('https://','http://')};
}
function nogana(details){
  push(details,'屏蔽谷歌统计');
  return {"cancel": true};
}
function nogser(details){
  push(details,'屏蔽失效服务');
  return {"cancel": true};
}
function noicon(details){
  var url=details.url;
  if(url.indexOf('://libs.useso.com/')!=-1)
    return {cancel: false};
  push(details,'跳转Glyphicons');
  return {redirectUrl: 'http://libs.useso.com/js/bootstrap/3.2.0/fonts/glyphicons-halflings-regular.woff'}
}

function bindreq() {
  working=true;
  chrome.browserAction.setIcon({path:'action.png'})
  if(localStorage["gapi"]==='true')
    chrome.webRequest.onBeforeRequest.addListener(
      nogapi,
      {urls:["*://ajax.googleapis.com/*","*://fonts.googleapis.com/*"]},
      ["blocking"]
    );
  if(localStorage["gana"]==='true')
    chrome.webRequest.onBeforeRequest.addListener(
      nogana,
      {urls:["*://www.google-analytics.com/*"]},
      ["blocking"]
    );
  if(localStorage["gser"]==='true')
    chrome.webRequest.onBeforeRequest.addListener(
      nogser,
      {urls:["*://*.google.com/*","*://*.youtube.com/*","*://*.facebook.com/*","*://*.twitter.com/*"]},
      ["blocking"]
    );
  if(localStorage["icon"]==='true')
    chrome.webRequest.onBeforeRequest.addListener(
      noicon,
      {urls:["*://*/*/glyphicons-halflings-regular.woff"]},
      ["blocking"]
    );
}
function unbind(willrebind) {
  working=false;
  if(!willrebind) {
    chrome.browserAction.setIcon({path:'disabled.png'});
    chrome.browserAction.setBadgeText({text:''});
  }
  chrome.webRequest.onBeforeRequest.removeListener(
    nogapi,
    {urls:["*://ajax.googleapis.com/*"]},
    ["blocking"]
  );
  chrome.webRequest.onBeforeRequest.removeListener(
    nogana,
    {urls:["*://www.google-analytics.com/*"]},
    ["blocking"]
  );
  chrome.webRequest.onBeforeRequest.removeListener(
    nogser,
    {urls:["*://*.google.com/*"]},
    ["blocking"]
  );
  chrome.webRequest.onBeforeRequest.addListener(
    noicon,
    {urls:["*://*/glyphicons-halflings-regular.woff"]},
    ["blocking"]
  );
}

bindreq();