let color = "blue";

// Listen for incoming messages:
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // if this a request from the content page:
        if (sender.tab) {
            // Log the request
            console.log(request.greeting);
            // Send back the color:
            sendResponse ({color: color})
        }
        // If this is a request from the extension:
        else {
            // Take the data from the request:
            color = request.color;
            console.log(color);
            // Let the extension know that the background
            // received the data:
            sendResponse ({farewell: "Background received the data"});
        }
      
    }
  );