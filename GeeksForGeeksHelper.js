// ==UserScript==
// @name         GeeksForGeeks
// @namespace    http://your.homepage/
// @version      0.1
// @include      http://www.geeksforgeeks.org/*
// @description  Mark questions done or not done on geeksforgeeks.org
// @author       Shivendra Panicker
// @match        http://wiki.greasespot.net/GM_setValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// when the user reached the correct url then add the done button at the top of the page
// if the user says that it is done save it as it is to done.
// if the user says that it is not done then save it as not done.


var DONE_COLOR = 'green';
var NOT_DONE_COLOR = 'orange';
var URL = window.location.href;

var saveState= function(status){
  GM_setValue(URL, status); 
}

var getURLState = function(url){
    if(GM_getValue(url) === undefined)
        return false;
    return GM_getValue(url);
}

var getState = function(){
 return GM_getValue(URL);
}

var toggleState = function(){
    var button = document.getElementById('shiv_button');   
    if (button.style.backgroundColor == DONE_COLOR){
        button.innerText = 'NOT DONE';
        button.style.backgroundColor = NOT_DONE_COLOR;
        saveState(false);
    }
    else{
        button.innerText = 'DONE';
        button.style.backgroundColor = DONE_COLOR;
        saveState(true);
    }
}

var setPageElement= function() {
    var state =  getState();
    var container = document.createElement('button');
    container.onclick = toggleState;
    container.id = 'shiv_button';

    if (state === true){
        container.innerText = 'DONE';
        container.style.backgroundColor = DONE_COLOR;
    }
    else{
        container.innerText = 'NOT DONE';
        container.style.backgroundColor = NOT_DONE_COLOR;
    }
    var head = document.getElementById('masthead');   
    var doc = document.getElementById('page');
    doc.insertBefore(container, head);
}

if (getState() === undefined ){
    saveState(false);
    setPageElement();
}
else {
    setPageElement();
}

var elements = document.getElementsByClassName('entry-title');
if (elements!=null && elements.length > 0 ){
    
    for(var index =0 ; index<elements.length ; ++ index) 
    { 
        var element = elements[index];
        var x = document.createElement("INPUT");
        x.checked = getURLState(element.childNodes[1].href);
        if(x.checked === true ){
            $( element ).wrap( "<del> </del>" );
        }
        console.log(element.childNodes[1]);
        x.setAttribute("type", "checkbox"); 
        x.setAttribute("onclick", "return false"); 
       
        element.appendChild(x); 
    }
}