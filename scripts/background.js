console.log("Background running");

chrome.action.onClicked.addListener(IconClicked);

function IconClicked(tab)
{
  console.log("Action");
  
	let msg = {
		txt : "Hello"
	}
	
	console.log(tab);
	
	chrome.tabs.sendMessage(tab.id,msg);
}
