(function(){chrome.runtime.connect({name:"devtools"}).onMessage.addListener(function(a){a&&console.log(a)})})();
