// In reality, we would want to grab these from the excel sheet:
var spoiler_words = ['death', 'dying', 'marries', 'dead']

// Get all elements from the page:
var elements = document.getElementsByTagName('*');

// Loop through all elements:
for (var i = 0; i < elements.length; i ++) {
    var element = elements[i];
    // Loop through all words:
    for (var j = 0; j < element.childNodes.length; j ++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            // Grab the text value:
            var text = node.nodeValue;
            console.log(text);
            // Will store the replaced text:
            var replacedText = text;
            // Loop through spoiler words:
            for (var k = 0; k < spoiler_words.length; k ++) {
                // For each word, replace occurences of the word with empty text:
                replacedText = replacedText.replace(spoiler_words[k], '<spoiler>');
            }

            // If we changed something, replace element on the page:
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText),node)
            }
        }
    }
}