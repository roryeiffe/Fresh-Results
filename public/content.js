//Capitalizing word
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


//function has been made to go over all of the words and replace them due to
//   javascript being dumb and how it needs access to the json
function replace_function(result) {


  // console.log(result);

  //// Will make ditionairy out of the JSON turned string made in result

  // var dictionary_words = { };

  // for (var i = 0, temp_word; i < result.length; i++) {
  //     temp_word = result[i];
  //     dictionary_words[temp_word.Word] = temp_word;
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
        //TODO: replace this loop with a dictionairy look up implementation
        for (var k = 0; k < result.length; k++) {
          //will replace whole and capitalized whole words that are in result
          replacedText = replacedText.replace(RegExp('\\b' + result[k].Word + '\\b'), '<spoiler>');
          // Account for capital words:
          replacedText = replacedText.replace(RegExp('\\b' + result[k].Word.capitalize() + '\\b'), '<spoiler>');
          // Account for plural words:
          replacedText = replacedText.replace(RegExp('\\b' + result[k].Word + 's' + '\\b'), '<spoiler>');
        }

        // If we changed something, replace element on the page:
        if (replacedText !== text) {
          console.log("HERE");
          element.classList.add('spoiler'); //make everyrthing red
          element.replaceChild(document.createTextNode(replacedText), node)
        }
      }
    }
  }

}
//this is how the json can be retreived, changes also had to be made to manifest.json
fetch(chrome.runtime.getURL('dictionary.json'))
  .then(r => r.json())
  //.then(data => console.log(data))
  .then(data => replace_function(data)) //calling the function that does all of the work