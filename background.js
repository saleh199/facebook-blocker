var fbTabs = {}, extEnabled;

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
	if(extEnabled == true){
		now = new Date().getTime();
		for(tabId in fbTabs){
			diff = now - new Date(fbTabs[tabId]);
			if(diff > 600000){
				chrome.tabs.remove(parseInt(tabId));
			}
		}
	}
}, 2000);


// On Click Ext. icon
chrome.browserAction.onClicked.addListener(function(){
	extEnabled = !extEnabled;
	chrome.storage.local.set({"enabled" : extEnabled});

	if(extEnabled == true){
                chrome.browserAction.setIcon({"path" : './icon.png'});
        }else{
                chrome.browserAction.setIcon({"path" : './icon-inactive.png'});
        }

});

// Bootstrap method
init = function(){
	chrome.storage.local.get('enabled', function(data){
	        if(data.hasOwnProperty('enabled')){
        	        extEnabled = data.enabled;
	        }else{
			extEnabled = true;
		}

	        if(extEnabled == true){
        	        chrome.browserAction.setIcon({"path" : './icon.png'});
	        }else{
	                chrome.browserAction.setIcon({"path" : './icon-inactive.png'});
	        }
	});

}

window.addEventListener('load', init);
