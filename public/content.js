//Capitalizing word
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Send a message to the background that the content script is up and running:
chrome.runtime.sendMessage({ greeting: "from content" }, function (response) {
  console.log(response.color);
  if (Object.prototype.hasOwnProperty.call(response, 'color')) {
    censorColor = response.color;
    changeColor();
  }
});

var censorColor;
const changeColor = () => {
  let spoilers = document.querySelectorAll(".spoiler");

  for (let i = 0; i < spoilers.length; i++) {
    spoilers[i].style.color = censorColor;
    spoilers[i].style.backgroundColor = censorColor;
  }

  spoilers = document.querySelectorAll(".spoiler *");

  for (let i = 0; i < spoilers.length; i++) {
    spoilers[i].style.color = censorColor;
    spoilers[i].style.backgroundColor = censorColor;
  }
}

// Recieve message from the extension background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`Data Recieved from [SpoilerBlock]`, request);

  if (Object.prototype.hasOwnProperty.call(request, 'sbCensorColor')) {
    sendResponse({ success: true });
    censorColor = request.sbCensorColor;
  }
  else {
    sendResponse({ 'bruh': true });
    censorColor = request.color;
  }

  changeColor();
});



//function has been made to go over all of the words and replace them due to
//   javascript being dumb and how it needs access to the json
function replace_function(result) {

  // console.log(result);

  //// Will make ditionairy out of the JSON turned string made in result

  var dictionary_words = {};

  for (var i = 0, temp_word; i < result.length; i++) {
    temp_word = result[i];
    dictionary_words[temp_word.Word] = temp_word;
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
            // Account for plural words:
            replacedText = replacedText.replace(RegExp('\\b' + dictionary_words[keyWord].Word + 's' + '\\b'), '<spoiler>');
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
  .then(data => replace_function(data)) //calling the function that does all of the work
