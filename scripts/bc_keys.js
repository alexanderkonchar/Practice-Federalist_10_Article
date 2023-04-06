"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Review Assignment

   Author: Alex Konchar
   Date: 2023-04-06

   Filename: bc_keys.js

   Functions
   =========
   
   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.
      
   makeKeyStyles()
      Create an embedded style sheet for the keyword box.

      
   replaceWS(textStr)
      Replaces occurrences of one or more consecutive white space
      characters with the _ character.

*/

const doc = document.getElementById("doc");

// Load the keyword list and its styles when the page loads
window.addEventListener('load', findKeyWords(), makeKeyStyles());

function findKeyWords() {
    // Create an aside element with the id keywords
    const aside = document.createElement("aside");
    aside.setAttribute("id", "keywords");

    // Create a heading with the text Keyword List
    const heading = document.createElement("h1");
    const text = document.createTextNode("Keyword List");
    heading.appendChild(text);
    // Place the heading in the aside element
    aside.appendChild(heading);

    // Create an empty unordered list
    const ol = document.createElement("ol");
    aside.appendChild(ol);

    // Get all the keywords and put them in an array called keyWords
    const keyWordElems = document.querySelectorAll("dfn");
    let keyWords = new Array(keyWordElems.length);

    keyWordElems.forEach((element) => {
        // Push the text of each keyword element into the keyWords array
        keyWords.push(element.textContent);

        // Set the id of each element to keyword_linkID
        const linkID = replaceWS(element.textContent);
        element.setAttribute("id", `keyword_${linkID}`);
    })

    // Sort the keyWords array in alphabetical order
    keyWords.sort();

    // Wrap each keyword in a link and list element
    keyWords.forEach((keyWord) => {
        const keyWordListItem = document.createElement("li");
        const keyWordLink = document.createElement("a");

        keyWordLink.innerHTML = keyWord;

        const linkID = replaceWS(keyWord);
        keyWordLink.setAttribute("href", `#keyword_${linkID}`)

        keyWordListItem.appendChild(keyWordLink);
        // Append each list element to the unordered list
        ol.appendChild(keyWordListItem);
    })

    // Append the aside as the first child in the article
    doc.insertBefore(aside, doc.firstChild);
}

function makeKeyStyles() {
    // Create a new stylesheet and append it to the head of the webpage
    const styles = document.createElement("style");
    document.head.appendChild(styles);

    // Add the style rules to the embedded stylesheet
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        `aside#keywords {
            border: 3px solid rgb(101, 101, 101);
            float: right;
            margin: 20px 0 20px 20px;
            padding: 10px;
            width: 320px:
        }`, 0
    );

    document.styleSheets[document.styleSheets.length - 1].insertRule(
        `aside#keywords h1 {
            font-size: 2em;
            margin: 5px;
            text-align: center;
        }`, 1
    );

    document.styleSheets[document.styleSheets.length - 1].insertRule(
        `aside#keywords ol {
            margin-left: 20px;
            font-size: 1.2em;
        }`, 2
    );

    document.styleSheets[document.styleSheets.length - 1].insertRule(
        `aside#keywords ol li {
            line-height: 1.5em;      
        }`, 3
    );

    document.styleSheets[document.styleSheets.length - 1].insertRule(
        `aside#keywords ol li a {
            color: rgb(101, 101, 101);
            text-decoration: none;
        }`, 4
    );
}

/* Supplied Functions */

function replaceWS(textStr) {
    return textStr.replace(/\s+/g, "_");
}
