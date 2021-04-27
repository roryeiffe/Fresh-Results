let enabled = true;
let color = "blue";
let words = { 'default': ['kills', 'steal', 'dies', 'resurrected'] };
let threshold = 0;
// define default values:
const DEFAULT_COLOR = '#FF4747';
const DEFAULT_WORDS = { 'default': ['kills', 'steal', 'dies', 'resurrected'] };
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

const updateEnabled = (enabled_value) => {
    enabled = enabled_value;
    chrome.storage.sync.set({ "sb-enabled": enabled_value });

    // send this status to the active tabs
    sendToActiveTabs({ "sb-enabled": enabled_value }, (response) => {
        console.log("updateEnabled sendMessage callback", response);
    });
}

const startup = () => {

    // when the background script starts up, load the
    // data from the local storage
    color = DEFAULT_COLOR;
    words = DEFAULT_WORDS;
    threshold = DEFAULT_THRESHOLD;

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
    // get the enabled state from storage
    chrome.storage.sync.get('sb-enabled', (res) => {
        if (Object.prototype.hasOwnProperty.call(res, 'sb-enabled')) {
            enabled = res["sb-enabled"]
        }
    });
    // if data is null, update with the default:
    if (!color) updateColor(DEFAULT_COLOR);
    if (!words) updateWords(DEFAULT_WORDS);
}

startup();

const processPageMount = (request, sender, sendResponse) => {
    // if this a request from the content page:
    if (!sender.tab) return;
    // Send back the color and custom words:
    console.log(`Sending color (${color}) to the content script!`);
    sendResponse({ color: color, words: words, "sb-enabled": enabled });

}

const processPopupParamsUpdate = (request, sender, sendResponse) => {
    // Take the data from the request:
    // if (request.color == null && request.words == null && request.threshold == null) {
    //     console.error("Color or custom words are null...");
    //     sendResponse({ farewell: `Background did not receive the data` });
    // }

    if (Object.prototype.hasOwnProperty.call(request, 'color') && request['color'] != null) {
        updateColor(request.color);
    }
    if (Object.prototype.hasOwnProperty.call(request, 'words') && request['words'] != null) {
        updateWords(request.words);
    }
    if (Object.prototype.hasOwnProperty.call(request, 'threshold') && request['threshold'] != null) {
        updateThreshold(request.threshold);
    }

    // Let the extension know that the background
    // received the data:
    sendResponse({ farewell: `Background received the data => ${color} ${words}` });

    // Send the current color to all active tabs
    sendToActiveTabs({ color, words, threshold }, (response) => { });

}

/**
 * @desc Send [message] to all active tabs
 */
const sendToActiveTabs = (message, responseCallback) => {
    chrome.tabs.query({}, (tabs) => {
        for (var i = 0; i < tabs.length; ++i) {
            try {
                chrome.tabs.sendMessage(tabs[i].id, message, responseCallback);
            }
            catch (err) { }
        }
    });
}

const handleSBEnableRequest = (request, sender, sendResponse) => {
    sendResponse({
        'sb-enabled': enabled
    });
}

const handleSBEnableChange = (request, sender, sendResponse) => {
    if (!Object.prototype.hasOwnProperty.call(request, "sb-enabled")) {
        console.error("No sb-enabled value provided from popup");
        sendResponse({
            error: "No sb-enabled value found",
            success: false
        });
        return;
    }
    updateEnabled(request["sb-enabled"]);
    sendResponse({ success: true });

}

// Listen for incoming messages:
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        debugger;

        if (!Object.prototype.hasOwnProperty.call(request, 'type')) {
            console.error(`Message recieved with no type...`);
            return;
        }

        switch (request['type']) {
            case "PAGE_MOUNT":
                processPageMount(request, sender, sendResponse);
                break;
            case "POPUP_PARAMS_UPDATE":
                processPopupParamsUpdate(request, sender, sendResponse);
                break;
            case "SB_ENABLED_REQUEST":
                handleSBEnableRequest(request, sender, sendResponse);
                break;
            case "SB_ENABLED_CHANGE":
                handleSBEnableChange(request, sender, sendResponse);
                break;
            default:
                console.error(`Request type (${request['type']}) not recognized.`);
        }

    }
);