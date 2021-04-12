//Capitalizing word
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
// this is temporary till able to figure out how to access dictionary.JSON from local directory
var jsonResult = JSON.stringify( [
    {
      "Word": "die",
      "Strength": 10
    },
    {
      "Word": "dies",
      "Strength": 10
    },
    {
      "Word": "actually",
      "Strength": 3
    },
    {
      "Word": "reveals",
      "Strength": 3
    },
    {
      "Word": "dead",
      "Strength": 10
    },
    {
      "Word": "alive",
      "Strength": 8
    },
    {
      "Word": "marry",
      "Strength": 7
    },
    {
      "Word": "marries",
      "Strength": 7
    },
    {
      "Word": "wed",
      "Strength": 7
    },
    {
      "Word": "wedding",
      "Strength": 6
    },
    {
      "Word": "deceased",
      "Strength": 9
    },
    {
      "Word": "kills",
      "Strength": 10
    },
    {
      "Word": "buried",
      "Strength": 8
    },
    {
      "Word": "lifeless",
      "Strength": 8
    },
    {
      "Word": "comatose",
      "Strength": 7
    },
    {
      "Word": "coma",
      "Strength": 7
    },
    {
      "Word": "unconsious",
      "Strength": 6
    },
    {
      "Word": "departed",
      "Strength": 10
    },
    {
      "Word": "in the grave",
      "Strength": 10
    },
    {
      "Word": "laid to rest",
      "Strength": 10
    },
    {
      "Word": "passed away",
      "Strength": 10
    },
    {
      "Word": "pushing up daises",
      "Strength": 10
    },
    {
      "Word": "six feet under",
      "Strength": 10
    },
    {
      "Word": "6ft under",
      "Strength": 10
    },
    {
      "Word": "resting in peace",
      "Strength": 10
    },
    {
      "Word": "marriage",
      "Strength": 7
    },
    {
      "Word": "matrimony",
      "Strength": 7
    },
    {
      "Word": "nuptuals",
      "Strength": 7
    },
    {
      "Word": "espousal",
      "Strength": 7
    },
    {
      "Word": "live",
      "Strength": 8
    },
    {
      "Word": "living",
      "Strength": 8
    },
    {
      "Word": "faint",
      "Strength": 3
    },
    {
      "Word": "trance",
      "Strength": 2
    },
    {
      "Word": "actually",
      "Strength": 7
    },
    {
      "Word": "conscious",
      "Strength": 6
    },
    {
      "Word": "really",
      "Strength": 7
    },
    {
      "Word": "indeed",
      "Strength": 7
    },
    {
      "Word": "overthrow",
      "Strength": 7
    },
    {
      "Word": "conquer",
      "Strength": 7
    },
    {
      "Word": "dethrone",
      "Strength": 7
    },
    {
      "Word": "vanquish",
      "Strength": 7
    },
    {
      "Word": "eradicate",
      "Strength": 7
    },
    {
      "Word": "overcome",
      "Strength": 7
    },
    {
      "Word": "overcame",
      "Strength": 7
    },
    {
      "Word": "oust",
      "Strength": 7
    },
    {
      "Word": "ousted",
      "Strength": 7
    },
    {
      "Word": "subver",
      "Strength": 7
    },
    {
      "Word": "raze",
      "Strength": 7
    },
    {
      "Word": "overrun",
      "Strength": 7
    },
    {
      "Word": "crush",
      "Strength": 7
    },
    {
      "Word": "abolish",
      "Strength": 7
    },
    {
      "Word": "topple",
      "Strength": 7
    },
    {
      "Word": "unseat",
      "Strength": 7
    },
    {
      "Word": "exterminate",
      "Strength": 7
    },
    {
      "Word": "beat",
      "Strength": 8
    },
    {
      "Word": "win",
      "Strength": 8
    },
    {
      "Word": "wins",
      "Strength": 8
    },
    {
      "Word": "victory",
      "Strength": 8
    },
    {
      "Word": "victor",
      "Strength": 8
    },
    {
      "Word": "achievement",
      "Strength": 8
    },
    {
      "Word": "defeat",
      "Strength": 8
    },
    {
      "Word": "loses",
      "Strength": 8
    },
    {
      "Word": "lost",
      "Strength": 8
    },
    {
      "Word": "triumph",
      "Strength": 8
    },
    {
      "Word": "beat",
      "Strength": 8
    },
    {
      "Word": "beats",
      "Strength": 8
    },
    {
      "Word": "winning",
      "Strength": 8
    },
    {
      "Word": "winner",
      "Strength": 8
    },
    {
      "Word": "winners",
      "Strength": 8
    },
    {
      "Word": "victorious",
      "Strength": 8
    },
    {
      "Word": "success",
      "Strength": 8
    },
    {
      "Word": "succeed",
      "Strength": 8
    },
    {
      "Word": "divorce",
      "Strength": 7
    },
    {
      "Word": "divorced",
      "Strength": 7
    },
    {
      "Word": "annul",
      "Strength": 7
    },
    {
      "Word": "unmarry",
      "Strength": 7
    },
    {
      "Word": "fail",
      "Strength": 8
    },
    {
      "Word": "fails",
      "Strength": 8
    },
    {
      "Word": "give up",
      "Strength": 8
    },
    {
      "Word": "gives up",
      "Strength": 8
    },
    {
      "Word": "gave up",
      "Strength": 8
    },
    {
      "Word": "surrender",
      "Strength": 8
    },
    {
      "Word": "surrenders",
      "Strength": 8
    },
    {
      "Word": "surrendered",
      "Strength": 8
    },
    {
      "Word": "loss",
      "Strength": 8
    },
    {
      "Word": "sacrifice",
      "Strength": 7
    },
    {
      "Word": "divorces",
      "Strength": 7
    },
    {
      "Word": "wife",
      "Strength": 6
    },
    {
      "Word": "husband",
      "Strength": 6
    },
    {
      "Word": "spose",
      "Strength": 6
    },
    {
      "Word": "wives",
      "Strength": 7
    },
    {
      "Word": "status",
      "Strength": 5
    },
    {
      "Word": "assault",
      "Strength": 7
    },
    {
      "Word": "assaualted",
      "Strength": 7
    },
    {
      "Word": "assaualting",
      "Strength": 7
    },
    {
      "Word": "asaults",
      "Strength": 7
    },
    {
      "Word": "bit the bullet",
      "Strength": 10
    },
    {
      "Word": "kill",
      "Strength": 10
    },
    {
      "Word": "killing",
      "Strength": 10
    },
    {
      "Word": "killed",
      "Strength": 10
    },
    {
      "Word": "killer",
      "Strength": 10
    },
    {
      "Word": "killers",
      "Strength": 10
    },
    {
      "Word": "murder",
      "Strength": 10
    },
    {
      "Word": "murders",
      "Strength": 10
    },
    {
      "Word": "murdering",
      "Strength": 10
    },
    {
      "Word": "murderer",
      "Strength": 10
    },
    {
      "Word": "murderers",
      "Strength": 10
    },
    {
      "Word": "murdered",
      "Strength": 10
    },
    {
      "Word": "assassin",
      "Strength": 6
    },
    {
      "Word": "assassinated",
      "Strength": 9
    },
    {
      "Word": "assassins",
      "Strength": 6
    },
    {
      "Word": "slayed",
      "Strength": 8
    },
    {
      "Word": "shot",
      "Strength": 9
    },
    {
      "Word": "shooter",
      "Strength": 9
    },
    {
      "Word": "shooting",
      "Strength": 9
    },
    {
      "Word": "shooters",
      "Strength": 9
    },
    {
      "Word": "shootings",
      "Strength": 9
    },
    {
      "Word": "death",
      "Strength": 10
    },
    {
      "Word": "steal",
      "Strength": 4
    },
    {
      "Word": "steals",
      "Strength": 4
    },
    {
      "Word": "stole",
      "Strength": 4
    },
    {
      "Word": "save",
      "Strength": 7
    },
    {
      "Word": "saved",
      "Strength": 7
    },
    {
      "Word": "rescued",
      "Strength": 7
    },
    {
      "Word": "paid",
      "Strength": 4
    },
    {
      "Word": "pay",
      "Strength": 4
    },
    {
      "Word": "payed",
      "Strength": 4
    },
    {
      "Word": "let loose",
      "Strength": 5
    },
    {
      "Word": "set free",
      "Strength": 6
    },
    {
      "Word": "came to rescue",
      "Strength": 7
    },
    {
      "Word": "came to the rescue",
      "Strength": 7
    },
    {
      "Word": "come to rescue",
      "Strength": 7
    },
    {
      "Word": "hurt",
      "Strength": 8
    },
    {
      "Word": "wound",
      "Strength": 7
    },
    {
      "Word": "wounded",
      "Strength": 7
    },
    {
      "Word": "wounds",
      "Strength": 7
    },
    {
      "Word": "stab",
      "Strength": 9
    },
    {
      "Word": "stabbed",
      "Strength": 9
    },
    {
      "Word": "stabber",
      "Strength": 9
    },
    {
      "Word": "stabs",
      "Strength": 9
    },
    {
      "Word": "stabbers",
      "Strength": 9
    },
    {
      "Word": "maul",
      "Strength": 9
    },
    {
      "Word": "mauls",
      "Strength": 9
    },
    {
      "Word": "mauled",
      "Strength": 9
    },
    {
      "Word": "shoots",
      "Strength": 10
    },
    {
      "Word": "burial",
      "Strength": 8
    },
    {
      "Word": "bury",
      "Strength": 8
    },
    {
      "Word": "burries",
      "Strength": 8
    },
    {
      "Word": "succumb",
      "Strength": 9
    },
    {
      "Word": "succumbs",
      "Strength": 9
    },
    {
      "Word": "villain",
      "Strength": 5
    },
    {
      "Word": "antagonist",
      "Strength": 5
    },
    {
      "Word": "criminal",
      "Strength": 3
    },
    {
      "Word": "bad huy",
      "Strength": 5
    },
    {
      "Word": "evil",
      "Strength": 4
    },
    {
      "Word": "drug",
      "Strength": 5
    },
    {
      "Word": "drugs",
      "Strength": 5
    },
    {
      "Word": "druggy",
      "Strength": 5
    },
    {
      "Word": "drugged",
      "Strength": 5
    },
    {
      "Word": "arson",
      "Strength": 6
    },
    {
      "Word": "arsonist",
      "Strength": 6
    },
    {
      "Word": "genocide",
      "Strength": 6
    },
    {
      "Word": "cannibal",
      "Strength": 6
    },
    {
      "Word": "canniballistic",
      "Strength": 6
    },
    {
      "Word": "cannibals",
      "Strength": 6
    },
    {
      "Word": "cannibalism",
      "Strength": 6
    },
    {
      "Word": "violates",
      "Strength": 7
    },
    {
      "Word": "violate",
      "Strength": 7
    },
    {
      "Word": "violation",
      "Strength": 5
    },
    {
      "Word": "bribe",
      "Strength": 3
    },
    {
      "Word": "bribes",
      "Strength": 3
    },
    {
      "Word": "rape",
      "Strength": 10
    },
    {
      "Word": "raped",
      "Strength": 10
    },
    {
      "Word": "rapist",
      "Strength": 10
    },
    {
      "Word": "rapes",
      "Strength": 10
    },
    {
      "Word": "rapists",
      "Strength": 10
    },
    {
      "Word": "homicide",
      "Strength": 10
    },
    {
      "Word": "homicidal",
      "Strength": 10
    },
    {
      "Word": "child murder",
      "Strength": 10
    },
    {
      "Word": "suicide",
      "Strength": 10
    },
    {
      "Word": "assassination",
      "Strength": 8
    },
    {
      "Word": "mass murder",
      "Strength": 10
    },
    {
      "Word": "mass stabbing",
      "Strength": 10
    },
    {
      "Word": "mass shooting",
      "Strength": 10
    },
    {
      "Word": "murder-suicide",
      "Strength": 10
    },
    {
      "Word": "poisoned",
      "Strength": 8
    },
    {
      "Word": "poisoning",
      "Strength": 8
    },
    {
      "Word": "poison",
      "Strength": 8
    },
    {
      "Word": "lynching",
      "Strength": 10
    },
    {
      "Word": "lynch",
      "Strength": 10
    },
    {
      "Word": "lynched",
      "Strength": 10
    },
    {
      "Word": "lyncher",
      "Strength": 10
    },
    {
      "Word": "lynchers",
      "Strength": 10
    },
    {
      "Word": "lynches",
      "Strength": 10
    },
    {
      "Word": "torture",
      "Strength": 9
    },
    {
      "Word": "tortured",
      "Strength": 9
    },
    {
      "Word": "tortures",
      "Strength": 9
    },
    {
      "Word": "torturing",
      "Strength": 9
    },
    {
      "Word": "torurer",
      "Strength": 8
    },
    {
      "Word": "torurer",
      "Strength": 9
    },
    {
      "Word": "serial killer",
      "Strength": 9
    },
    {
      "Word": "abortion",
      "Strength": 8
    },
    {
      "Word": "aborted",
      "Strength": 8
    },
    {
      "Word": "abortioned",
      "Strength": 8
    },
    {
      "Word": "abortions",
      "Strength": 8
    },
    {
      "Word": "avunculicide",
      "Strength": 10
    },
    {
      "Word": "nepoticide",
      "Strength": 10
    },
    {
      "Word": "familicide",
      "Strength": 10
    },
    {
      "Word": "mariticide",
      "Strength": 10
    },
    {
      "Word": "uxoricide",
      "Strength": 10
    },
    {
      "Word": "prolicide",
      "Strength": 10
    },
    {
      "Word": "filicide",
      "Strength": 10
    },
    {
      "Word": "infanticide",
      "Strength": 10
    },
    {
      "Word": "neonaticide",
      "Strength": 10
    },
    {
      "Word": "siblicide",
      "Strength": 10
    },
    {
      "Word": "fratricide",
      "Strength": 10
    },
    {
      "Word": "sororicide",
      "Strength": 10
    },
    {
      "Word": "parricide",
      "Strength": 10
    },
    {
      "Word": "matricide",
      "Strength": 10
    },
    {
      "Word": "patricide",
      "Strength": 10
    },
    {
      "Word": "crucifixion",
      "Strength": 4
    },
    {
      "Word": "deicide",
      "Strength": 10
    },
    {
      "Word": "democide",
      "Strength": 10
    },
    {
      "Word": "friendly fire",
      "Strength": 10
    },
    {
      "Word": "friendly fired",
      "Strength": 10
    },
    {
      "Word": "gendercide",
      "Strength": 10
    },
    {
      "Word": "genocide",
      "Strength": 10
    },
    {
      "Word": "omnicide",
      "Strength": 10
    },
    {
      "Word": "regicide",
      "Strength": 10
    },
    {
      "Word": "stoning",
      "Strength": 10
    },
    {
      "Word": "stoned to death",
      "Strength": 10
    },
    {
      "Word": "tyrannicide",
      "Strength": 10
    },
    {
      "Word": "stoned",
      "Strength": 2
    },
    {
      "Word": "crucified",
      "Strength": 7
    },
    {
      "Word": "racist",
      "Strength": 8
    },
    {
      "Word": "racists",
      "Strength": 4
    },
    {
      "Word": "homophope",
      "Strength": 6
    },
    {
      "Word": "homophobic",
      "Strength": 6
    },
    {
      "Word": "transphobe",
      "Strength": 6
    },
    {
      "Word": "transphobic",
      "Strength": 6
    },
    {
      "Word": "homophobia",
      "Strength": 6
    },
    {
      "Word": "transphobia",
      "Strength": 6
    },
    {
      "Word": "manslaughter",
      "Strength": 8
    },
    {
      "Word": "war",
      "Strength": 8
    },
    {
      "Word": "wars",
      "Strength": 8
    },
    {
      "Word": "wared",
      "Strength": 8
    },
    {
      "Word": "warring",
      "Strength": 8
    },
    {
      "Word": "jail",
      "Strength": 7
    },
    {
      "Word": "prison",
      "Strength": 7
    },
    {
      "Word": "inprisoned",
      "Strength": 7
    }
  ]);

//parsting JSON to make into a string
var result = JSON.parse(jsonResult);

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
            // Will store the replaced text:
            var replacedText = text;
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
                element.classList.add('spoiler');
                element.replaceChild(document.createTextNode(replacedText),node)
            }
        }
    }
}
