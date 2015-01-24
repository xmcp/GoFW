var count=[];
var urls=[];
var working=false;
chrome.browserAction.setBadgeBackgroundColor({color:'#AA00AA'});
chrome.extension.onRequest.addListener(
  function(request,sender,sendResponse) {
    chrome.tabs.query(
      {active:true,currentWindow: true},
      function(d) {
        var tabid = [d[0].id]||0;
        sendResponse({"tabid":tabid});
      }
    )
  }
);

chrome.runtime.onInstalled.addListener(
  function(details) {
    if(details.reason==="install") {
      localStorage["gapi"]=true;
      localStorage["gana"]=true;
      localStorage["gser"]=false;
      localStorage["icon"]=true;
      window.open(chrome.extension.getURL('options.html'));
    }
  }
);

function push(details,department) {
  var tabid=details.tabId;
  if(count[tabid]===undefined)
    count[tabid]=1;
  else
    count[tabid]+=1;
  if(urls[tabid]===undefined)
    urls[tabid]=[];
  urls[tabid].push([details.url,department]);
  chrome.browserAction.setBadgeText({text:count[tabid].toString(),tabId:tabid});
}

chrome.tabs.onUpdated.addListener(
  function(tabId,changeInfo){
    if(changeInfo.status=="loading") {
      count[tabId]=undefined;
      urls[tabId]=undefined;
    }
  }
);

chrome.tabs.onRemoved.addListener(
  function(tabId,removeInfo){
    count[tabId]=undefined;
    urls[tabId]=undefined;
  }
);

function nogapi(details){
  var url=details.url;
  push(details,'重定向Google API');
  return {redirectUrl: url.replace(".googleapis.com/",".useso.com/").replace('https://','http://')};
}
function nogana(details){
  push(details,'拦截谷歌统计');
  return {"cancel": true};
}
function nogser(details){
  push(details,'拦截无效服务');
  return {"cancel": true};
}
function noicon(details){
  var url=details.url;
  if(url.indexOf('chrome-extension://')==0)
    return {cancel: false};
  push(details,'缓存Glyphicons');
  if(url[-1]=='2')
    return {redirectUrl: chrome.extension.getURL('libs/fonts/glyphicons-halflings-regular.woff2')};
  else
    return {redirectUrl: chrome.extension.getURL('libs/fonts/glyphicons-halflings-regular.woff')}
}

function bindreq() {
  working=true;
  chrome.browserAction.setIcon({path:'icons/action.png'});
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
      {urls:["*://*/*/glyphicons-halflings-regular.woff","*://*/*/glyphicons-halflings-regular.woff2"]},
      ["blocking"]
    );
}
function unbind(willrebind) {
  working=false;
  if(!willrebind) {
    chrome.browserAction.setIcon({path:'icons/disabled.png'});
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
    {urls:["*://*/*/glyphicons-halflings-regular.woff","*://*/*/glyphicons-halflings-regular.woff2"]},
    ["blocking"]
  );
}

bindreq();