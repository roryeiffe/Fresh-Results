let color = "blue";
let words = {'default': ['kills', 'steal', 'dies', 'resurrected' ]};
// define default values:
const DEFAULT_COLOR = 'red';
const DEFAULT_WORDS = {'default': ['kills', 'steal', 'dies', 'resurrected' ]};

// update the color with the new color and store it in chrome storage:
const updateColor = (new_color) => {
    color = new_color;
    chrome.storage.sync.set({ "sb-censor-color": color });
}

// update words with the new words:
const updateWords = (new_words) => {
    words = new_words;
    chrome.storage.sync.set({ "custom-words": new_words });
}

const startup = () => {

    // when the background script starts up, load the
    // data from the local storage
    color = DEFAULT_COLOR;
    words = DEFAULT_WORDS;
    chrome.storage.sync.get(`sb-censor-color`, (res) => {

        if (Object.prototype.hasOwnProperty.call(res, "sb-censor-color")) {
            color = res["sb-censor-color"];
        }
    });
    // get custom words from local storage:
    chrome.storage.sync.get(`custom-words`, (res) => {

        if (Object.prototype.hasOwnProperty.call(res, "custom-words")) {
            words = res["custom-words"];
        }
    });


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
            // Take the data from the request:
            if (request.color == null || request.words == null) {
                console.error("Color or custom words are null...");
                sendResponse({ farewell: `Background did not receive the data` });
            }
            else {
                // update values for color and words:
                updateColor(request.color);
                updateWords(request.words);

                // Let the extension know that the background
                // received the data:
                sendResponse({ farewell: `Background received the data => ${color} ${words}` });

                // Send the current color to all active tabs
                chrome.tabs.query({}, (tabs) => {
                    console.log("Sending updated color to all tabs.");
                    for (var i = 0; i < tabs.length; ++i) {

                        /**
                         * This will throw an error for every tab it is unable to find.
                         * It's fine for now.
                         */
                        chrome.tabs.sendMessage(tabs[i].id, { color: color, words: words }, (response) => {
                            // console.log(response);
                        });
                    }
                });

            }
        }

    }
);