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
i});

var time = setInterval(function(){
	for(tabId in fbTabs){
	
	}
}, 2000);
