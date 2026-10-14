
/*
============================================================
JAVASCRIPT DOM — COMPLETE REVISION NOTES
============================================================

DOM = Document Object Model

The browser represents HTML as objects that JavaScript can
access and manipulate.

HTML  -> Structure
CSS   -> Styling
JS    -> Behavior and interaction

Prerequisite:
Link this file to HTML using:

<script src="dom_revision.js" defer></script>

Open the HTML file in a browser and inspect the Console.
*/


// ============================================================
// 1. SELECTING HTML ELEMENTS
// ============================================================

// HTML examples:
// <h1 id="title">Hello World</h1>
// <p class="message">First paragraph</p>
// <p class="message">Second paragraph</p>
// <button id="btn">Click Me</button>

const title = document.getElementById("title");

console.log(title);

// Select the first matching CSS selector
const heading = document.querySelector("#title");
const firstMessage = document.querySelector(".message");
const button = document.querySelector("#btn");

// Select all matching elements
const messages = document.querySelectorAll(".message");

console.log(heading);
console.log(firstMessage);
console.log(button);
console.log(messages);

// CSS selector reminders:
// "#title"    -> ID
// ".message" -> Class
// "p"         -> HTML tag


// ============================================================
// 2. READING AND CHANGING TEXT
// ============================================================

// HTML:
// <h1 id="title">Hello World</h1>

if (title) {
    // Read text
    console.log(title.textContent);

    // Change text
    // Uncomment to test:
    // title.textContent = "Hello JavaScript!";
}


// ============================================================
// 3. textContent vs innerHTML
// ============================================================

/*
textContent treats the content as text.
innerHTML interprets strings as HTML.

Prefer textContent for ordinary text and untrusted input.
Using untrusted data with innerHTML can cause XSS.
*/

if (title) {
    // Safe text insertion:
    // title.textContent = "<b>Hello</b>";

    // HTML interpretation:
    // title.innerHTML = "<b>Hello</b>";
}


// ============================================================
// 4. CHANGING CSS
// ============================================================

// HTML:
// <h1 id="title">Hello</h1>

if (title) {
    // Uncomment to test:
    // title.style.color = "blue";
    // title.style.backgroundColor = "lightyellow";
    // title.style.fontSize = "40px";
    // title.style.textAlign = "center";
}


// ============================================================
// 5. classList
// ============================================================

// CSS:
// .highlight {
//     color: blue;
//     background-color: lightyellow;
// }

// HTML:
// <h1 id="title">Hello</h1>

if (title) {
    // title.classList.add("highlight");
    // title.classList.remove("highlight");
    // title.classList.toggle("highlight");

    console.log(title.classList.contains("highlight"));
}


// ============================================================
// 6. CLICK EVENTS
// ============================================================

// HTML:
// <h1 id="title">Hello World</h1>
// <button id="btn">Change Text</button>

if (title && button) {
    button.addEventListener("click", function () {
        title.textContent = "You clicked the button!";
    });
}

/*
addEventListener(event, callback)

"click" -> runs the callback when the element is clicked.

The callback function runs later, when the event happens.
*/


// ============================================================
// 7. ARROW FUNCTION EVENT HANDLER
// ============================================================

// const btn = document.getElementById("btn");

// if (btn) {
//     btn.addEventListener("click", () => {
//         console.log("Button clicked!");
//     });
// }


// ============================================================
// 8. MOUSE EVENTS
// ============================================================

// HTML:
// <p id="message">Move your mouse over me.</p>

const message = document.getElementById("message");

if (message) {
    message.addEventListener("mouseover", function () {
        message.style.color = "red";
    });

    message.addEventListener("mouseout", function () {
        message.style.color = "black";
    });
}


// ============================================================
// 9. INPUT FIELDS
// ============================================================

// HTML:
// <input id="username" type="text">
// <button id="greetBtn">Greet</button>
// <p id="output"></p>

const usernameInput = document.getElementById("username");
const greetBtn = document.getElementById("greetBtn");
const output = document.getElementById("output");

if (usernameInput && greetBtn && output) {
    greetBtn.addEventListener("click", function () {
        const username = usernameInput.value;

        output.textContent = `Hello, ${username}!`;
    });
}

/*
input.value -> gets the value entered by the user.

textContent -> displays text inside an element.
*/


// ============================================================
// 10. THE input EVENT
// ============================================================

// HTML:
// <input id="liveInput" type="text">
// <p id="liveOutput"></p>

const liveInput = document.getElementById("liveInput");
const liveOutput = document.getElementById("liveOutput");

if (liveInput && liveOutput) {
    liveInput.addEventListener("input", function () {
        liveOutput.textContent = liveInput.value;
    });
}

/*
"input" fires whenever the input value changes.
Useful for live search, previews and validation.
*/


// ============================================================
// 11. FORM SUBMISSION
// ============================================================

// HTML:
// <form id="myForm">
//     <input id="email" type="email" required>
//     <button type="submit">Submit</button>
// </form>
// <p id="formOutput"></p>

const myForm = document.getElementById("myForm");
const emailInput = document.getElementById("email");
const formOutput = document.getElementById("formOutput");

if (myForm && emailInput && formOutput) {
    myForm.addEventListener("submit", function (event) {
        // Prevent browser's default form submission
        event.preventDefault();

        formOutput.textContent = `Submitted: ${emailInput.value}`;
    });
}

/*
event.preventDefault() stops the default browser behavior.
For a form, that normally includes navigation/submission.
*/


// ============================================================
// 12. CHECKBOX
// ============================================================

// HTML:
// <input id="agree" type="checkbox">
// <button id="checkBtn">Check</button>
// <p id="checkOutput"></p>

const agree = document.getElementById("agree");
const checkBtn = document.getElementById("checkBtn");
const checkOutput = document.getElementById("checkOutput");

if (agree && checkBtn && checkOutput) {
    checkBtn.addEventListener("click", function () {
        if (agree.checked) {
            checkOutput.textContent = "Checkbox selected";
        } else {
            checkOutput.textContent = "Checkbox not selected";
        }
    });
}


// ============================================================
// 13. CREATING HTML ELEMENTS
// ============================================================

// HTML:
// <ul id="list"></ul>
// <button id="addItem">Add Item</button>

const list = document.getElementById("list");
const addItemBtn = document.getElementById("addItem");

if (list && addItemBtn) {
    addItemBtn.addEventListener("click", function () {
        // Create a new element
        const li = document.createElement("li");

        // Set its text
        li.textContent = "New list item";

        // Add it to the page
        list.appendChild(li);
    });
}

/*
createElement() -> creates an element.
appendChild()   -> adds it to another element.
*/


// ============================================================
// 14. APPENDING AND REMOVING ELEMENTS
// ============================================================

// HTML:
// <div id="container"></div>

const container = document.getElementById("container");

if (container) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Created with JavaScript";

    // Add child
    container.appendChild(paragraph);

    // Remove child
    // paragraph.remove();
}


// ============================================================
// 15. LOOPING THROUGH DOM ELEMENTS
// ============================================================

// HTML:
// <p class="item">Apple</p>
// <p class="item">Banana</p>
// <p class="item">Mango</p>

const items = document.querySelectorAll(".item");

items.forEach(function (item) {
    console.log(item.textContent);
});

// Change all selected items
// items.forEach(item => {
//     item.style.color = "green";
// });


// ============================================================
// 16. DOM TRAVERSAL
// ============================================================

// HTML:
// <div id="parent">
//     <p id="child">Hello</p>
// </div>

const child = document.getElementById("child");

if (child) {
    console.log(child.parentElement);

    // console.log(child.parentElement.children);
    // console.log(child.nextElementSibling);
    // console.log(child.previousElementSibling);
}

/*
parentElement       -> parent element
children            -> child elements
nextElementSibling  -> next sibling element
previousElementSibling -> previous sibling element
*/


// ============================================================
// 17. ATTRIBUTES
// ============================================================

// HTML:
// <a id="link" href="https://example.com">Visit</a>

const link = document.getElementById("link");

if (link) {
    console.log(link.getAttribute("href"));

    // Change an attribute:
    // link.setAttribute("href", "https://example.org");

    // Check an attribute:
    console.log(link.hasAttribute("href"));

    // Remove an attribute:
    // link.removeAttribute("target");
}


// ============================================================
// 18. DOM CONTENT LOADED
// ============================================================

// If your script uses a normal script tag without defer,
// wait for the HTML to be parsed before selecting elements.

/*
document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("title");
    console.log(title);
});

With <script src="dom_revision.js" defer></script>,
you normally do not need this wrapper for initial selection.
*/


// ============================================================
// 19. MINI PROJECT — COUNTER
// ============================================================

// HTML needed:
// <h2 id="count">0</h2>
// <button id="decrease">-</button>
// <button id="reset">Reset</button>
// <button id="increase">+</button>

const countDisplay = document.getElementById("count");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");
const increaseBtn = document.getElementById("increase");

if (countDisplay && decreaseBtn && resetBtn && increaseBtn) {
    let count = 0;

    increaseBtn.addEventListener("click", function () {
        count++;
        countDisplay.textContent = count;
    });

    decreaseBtn.addEventListener("click", function () {
        count--;
        countDisplay.textContent = count;
    });

    resetBtn.addEventListener("click", function () {
        count = 0;
        countDisplay.textContent = count;
    });
}


// ============================================================
// 20. MINI PROJECT — TO-DO LIST
// ============================================================

// HTML needed:
// <input id="taskInput" type="text">
// <button id="addTask">Add Task</button>
// <ul id="taskList"></ul>

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

if (taskInput && addTaskBtn && taskList) {
    addTaskBtn.addEventListener("click", function () {
        const task = taskInput.value.trim();

        // Do not add empty tasks
        if (task === "") {
            return;
        }

        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");

        // Use textContent for user-provided text
        li.textContent = task + " ";

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
    });
}

/*
This project combines:
- Selecting elements
- Reading input values
- Click events
- Conditions
- Creating elements
- Adding and removing elements
- Functions and methods
*/


// ============================================================
// 21. COMMON DOM METHODS AND PROPERTIES
// ============================================================

/*
SELECTING
document.getElementById()
document.querySelector()
document.querySelectorAll()

READING / CHANGING CONTENT
element.textContent
element.innerHTML
input.value

STYLING
element.style
element.classList.add()
element.classList.remove()
element.classList.toggle()
element.classList.contains()

EVENTS
element.addEventListener()

CREATING / ADDING / REMOVING
document.createElement()
element.appendChild()
element.append()
element.remove()

ATTRIBUTES
element.getAttribute()
element.setAttribute()
element.hasAttribute()
element.removeAttribute()

TRAVERSAL
element.parentElement
element.children
element.nextElementSibling
element.previousElementSibling
*/


// ============================================================
// 22. IMPORTANT DIFFERENCES
// ============================================================

/*
HTML:
<h1 id="title">Hello</h1>

JavaScript:
document.getElementById("title")

Remember:

1. getElementById("title") uses the ID without #.
2. querySelector("#title") uses the CSS selector #.
3. querySelector() returns the first matching element.
4. querySelectorAll() returns all matching elements.
5. input.value reads an input field's value.
6. textContent reads or changes an element's text.
7. addEventListener() attaches event behavior.
8. Use const for element references that won't be reassigned.
9. DOM code needs a browser environment.
10. Use textContent rather than innerHTML for untrusted text.
*/


// ============================================================
// END OF DOM REVISION
// ============================================================
