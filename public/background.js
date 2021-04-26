let color = "blue";
let words = {'default': ['kills', 'steal', 'dies', 'resurrected' ]};
let threshold = 0;
// define default values:
const DEFAULT_COLOR = '#FF4747';
const DEFAULT_WORDS = {'default': ['kills', 'steal', 'dies', 'resurrected' ]};
const DEFAULT_THRESHOLD = 0;

// update the color with the new color and store it in chrome storage:
const updateColor = (new_color) => {
    color = new_color;
    chrome.storage.sync.set({ "sb-censor-color": color });
}

// update threshold with new value and store it in chrome storage
const updateThreshold = (new_threshold) => {
    threshold = new_threshold;
    chrome.storage.sync.set({ "sb-censor-threshold": threshold });
}

// update words with the new words:
const updateWords = (new_words) => {
    words = new_words;
    chrome.storage.sync.set({ "custom-words": new_words });
}

const startup = () => {

    // when the background script starts up, load the
    // color from the local storage
    color = DEFAULT_COLOR;
    threshold = DEFAULT_THRESHOLD;
    words = DEFAULT_WORDS;

    chrome.storage.sync.get(`sb-censor-color`, (res) => {

        if (Object.prototype.hasOwnProperty.call(res, "sb-censor-color")) {
            color = res["sb-censor-color"];
        }
    });
    chrome.storage.sync.get(`sb-censor-threshold`, (res) => {

        if (Object.prototype.hasOwnProperty.call(res, "sb-censor-threshold")) {
            threshold = res["sb-censor-threshold"];
        }
    });
    // get custom words from local storage:
    chrome.storage.sync.get(`custom-words`, (res) => {

        if (Object.prototype.hasOwnProperty.call(res, "custom-words")) {
            words = res["custom-words"];
        }
    });
    // if data is null, update with the default:
    if (!color) updateColor(DEFAULT_COLOR);
    if (!words) updateWords(DEFAULT_WORDS);

}

startup();

// Listen for incoming messages:
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // if this a request from the content page:
        if (sender.tab) {
            // Send back the color:
            console.log(`Sending color (${color}) and threshold (${threshold}) to the content script!`);
            sendResponse({ color: color, threshold: threshold });
        }
        // If this is a request from the extension:
        else {
            // Take the data from the request:
            if (request.color == null) {
                console.error("Color is null...");
                sendResponse({ farewell: `Background did not receive the color data` });
            }
            else {
                updateColor(request.color);

                // Let the extension know that the background
                // received the data:
                sendResponse({ farewell: `Background received the color data => ${color}` });

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
            if (request.threshold == null) {
                console.error("Threshold is null...");
                sendResponse({ farewell: `Background did not receive the threshold data` });
            }
            else {
                updateThreshold(request.threshold);

                // Let the extension know that the background
                // received the data:
                sendResponse({ farewell: `Background received the threshold data => ${threshold}` });

                // Send the current color to all active tabs
                chrome.tabs.query({}, (tabs) => {
                    console.log("Sending updated threshold to all tabs.");
                    for (var i = 0; i < tabs.length; ++i) {
                        chrome.tabs.sendMessage(tabs[i].id, { threshold: threshold }, (response) => {
                            // console.log(response);
                        });
                    }
                });

            }

            if (request.words == null) {
                console.error("Custom words are null...");
                sendResponse({ farewell: `Background did not receive the words data` });
            }
            else {
                // update values for words
                updateWords(request.words);

                // Let the extension know that the background
                // received the data:
                sendResponse({ farewell: `Background received the words data => ${words}` });

                // Send the new words to all active tabs
                chrome.tabs.query({}, (tabs) => {
                    console.log("Sending updated words to all tabs.");
                    for (var i = 0; i < tabs.length; ++i) {
                        chrome.tabs.sendMessage(tabs[i].id, { words: words }, (response) => {
                            // console.log(response);
                        });
                    }
                });

            }

        }

    }
);
