let color = "blue";
const DEFAULT_COLOR = 'red';

const updateColor = (new_color) => {
    color = new_color;
    chrome.storage.sync.set({ "sb-censor-color": color });
}

const startup = () => {

    // when the background script starts up, load the
    // color from the local storage
    color = DEFAULT_COLOR;
    chrome.storage.sync.get(`sb-censor-color`, (res) => {

        if (Object.prototype.hasOwnProperty.call(res, "sb-censor-color")) {
            color = res["sb-censor-color"];
        }
    });
    // chrome.storage.sync.set({ "sb-censor-color": color });

}

startup();

// Listen for incoming messages:
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // if this a request from the content page:
        if (sender.tab) {
            // Send back the color:
            console.log(`Sending color (${color}) to the content script!`);
            sendResponse({ color: color });
        }
        // If this is a request from the extension:
        else {
            // Take the data from the request:
            if (request.color == null) {
                console.error("Color is null...");
            }
            else {
                updateColor(request.color);

                // Let the extension know that the background
                // received the data:
                sendResponse({ farewell: `Background received the data => ${color}` });

                // Send the current color to all active tabs
                chrome.tabs.query({}, (tabs) => {
                    console.log("Sending updated color to all tabs.");
                    for (var i = 0; i < tabs.length; ++i) {

                        /**
                         * This will throw an error for every tab it is unable to find.
                         * It's fine for now.
                         */

                        chrome.tabs.sendMessage(tabs[i].id, { color: color }, (response) => {
                            // console.log(response);
                        });
                    }
                });

            }
        }

    }
);