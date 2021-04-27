import DictionaryJSON from './dictionary.json'
import React from "react";
import ReactDOM from "react-dom";
import ContentPopup from './contentComponents/ContentPopup';
import './contentComponents/style.scss';
import { domMax } from 'framer-motion';

window.onload = async () => {
    init();
}

//Capitalizing word
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let SB_ENABLED = false;
const init = () => {
    // Send a message to the background that the content script is up and running:
    chrome.runtime.sendMessage({ type: 'PAGE_MOUNT' }, function (response) {
        console.log(`Page Mount Response =>`, response);

        // check that the spoiler block is enabled
        if (!Object.prototype.hasOwnProperty.call(response, "sb-enabled")) {
            console.error("No specificiation as to whether SpoilerBlock is enabled or disabled.");
            return;
        }

        SB_ENABLED = response["sb-enabled"];

        if (Object.prototype.hasOwnProperty.call(response, 'color')) {
            // update values based on response:
            censorColor = response.color;
            customWords = response.words;
        }

        blockSpoilers();
    });

    setupGoogleSuggestionBlocker();
}

const setupGoogleSuggestionBlocker = () => {

    let searchInput = document.querySelector("input.gLFyf");
    if (!searchInput) {
        console.error("No search input found");
        return;
    }

    // add event listeners to block the suggestions from the
    // search list
    searchInput.addEventListener('keyup', blockSuggestions);
    searchInput.addEventListener('click', blockSuggestions);
    searchInput.addEventListener('change', blockSuggestions);
}

const blockSuggestions = (evt) => {
    let suggestionsContainer = document.querySelector('ul.erkvQe');
    if (!suggestionsContainer) {
        console.error("Failed to find the suggestions container");
    }

    // check through the elements
    for (let i = 0; i < suggestionsContainer.childNodes.length; ++i) {

        let suggestion = suggestionsContainer.childNodes[i];
        let textNode = suggestion.querySelector('div.LaCQgf div.zRAHie div.aypzV span')

        if (!textNode) continue;
        if (hasSpoilers(textNode.innerText)) {
            // block the node
            suggestion.classList.add('spoiler');
            suggestion.style.color = censorColor;
            suggestion.style.backgroundColor = censorColor;
            textNode.innerText = "";
        }
        else {
            suggestion.classList.remove('spoiler');
            suggestion.style.color = "";
            suggestion.style.backgroundColor = "";
        }
    }

}

const hasSpoilers = (txt) => {

    const dictionary_words = createDictionaryWords(DictionaryJSON);
    var splitText = txt.split(" ");
    //loop going through each word

    let hasSpoiler = false;
    for (var k = 0; k < splitText.length && !hasSpoiler; ++k) {
        //keys are in lowercase so this fixes the issue of capitalized words
        let keyWord = splitText[k].toLowerCase();

        if (keyWord in dictionary_words) {
            hasSpoiler = true;
        }
        if (!hasSpoiler && keyWord.slice(0, -1) in dictionary_words) {
            hasSpoiler = true;
        }
    }

    return hasSpoiler;
}

const disableSpoilerBlock = () => {
    // disable the spoiler blocking
    let spoilers = document.querySelectorAll(".spoiler");
    // loop through all spoiler elements and color them in:
    for (let i = 0; i < spoilers.length; i++) {
        spoilers[i].style.color = "";
        spoilers[i].style.backgroundColor = "";
    }
    // Get all elements that were labelled as a spoiler:
    spoilers = document.querySelectorAll(".spoiler *");
    // loop through all spoiler elements and color them in:
    for (let i = 0; i < spoilers.length; i++) {
        spoilers[i].style.color = "";
        spoilers[i].style.backgroundColor = "";
    }
}

const blockSpoilers = () => {
    if (!SB_ENABLED) return;

    // setupContentReactView();

    replace_function(DictionaryJSON, customWords);
    changeColor();
}

var censorColor;
var customWords;
// Change the color of the spoiled texts:
const changeColor = () => {
    // Get all elements that were labelled as a spoiler:
    let spoilers = document.querySelectorAll(".spoiler");
    // loop through all spoiler elements and color them in:
    for (let i = 0; i < spoilers.length; i++) {
        spoilers[i].style.color = censorColor;
        spoilers[i].style.backgroundColor = censorColor;
    }
    // Get all elements that were labelled as a spoiler:
    spoilers = document.querySelectorAll(".spoiler *");
    // loop through all spoiler elements and color them in:
    for (let i = 0; i < spoilers.length; i++) {
        spoilers[i].style.color = censorColor;
        spoilers[i].style.backgroundColor = censorColor;
    }
}

// Recieve message from the extension background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let updated = false;
    if (Object.prototype.hasOwnProperty.call(request, 'color')) {
        censorColor = request.color;
        updated = true;
    }
    if (Object.prototype.hasOwnProperty.call(request, 'words')) {
        customWords = request.words;
        updated = true;
    }
    if (Object.prototype.hasOwnProperty.call(request, 'sb-enabled')) {
        SB_ENABLED = request["sb-enabled"];
        updated = true;
    }

    if (!SB_ENABLED) disableSpoilerBlock();

    sendResponse({ 'success': true });
    if (updated) blockSpoilers();
});

const createDictionaryWords = (dictionary_) => {

    let dictionary_words = {};

    for (var i = 0, temp_word; i < dictionary_.length; i++) {
        temp_word = dictionary_[i];
        dictionary_words[temp_word.Word] = temp_word;
    }

    for (const group in customWords) {
        let wordList = customWords[group];
        // loop through the sub list:
        for (let i = 0; i < wordList.length; ++i) {
            // add each word to the dictionary:
            if (wordList[i].toLowerCase() !== "") {
                temp_word = {
                    Word: wordList[i].toLowerCase(),
                    Strength: 10 //custom words will get max strength
                }
                dictionary_words[temp_word.Word] = temp_word;
            }
        }
    }

    return dictionary_words
}

//function has been made to go over all of the words and replace them due to
//   javascript being dumb and how it needs access to the json
function replace_function(result, customWords) {

    //// Will make dictionairy out of the JSON turned string made in result

    var dictionary_words = {};

    for (var i = 0, temp_word; i < result.length; i++) {
        temp_word = result[i];
        dictionary_words[temp_word.Word] = temp_word;
    }

    // for each word group in custom words:
    for (const group in customWords) {
        let wordList = customWords[group];
        // loop through the sub list:
        for (let i = 0; i < wordList.length; i++) {
            // add each word to the dictionary:
            if (wordList[i].toLowerCase() !== "") {
                temp_word = {
                    Word: wordList[i].toLowerCase(),
                    Strength: 10 //custom words will get max strength
                }
                dictionary_words[temp_word.Word] = temp_word;
            }
        }
    }

    for (const w in dictionary_words) {
        console.log(dictionary_words[w].Word);
    }

    // Get all elements from the page:
    var elements = document.getElementsByTagName('*');

    // Loop through all elements:
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        // Loop through all words:
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                // Grab the text value:
                var text = node.nodeValue;
                // Will store the replaced text:

                //need to break up long strings (i.e. replacedText) by spaces to check for individual words
                var splitText = text.split(" ");
                //loop going through each word

                let hasSpoiler = false;
                for (var k = 0; k < splitText.length && !hasSpoiler; k += 1) {
                    //keys are in lowercase so this fixes the issue of capitalized words
                    let keyWord = splitText[k].toLowerCase();

                    if (keyWord in dictionary_words) {
                        hasSpoiler = true;

                    }
                    if (!hasSpoiler && keyWord.slice(0, -1) in dictionary_words) {
                        hasSpoiler = true;
                    }
                }

                // If we changed something, replace element on the page:
                if (hasSpoiler) {
                    // console.log("HERE");
                    element.classList.add('spoiler');
                    // element.replaceChild(document.createTextNode(replacedText), node)
                }
            }
        }
    }
    changeColor();
}

/**
 * Calculate how many augments are needed to transform [word] into [target].
 * An augment can include an insertion, deletion, and substitution
 */
let dp = [];
export const minAugments = (target, word) => {

    if (target.length == 0 || word.length == 0)
        return Math.max(target.length, word.length);

    // update size of dp
    for (let i = 0; i < dp.length; ++i) {
        // each row should be size word.length + 1
        if (dp[i].length < word.length + 1)
            dp[i] = Array.from(new Array(word.length + 1), _ => 0);
    }
    for (let i = dp.length; i < target.length + 1; ++i) {
        dp.push(Array.from(new Array(word.length + 1), _ => 0));
    }

    // size of dp should be AT LEAST target.length * word.length
    if (dp.length < target.length || dp[0].length < word.length) {
        console.error("DP IS TOO SMALL");
        return Number.MAX_VALUE;
    }

    // set th einitial value
    dp[0][0] = 0;
    for (let i = 0; i < target.length; ++i) dp[i][0] = i;
    for (let j = 0; j < word.length; ++j) dp[0][j] = j;
    for (let i = 1; i < target.length + 1; ++i) {
        for (let j = 1; j < word.length + 1; ++j) {

            let diff = target[i - 1] != word[j - 1];
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + (diff ? 1 : 0)
            );

        }
    }

    return dp[target.length][word.length];
}

const setupContentReactView = () => {
    // 1. Create the element that will hold our popup
    let contentContainerID = "sb-content-popup-container";
    let contentPopupContainer = document.createElement('div');
    contentPopupContainer.setAttribute("id", contentContainerID);

    // 2. Insert this element into the page
    let body = document.getElementsByTagName('body')[0] || undefined;
    if (body == undefined) {
        console.error("No body tag found on this page.");
        return;
    }

    body.appendChild(contentPopupContainer);

    // 3. Inject the app into this container
    ReactDOM.render(<ContentPopup />, document.getElementById(contentContainerID));
}