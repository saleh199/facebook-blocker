chrome.tabs.query({url : "*://*.facebook.com/*"}, function(tabs_array){
        console.log(tabs_array);
});
