let color = "blue";
const DEFAULT_COLOR = 'red';
let words = {'default': ['kills', 'steal', 'dies', 'resurrected' ], 'Star Wars': ['Luke Skywalker', 'anakin', 'Darth Vader']};
const DEFAULT_WORDS = {'default': ['kills', 'steal', 'dies', 'resurrected' ], 'Star Wars': ['Luke Skywalker', 'anakin', 'Darth Vader']};

const updateColor = (new_color) => {
    color = new_color;
    chrome.storage.sync.set({ "sb-censor-color": color });
}

const updateWords = (new_words) => {
    words = new_words;
}

const startup = () => {

    // when the background script starts up, load the
    // color from the local storage
    color = DEFAULT_COLOR;
    words = DEFAULT_WORDS;
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
            // Send back the color and custom words:
            console.log(`Sending color (${color}) to the content script!`);
            sendResponse({ color: color, words:words });
        }
        // If this is a request from the extension:
        else {
            console.log(request);
            // Take the data from the request:
            if (request.color == null) {
                console.error("Color is null...");
                sendResponse({ farewell: `Background did not receive the data` });
            }
            else {
                updateColor(request.color);
                updateWords(request.words);

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
                        console.log(request.words);
                        console.log(words);
                        chrome.tabs.sendMessage(tabs[i].id, { color: color, words: words }, (response) => {
                            // console.log(response);
                        });
                    }
                });

            }
        }

    }
);