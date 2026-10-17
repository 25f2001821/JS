
/*
========================================
JAVASCRIPT EVENTS — COMPLETE REVISION
========================================

An event is an action in the browser, such as:
clicking, typing, submitting a form, or loading a page.
*/

// ========================================
// 1. addEventListener()
// ========================================

// HTML: <button id="btn">Click Me</button>

const btn = document.getElementById("btn");

if (btn) {
    btn.addEventListener("click", function () {
        console.log("Button clicked!");
    });

    // Arrow function
    btn.addEventListener("dblclick", () => {
        console.log("Double clicked!");
    });
}

// Syntax:
// element.addEventListener("eventName", function);


// ========================================
// 2. COMMON EVENTS
// ========================================

/*
Mouse:
click, dblclick, mouseover, mouseout,
mouseenter, mouseleave

Keyboard:
keydown, keyup

Form:
input, change, submit, focus, blur

Browser:
load, resize, scroll, DOMContentLoaded
*/


// ========================================
// 3. EVENT OBJECT
// ========================================

// HTML: <button id="eventBtn">Click</button>

const eventBtn = document.getElementById("eventBtn");

if (eventBtn) {
    eventBtn.addEventListener("click", (event) => {
        console.log(event.type);          // click
        console.log(event.target);        // clicked element
        console.log(event.currentTarget); // element with listener
    });
}

/*
Important properties and methods:

event.type
event.target
event.currentTarget
event.key
event.preventDefault()
event.stopPropagation()
*/


// ========================================
// 4. CLICK EVENT
// ========================================

// HTML:
// <h2 id="title">Hello</h2>
// <button id="changeBtn">Change</button>

const title = document.getElementById("title");
const changeBtn = document.getElementById("changeBtn");

if (title && changeBtn) {
    changeBtn.addEventListener("click", () => {
        title.textContent = "Hello JavaScript!";
    });
}


// ========================================
// 5. MOUSE EVENTS
// ========================================

// HTML: <div id="box">Hover over me</div>

const box = document.getElementById("box");

if (box) {
    box.addEventListener("mouseenter", () => {
        box.style.backgroundColor = "yellow";
    });

    box.addEventListener("mouseleave", () => {
        box.style.backgroundColor = "white";
    });
}


// ========================================
// 6. KEYBOARD EVENTS
// ========================================

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log("Enter pressed!");
    }

    if (event.key === "Escape") {
        console.log("Escape pressed!");
    }
});


// ========================================
// 7. INPUT EVENT
// ========================================

// HTML:
// <input id="username" placeholder="Enter name">
// <p id="output"></p>

const username = document.getElementById("username");
const output = document.getElementById("output");

if (username && output) {
    username.addEventListener("input", () => {
        output.textContent = username.value;
    });
}

/*
input:
Fires as the value changes, often on every keystroke.

change:
Fires when a change is committed.
For text inputs, commonly when focus is lost after editing.
*/


// ========================================
// 8. FORM SUBMISSION
// ========================================

// HTML:
// <form id="myForm">
//   <input type="text" required>
//   <button type="submit">Submit</button>
// </form>

const myForm = document.getElementById("myForm");

if (myForm) {
    myForm.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Form submitted using JavaScript!");
    });
}

/*
preventDefault():
Prevents the browser's default action, when cancelable.
For a form, it prevents the normal submission/navigation.
*/


// ========================================
// 9. EVENT BUBBLING
// ========================================

// HTML:
// <div id="parent">
//   <button id="child">Click</button>
// </div>

const parent = document.getElementById("parent");
const child = document.getElementById("child");

if (parent && child) {
    parent.addEventListener("click", () => {
        console.log("Parent clicked");
    });

    child.addEventListener("click", () => {
        console.log("Child clicked");
    });
}

/*
Click the child.

Output:
Child clicked
Parent clicked

Bubbling travels from the target up to its ancestors.
*/


// ========================================
// 10. EVENT CAPTURING
// ========================================

if (parent && child) {
    parent.addEventListener("click", () => {
        console.log("Parent capturing");
    }, { capture: true });
}

/*
Capturing travels from ancestors toward the target.
Capturing listener runs before the target listener
in this example.
*/


// ========================================
// 11. stopPropagation()
// ========================================

if (child) {
    child.addEventListener("click", (event) => {
        console.log("Child clicked");
        event.stopPropagation();
    });
}

/*
Stops the event from propagating further.
It does not cancel the default browser action.
*/


// ========================================
// 12. EVENT DELEGATION
// ========================================

// HTML:
// <ul id="fruits">
//   <li>Apple</li>
//   <li>Banana</li>
//   <li>Mango</li>
// </ul>

const fruits = document.getElementById("fruits");

if (fruits) {
    fruits.addEventListener("click", (event) => {
        if (event.target.matches("li")) {
            console.log(event.target.textContent);
        }
    });
}

/*
One listener handles clicks on multiple child elements.
Useful for dynamically created elements.
*/


// ========================================
// 13. removeEventListener()
// ========================================

function sayHello() {
    console.log("Hello!");
}

if (btn) {
    btn.addEventListener("click", sayHello);

    // Remove the listener when needed:
    // btn.removeEventListener("click", sayHello);
}

/*
Use the same function reference to remove a listener.
*/


// ========================================
// 14. onclick vs addEventListener()
// ========================================

/*
Using onclick:
btn.onclick = sayHello;

Using addEventListener:
btn.addEventListener("click", sayHello);

Difference:
- onclick assignment can replace an earlier onclick handler.
- addEventListener allows multiple listeners.
- addEventListener is generally preferred.
*/


// ========================================
// 15. DOMContentLoaded vs load
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("HTML parsed; DOM is ready.");
});

window.addEventListener("load", () => {
    console.log("Page and dependent resources loaded.");
});


// ========================================
// 16. QUICK REVISION
// ========================================

/*
1. Event = an action or occurrence in the browser.
2. addEventListener() registers an event handler.
3. event.target = element where event originated.
4. event.currentTarget = element running the handler.
5. preventDefault() prevents a default action.
6. stopPropagation() stops further event propagation.
7. Bubbling: target -> ancestors.
8. Capturing: ancestors -> target.
9. input fires while a value changes.
10. submit handles form submission.
11. Event delegation uses a parent listener.
12. removeEventListener() removes a registered listener.
13. DOMContentLoaded means HTML parsing is complete.
14. load waits for dependent resources too.
*/
