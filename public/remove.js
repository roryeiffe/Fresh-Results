

//Base google is the autocomlete from initially searching through google.com
var base_google = "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf.emcav > div.UUbT9"
//while search is the autocomplete that shows up after you have searched one
//thing on google.com, and change your query
var while_search_google =  "#tsf > div:nth-child(1) > div.A8SBwf.emcav > div.UUbT9"

//every 50 milliseconds check if base_google exists and remove it
window.setInterval(function(){
  document.querySelector(base_google).remove()
}, 50);

//every 50 milliseconds check if while_search_google exists and remove it
window.setInterval(function(){
  document.querySelector(while_search_google).remove()
}, 50);
