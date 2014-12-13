var fbTabs = {};
/*
chrome.tabs.query({url : "*://*.facebook.com/*"}, function(tabs_array){
        console.log(tabs_array);
});
*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.url){
		console.log(changeInfo);
		url = changeInfo.url;
		pattern = /https?\:\/\/(?:www\.)?facebook\.com\/\/?/;
		ma = pattern.exec(url);
		//console.log(ma);
		if(ma){
			if(!fbTabs[tabId]){
				fbTabs[tabId] = new Date().getTime();
			}
		}
	}
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	delete fbTabs[tabId];
	console.log("Facebook tab["+tabId+"] closed");
});

var time = setInterval(function(){
	now = new Date().getTime();
	for(tabId in fbTabs){
		diff = now - new Date(fbTabs[tabId]);
		if(diff > 600000){
			chrome.tabs.remove(parseInt(tabId));
		}
	}
}, 2000);
