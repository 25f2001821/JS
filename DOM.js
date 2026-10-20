/*
===============================================================================
JAVASCRIPT DOM — COMPLETE REVISION FILE
Based on JS6 ClassNotes.pdf + important additional concepts
===============================================================================

HOW TO USE THIS FILE
--------------------
1. Save this file as: dom.js
2. Create an index.html file and include:
      <script src="dom.js" defer></script>
3. Add the HTML elements shown in each section before testing that section.
4. Open index.html in a browser. Use F12 -> Console to inspect output.

IMPORTANT
---------
- DOM means Document Object Model: the browser's object-based representation
  of an HTML page.
- DOM APIs such as document.getElementById() require a browser. They do not
  normally work when you run this file directly with Node.js.
- Most examples below are commented out or guarded so that missing HTML
  elements do not crash the whole file. Uncomment the section you are studying.

THE 3 MUSKETEERS OF WEB DEVELOPMENT
-----------------------------------
HTML = structure
CSS  = styling
JS   = logic and interaction
===============================================================================
*/


// ============================================================================
// 1. WINDOW OBJECT AND DOCUMENT OBJECT
// ============================================================================

/*
window represents the browser window/tab and provides browser-related
properties and methods. In a browser, it is the global object.

document represents the currently loaded HTML document and is available
through window.document.

Examples:
*/

console.log("Browser window:", window);
console.log("HTML document:", document);
console.log("Page title:", document.title);
console.log("Current URL:", window.location.href);

// window.alert("Hello!"); // Opens a browser alert. Uncomment to test.
// console.log(window.innerWidth);  // Browser viewport width
// console.log(window.innerHeight); // Browser viewport height


// ============================================================================
// 2. WHAT IS THE DOM?
// ============================================================================

/*
When a web page loads, the browser parses its HTML and creates a DOM tree.

A simplified tree:

window
└── document
    └── html
        ├── head
        │   ├── meta
        │   └── title
        └── body
            ├── h1
            ├── p
            └── button

JavaScript can select nodes in this tree, read their content, change their
styles/attributes, create new elements, remove elements, and respond to events.
*/


// ============================================================================
// 3. SELECTING ELEMENTS
// ============================================================================

/*
Suppose the HTML contains:

<h1 id="title">Hello JavaScript</h1>
<p class="message">First paragraph</p>
<p class="message">Second paragraph</p>
<button id="myButton">Click me</button>
*/

// A) Select by ID: returns one element or null.
const titleById = document.getElementById("title");
console.log("Selected by ID:", titleById);

// B) Select by class: returns a live HTMLCollection.
const messagesByClass = document.getElementsByClassName("message");
console.log("Selected by class:", messagesByClass);

// C) Select by tag name: returns a live HTMLCollection.
const paragraphsByTag = document.getElementsByTagName("p");
console.log("Selected by tag:", paragraphsByTag);

// D) querySelector: returns the FIRST matching element or null.
const titleByQuery = document.querySelector("#title");
const firstMessage = document.querySelector(".message");
const firstParagraph = document.querySelector("p");

// E) querySelectorAll: returns a static NodeList of all matching elements.
const allMessages = document.querySelectorAll(".message");
console.log("All matching messages:", allMessages);

/*
CSS selector reminders:
"#title"    -> element with id="title"
".message"  -> elements with class="message"
"p"         -> paragraph elements
"div.box"   -> div elements with class="box"
"input[type='text']" -> text input elements

Key difference:
- querySelector() returns the first match.
- querySelectorAll() returns all matches in a NodeList.
- getElementsByClassName() / getElementsByTagName() return live collections.
- getElementById() takes the ID WITHOUT the # symbol.
*/


// ============================================================================
// 4. LOOPING THROUGH SELECTED ELEMENTS
// ============================================================================

// If the page contains several elements with class="message":
allMessages.forEach((element, index) => {
    console.log(`Message ${index + 1}:`, element.textContent);
});

// Example: style all elements matching .message
// document.querySelectorAll(".message").forEach((element) => {
//     element.style.color = "blue";
// });


// ============================================================================
// 5. READING AND CHANGING CONTENT
// ============================================================================

/*
HTML:
<div id="demo">
    Hello <strong>JavaScript</strong>
</div>

- innerText: rendered, human-readable text; affected by CSS visibility/layout.
- textContent: text from the node and its descendants, including hidden text.
- innerHTML: HTML markup inside the element; can read or parse markup.
- tagName: uppercase tag name for an HTML element, e.g. "DIV".
*/

const demo = document.getElementById("demo");

if (demo) {
    console.log("tagName:", demo.tagName);
    console.log("innerText:", demo.innerText);
    console.log("textContent:", demo.textContent);
    console.log("innerHTML:", demo.innerHTML);

    // Change all content to plain text:
    // demo.textContent = "New text";

    // Parse the supplied string as HTML:
    // demo.innerHTML = "<strong>Bold text</strong>";
}

/*
SECURITY RULE:
Prefer textContent for ordinary text, especially text supplied by users.
Putting untrusted content into innerHTML can create cross-site scripting
(XSS) vulnerabilities.

innerText, textContent and innerHTML are not interchangeable:
- textContent -> text
- innerText   -> rendered text
- innerHTML   -> markup inside the element
*/


// ============================================================================
// 6. PDF PRACTICE: CREATE AN H2 AND APPEND TEXT
// ============================================================================

/*
Task from the PDF:
Create an h2 heading with text "Hello JavaScript".
Append " from Apna College students" using JavaScript.

HTML:
<div id="practiceArea"></div>

Solution:
*/

const practiceArea = document.getElementById("practiceArea");

if (practiceArea) {
    const h2 = document.createElement("h2");
    h2.textContent = "Hello JavaScript";
    h2.textContent += " from Apna College students";
    practiceArea.append(h2);
}

/*
The same result could be written as:
h2.textContent = "Hello JavaScript from Apna College students";

The += example demonstrates appending to the existing text.
*/


// ============================================================================
// 7. PDF PRACTICE: THREE DIVS WITH THE SAME CLASS, UNIQUE TEXT
// ============================================================================

/*
Task from the PDF:
Create/access three divs with common class "box" and give each unique text.

HTML option:
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
*/

const boxes = document.querySelectorAll(".box");
const boxTexts = ["First box", "Second box", "Third box"];

boxes.forEach((box, index) => {
    if (boxTexts[index] !== undefined) {
        box.textContent = boxTexts[index];
    }
});

// To create three boxes from JavaScript instead, use this pattern:
// const boxContainer = document.getElementById("boxContainer");
// if (boxContainer) {
//     ["First box", "Second box", "Third box"].forEach((text) => {
//         const box = document.createElement("div");
//         box.classList.add("box");
//         box.textContent = text;
//         boxContainer.append(box);
//     });
// }


// ============================================================================
// 8. ATTRIBUTES: getAttribute(), setAttribute(), hasAttribute()
// ============================================================================

/*
HTML:
<a id="myLink" href="https://example.com">Visit site</a>
<img id="profileImage" src="old.jpg" alt="Profile image">
*/

const myLink = document.getElementById("myLink");

if (myLink) {
    // Read an attribute:
    console.log("href:", myLink.getAttribute("href"));

    // Set/change an attribute:
    // myLink.setAttribute("href", "https://developer.mozilla.org/");

    // Check whether an attribute exists:
    console.log("Has href?", myLink.hasAttribute("href"));

    // Remove an attribute:
    // myLink.removeAttribute("target");
}

const profileImage = document.getElementById("profileImage");

if (profileImage) {
    // profileImage.setAttribute("src", "new-image.jpg");
    // profileImage.setAttribute("alt", "Updated profile image");
}

/*
Some common attributes:
href, src, alt, id, class, title, type, value, disabled

For many form controls, properties such as input.value and input.checked are
convenient for reading the current state. getAttribute("value") may reflect
the original HTML attribute rather than the current typed value.
*/


// ============================================================================
// 9. INLINE STYLING WITH element.style
// ============================================================================

/*
HTML:
<p id="styledParagraph">Style me</p>
*/

const styledParagraph = document.getElementById("styledParagraph");

if (styledParagraph) {
    // Uncomment to test:
    // styledParagraph.style.color = "white";
    // styledParagraph.style.backgroundColor = "crimson";
    // styledParagraph.style.fontSize = "20px";
    // styledParagraph.style.padding = "10px";
    // styledParagraph.style.borderRadius = "8px";
}

/*
CSS uses kebab-case:
    background-color
JavaScript style properties use camelCase:
    backgroundColor

element.style primarily reads/writes inline styles. For larger designs,
prefer CSS classes rather than setting many inline styles.
*/


// ============================================================================
// 10. className VS classList
// ============================================================================

/*
HTML:
<p id="classDemo" class="paragraph">Class practice</p>

CSS:
.highlight {
    color: blue;
    background-color: lightyellow;
}
.large-text {
    font-size: 24px;
}
*/

const classDemo = document.getElementById("classDemo");

if (classDemo) {
    // This REPLACES the entire class attribute:
    // classDemo.className = "highlight";

    // classList lets you add/remove classes without replacing other classes:
    // classDemo.classList.add("highlight");
    // classDemo.classList.add("large-text");
    // classDemo.classList.remove("highlight");
    // classDemo.classList.toggle("highlight");
    // console.log(classDemo.classList.contains("large-text"));
}

/*
PDF practice: avoid overwriting the old class.
Use classList.add("new-class") to add a class while preserving existing ones.
*/


// ============================================================================
// 11. CREATING, INSERTING AND REMOVING ELEMENTS
// ============================================================================

/*
The PDF introduces:
document.createElement("div")
node.append(element)   -> inside, at the end
node.prepend(element)  -> inside, at the start
node.before(element)   -> outside, before node
node.after(element)    -> outside, after node
node.remove()          -> remove node

HTML:
<div id="insertTarget"><p id="existingChild">Existing child</p></div>
*/

const insertTarget = document.getElementById("insertTarget");

if (insertTarget) {
    const newDiv = document.createElement("div");
    newDiv.textContent = "I was created with JavaScript";

    // Uncomment ONE insertion method at a time to see the difference:
    // insertTarget.append(newDiv);
    // insertTarget.prepend(newDiv);

    // To insert relative to the target element:
    // insertTarget.before(newDiv);
    // insertTarget.after(newDiv);

    // To remove an element:
    // newDiv.remove();
}

/*
append() accepts text and multiple nodes:
container.append("Hello ", anotherElement)

appendChild() also works, but accepts a Node and returns the appended node:
container.appendChild(anotherElement)
*/


// ============================================================================
// 12. PDF PRACTICE: CREATE A RED BUTTON AND INSERT IT FIRST IN BODY
// ============================================================================

/*
Task from the PDF:
Create a button, text "click me", red background, white text.
Insert it as the first element inside body.
*/

const pdfButton = document.createElement("button");
pdfButton.textContent = "click me";
pdfButton.style.backgroundColor = "red";
pdfButton.style.color = "white";
pdfButton.style.padding = "8px 14px";
pdfButton.style.border = "none";
pdfButton.style.cursor = "pointer";

// Uncomment to add it at the beginning of body:
// document.body.prepend(pdfButton);


// ============================================================================
// 13. EVENTS: addEventListener()
// ============================================================================

/*
HTML:
<h1 id="eventHeading">Original heading</h1>
<button id="changeHeadingButton">Change heading</button>
*/

const eventHeading = document.getElementById("eventHeading");
const changeHeadingButton = document.getElementById("changeHeadingButton");

if (eventHeading && changeHeadingButton) {
    changeHeadingButton.addEventListener("click", function () {
        eventHeading.textContent = "I am learning DOM!";
    });
}

/*
Common events:
click       -> click an element
input       -> input value changes
change      -> a value/selection is committed
submit      -> form submitted
mouseover   -> pointer enters element
mouseout    -> pointer leaves element
keydown     -> key pressed
keyup       -> key released

Pattern:
element.addEventListener("eventName", callbackFunction);
*/


// ============================================================================
// 14. INPUT FIELDS AND THE input EVENT
// ============================================================================

/*
HTML:
<input id="nameInput" type="text" placeholder="Enter your name">
<p id="liveGreeting"></p>
*/

const nameInput = document.getElementById("nameInput");
const liveGreeting = document.getElementById("liveGreeting");

if (nameInput && liveGreeting) {
    nameInput.addEventListener("input", function () {
        const name = nameInput.value.trim();

        liveGreeting.textContent = name
            ? `Hello, ${name}!`
            : "Your greeting will appear here.";
    });
}

/*
input.value -> the current value entered by the user.
trim()      -> removes whitespace at the beginning and end.
*/


// ============================================================================
// 15. FORMS AND preventDefault()
// ============================================================================

/*
HTML:
<form id="signupForm">
    <input id="signupEmail" type="email" required>
    <button type="submit">Submit</button>
</form>
<p id="signupMessage"></p>
*/

const signupForm = document.getElementById("signupForm");
const signupEmail = document.getElementById("signupEmail");
const signupMessage = document.getElementById("signupMessage");

if (signupForm && signupEmail && signupMessage) {
    signupForm.addEventListener("submit", function (event) {
        // Stop the browser's default form submission/navigation:
        event.preventDefault();

        signupMessage.textContent = `Form captured for: ${signupEmail.value}`;
    });
}

/*
event.preventDefault() prevents a default browser action.
It does not automatically validate, save, or send data to a server.
The browser still applies built-in form validation for required/email fields.
*/


// ============================================================================
// 16. CHECKBOXES
// ============================================================================

/*
HTML:
<label><input id="termsCheckbox" type="checkbox"> I agree</label>
<button id="checkTermsButton">Check</button>
<p id="termsMessage"></p>
*/

const termsCheckbox = document.getElementById("termsCheckbox");
const checkTermsButton = document.getElementById("checkTermsButton");
const termsMessage = document.getElementById("termsMessage");

if (termsCheckbox && checkTermsButton && termsMessage) {
    checkTermsButton.addEventListener("click", function () {
        if (termsCheckbox.checked) {
            termsMessage.textContent = "You agreed.";
        } else {
            termsMessage.textContent = "Please tick the checkbox.";
        }
    });
}


// ============================================================================
// 17. KEYBOARD EVENTS
// ============================================================================

/*
HTML:
<input id="keyboardInput" type="text" placeholder="Press a key">
<p id="keyMessage"></p>
*/

const keyboardInput = document.getElementById("keyboardInput");
const keyMessage = document.getElementById("keyMessage");

if (keyboardInput && keyMessage) {
    keyboardInput.addEventListener("keydown", function (event) {
        keyMessage.textContent = `Key pressed: ${event.key}`;
    });
}


// ============================================================================
// 18. DOM TRAVERSAL: PARENT, CHILDREN AND SIBLINGS
// ============================================================================

/*
HTML:
<div id="parent">
    <p id="firstChild">First</p>
    <p id="secondChild">Second</p>
    <p id="thirdChild">Third</p>
</div>
*/

const firstChild = document.getElementById("firstChild");

if (firstChild) {
    console.log("Parent:", firstChild.parentElement);
    console.log("Next sibling:", firstChild.nextElementSibling);
    console.log("Previous sibling:", firstChild.previousElementSibling);

    const parent = firstChild.parentElement;
    if (parent) {
        console.log("Child elements:", parent.children);
        console.log("First element child:", parent.firstElementChild);
        console.log("Last element child:", parent.lastElementChild);
    }
}

/*
Useful traversal properties:
parentElement
children
firstElementChild
lastElementChild
nextElementSibling
previousElementSibling
*/


// ============================================================================
// 19. EVENT OBJECT AND TARGET
// ============================================================================

/*
The browser passes an event object to an event callback.
It contains details about the event.

HTML:
<button class="colorButton">Red</button>
<button class="colorButton">Blue</button>
<p id="colorOutput"></p>
*/

const colorButtons = document.querySelectorAll(".colorButton");
const colorOutput = document.getElementById("colorOutput");

colorButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        console.log("Clicked element:", event.target);

        if (colorOutput) {
            colorOutput.textContent = `You clicked: ${event.target.textContent}`;
        }
    });
});

/*
event.target        -> the element where the event originated
event.currentTarget -> the element whose listener is currently running
*/


// ============================================================================
// 20. MINI PROJECT: COUNTER
// ============================================================================

/*
HTML:
<h2 id="countDisplay">0</h2>
<button id="decreaseCount">-</button>
<button id="resetCount">Reset</button>
<button id="increaseCount">+</button>
*/

const countDisplay = document.getElementById("countDisplay");
const decreaseCount = document.getElementById("decreaseCount");
const resetCount = document.getElementById("resetCount");
const increaseCount = document.getElementById("increaseCount");

if (countDisplay && decreaseCount && resetCount && increaseCount) {
    let count = 0;

    increaseCount.addEventListener("click", function () {
        count++;
        countDisplay.textContent = count;
    });

    decreaseCount.addEventListener("click", function () {
        count--;
        countDisplay.textContent = count;
    });

    resetCount.addEventListener("click", function () {
        count = 0;
        countDisplay.textContent = count;
    });
}


// ============================================================================
// 21. MINI PROJECT: TO-DO LIST
// ============================================================================

/*
HTML:
<input id="taskInput" type="text" placeholder="Enter a task">
<button id="addTaskButton">Add task</button>
<ul id="taskList"></ul>

This example uses textContent for user-entered text rather than innerHTML.
*/

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

if (taskInput && addTaskButton && taskList) {
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            taskInput.focus();
            return;
        }

        const listItem = document.createElement("li");
        const taskLabel = document.createElement("span");
        const deleteButton = document.createElement("button");

        taskLabel.textContent = taskText;
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            listItem.remove();
        });

        listItem.append(taskLabel, " ", deleteButton);
        taskList.append(listItem);

        taskInput.value = "";
        taskInput.focus();
    }

    addTaskButton.addEventListener("click", addTask);

    // Let the user add a task by pressing Enter:
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
}


// ============================================================================
// 22. EXTRA CONCEPT: EVENT DELEGATION
// ============================================================================

/*
Event delegation uses one listener on a parent to handle events from its
children. It is useful when children are created dynamically.

Example HTML:
<ul id="delegatedList">
    <li><button class="removeItem">Remove</button></li>
</ul>
*/

const delegatedList = document.getElementById("delegatedList");

if (delegatedList) {
    delegatedList.addEventListener("click", function (event) {
        // event.target may be the clicked button or an element inside it.
        const removeButton = event.target.closest(".removeItem");

        if (removeButton && delegatedList.contains(removeButton)) {
            const item = removeButton.closest("li");
            if (item) {
                item.remove();
            }
        }
    });
}


// ============================================================================
// 23. EXTRA CONCEPT: DOM READY AND SCRIPT LOADING
// ============================================================================

/*
Recommended HTML:
<script src="dom.js" defer></script>

defer makes the browser execute the external script after the HTML has been
parsed, while preserving script order.

Alternative:
document.addEventListener("DOMContentLoaded", function () {
    // Code that needs the parsed HTML goes here.
});

If a script runs before an element exists in the DOM, a selector may return
null. The null checks in this file prevent many common errors.
*/


// ============================================================================
// 24. COMMON MISTAKES
// ============================================================================

/*
WRONG:
document.getElementById("#title");

RIGHT:
document.getElementById("title");

WRONG:
document.querySelector("title"); // This selects the <title> tag, not id=title.

RIGHT:
document.querySelector("#title");

WRONG:
title.textContent = "<b>Hello</b>"; // This displays the angle brackets as text.

RIGHT, if you want plain text:
title.textContent = "Hello";

WRONG:
element.className = "newClass"; // If there was an old class, it gets replaced.

RIGHT, if you want to keep old classes:
element.classList.add("newClass");

WRONG:
const button = document.getElementById("missing");
button.addEventListener("click", ...); // Error if button is null.

RIGHT:
const button = document.getElementById("missing");
if (button) {
    button.addEventListener("click", ...);
}

REMEMBER:
- A selector can return null if no element matches.
- Use .value for the current value of an input.
- Use .checked for a checkbox/radio's current checked state.
- Use addEventListener() for event handling.
- Use createElement() to create an element.
- Use append()/prepend() to insert inside a parent.
- Use before()/after() to insert outside an element.
- Use remove() to remove an element.
*/


// ============================================================================
// 25. QUICK REVISION CHECKLIST
// ============================================================================

/*
[ ] I can explain the DOM tree.
[ ] I know the difference between window and document.
[ ] I can select elements by ID, class, tag and CSS selector.
[ ] I understand querySelector() vs querySelectorAll().
[ ] I know innerText vs textContent vs innerHTML.
[ ] I can read and set attributes.
[ ] I can change inline styles and use classList.
[ ] I can create, append, prepend, insert and remove elements.
[ ] I can attach click, input, submit and keyboard event listeners.
[ ] I can read input.value and checkbox.checked.
[ ] I can use event.preventDefault().
[ ] I can build a counter and a basic to-do list.
[ ] I know why textContent is safer for user-provided text.
*/

// END OF DOM REVISION FILE