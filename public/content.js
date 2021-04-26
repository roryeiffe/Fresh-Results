var censorColor;
var censorThreshold;
var customWords;

//Capitalizing word
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Send a message to the background that the content script is up and running:
chrome.runtime.sendMessage({ greeting: "from content" }, function (response) {
  if (Object.prototype.hasOwnProperty.call(response, 'color')) {
    // update values based on response:
    censorColor = response.color;
    // change the color of the webpage:
    changeColor();
  }
  if (Object.prototype.hasOwnProperty.call(response, 'threshold')) {
    censorThreshold = response.threshold;
  }
  if (Object.prototype.hasOwnProperty.call(response, 'words')) {
    // update values based on response:
    customWords = response.words;
  }
});

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
  console.log(`Data Recieved from [SpoilerBlock]`, request);

  if (Object.prototype.hasOwnProperty.call(request, 'color') && request.color != null) {
    sendResponse({ colorSuccess: true });
    censorColor = request.color;
  }

  if (Object.prototype.hasOwnProperty.call(request, 'threshold') && request.threshold != null) {
    sendResponse({ thresholdSuccess: true });
    censorThreshold = request.threshold;
  }

  changeColor();
});

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
  for (const group in customWords){
    let wordList = customWords[group];
    // loop through the sub list:
    for (let i = 0; i < wordList.length; i ++) {
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

  // for (const w in dictionary_words) {
  //   console.log(dictionary_words[w].Word);
  // }

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
        var replacedText = text;

        //need to break up long strings (i.e. replacedText) by spaces to check for individual words
        var splitText = text.split(" ");
        //loop going through each word
        for (var k = 0; k < splitText.length; k += 1) {
          //keys are in lowercase so this fixes the issue of capitalized words
          keyWord = splitText[k].toLowerCase();
          //if individual word is a key
          if (keyWord in dictionary_words) {
            //will replace whole and capitalized whole words that are in result
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord].Word + '\\b'), '<spoiler>');
            // Account for capital words:
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord].Word.capitalize() + '\\b'), '<spoiler>');
            // ACCOUNT FOR UPPERCASE WORDS:
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord].Word.toUpperCase() + '\\b'), '<SPOILER>');

          }
          //fix for checking plural words (just checking if all but last letter is key)
          if(keyWord.slice(0,-1) in dictionary_words){
            // Account for plural words:
            console.log(keyWord);
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord.slice(0,-1)].Word + 's' + '\\b'), '<spoiler>');
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord.slice(0,-1)].Word.capitalize() +'s'+ '\\b'), '<spoiler>');
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord.slice(0,-1)].Word.toUpperCase() +'S' + '\\b'), '<SPOILER>');

          }
        }

        // If we changed something, replace element on the page:
        if (replacedText !== text) {
          // console.log("HERE");
          element.classList.add('spoiler');
          element.replaceChild(document.createTextNode(replacedText), node)
        }
      }
    }
  }
  changeColor();


}

//this is how the json can be retreived, changes also had to be made to manifest.json
fetch(chrome.runtime.getURL('dictionary.json'))
  .then(r => r.json())
  //.then(data => console.log(data))
  .then(data => replace_function(data, customWords)) //calling the function that does all of the work
