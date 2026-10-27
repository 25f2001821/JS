/*
============================================================
JS12 CLASS NOTES — ASYNCHRONOUS JAVASCRIPT
============================================================

TOPICS:
1. Synchronous vs asynchronous JavaScript
2. Callbacks
3. Callback hell
4. Promises and promise states
5. resolve() and reject()
6. .then() and .catch()
7. Promise chaining
8. async and await
9. Error handling
10. IIFE
11. Promise.all()
12. Practice exercises

Run:
node JS12_async_javascript.js
*/


// ============================================================
// 1. SYNCHRONOUS JAVASCRIPT
// ============================================================

/*
Synchronous code executes in sequence.
Each statement waits for the previous statement to finish.
*/

console.log("\n--- 1. Synchronous JavaScript ---");

console.log("First");
console.log("Second");
console.log("Third");

/*
OUTPUT:
First
Second
Third
*/


// ============================================================
// 2. ASYNCHRONOUS JAVASCRIPT
// ============================================================

/*
Asynchronous operations allow JavaScript to schedule work and
continue executing other code while waiting.

setTimeout(callback, delay):
Schedules a callback after at least the specified delay.
It does not guarantee execution at the exact millisecond.
*/

console.log("\n--- 2. Asynchronous JavaScript ---");

console.log("Start");

setTimeout(function () {
    console.log("Timer callback finished");
}, 1000);

console.log("This runs before the timer callback");

/*
TYPICAL OUTPUT:
Start
This runs before the timer callback
Timer callback finished

JavaScript does not pause the entire program for one second.
*/


// ============================================================
// 3. CALLBACKS
// ============================================================

/*
A callback is a function passed as an argument to another function.
The receiving function calls it when appropriate.
*/

console.log("\n--- 3. Callbacks ---");

function greetUser(name, callback) {
    console.log(`Hello, ${name}!`);

    callback();
}

function afterGreeting() {
    console.log("Greeting completed.");
}

greetUser("Rahul", afterGreeting);

/*
OUTPUT:
Hello, Rahul!
Greeting completed.
*/


// ============================================================
// 4. ASYNCHRONOUS CALLBACK
// ============================================================

/*
Callbacks can handle asynchronous operations.
This example simulates retrieving user data.
It does not contact a real server.
*/

console.log("\n--- 4. Asynchronous callback ---");

function fetchUserData(callback) {
    setTimeout(function () {
        const userData = {
            id: 1,
            name: "Aman"
        };

        callback(userData);
    }, 500);
}

fetchUserData(function (user) {
    console.log("Received user:", user);
});

console.log("Request started; other code can continue.");


// ============================================================
// 5. CALLBACK HELL
// ============================================================

/*
Callback hell occurs when callbacks are deeply nested.

Problems:
- Difficult to read
- Difficult to maintain
- Error handling becomes complicated
- Code develops a pyramid-like structure

The following example intentionally demonstrates nested callbacks.
*/

console.log("\n--- 5. Callback hell ---");

function getCourse(callback) {
    setTimeout(function () {
        console.log("1. Course loaded");

        callback({
            courseId: 101,
            name: "Data Science"
        });
    }, 200);
}

function getLessons(courseId, callback) {
    setTimeout(function () {
        console.log(`2. Lessons loaded for course ${courseId}`);

        callback(["JavaScript", "Python", "SQL"]);
    }, 200);
}

function getLessonDetails(lessonName, callback) {
    setTimeout(function () {
        console.log(`3. Details loaded for ${lessonName}`);

        callback({
            lesson: lessonName,
            durationMinutes: 30
        });
    }, 200);
}

getCourse(function (course) {
    getLessons(course.courseId, function (lessons) {
        getLessonDetails(lessons[0], function (details) {
            console.log("Final details:", details);
        });
    });
});


// ============================================================
// 6. PROMISES
// ============================================================

/*
A Promise represents the eventual success or failure of an operation.

THREE PROMISE STATES:

1. pending:
   The operation has not settled yet.

2. fulfilled:
   The operation completed successfully.

3. rejected:
   The operation failed.

resolve(value):
Fulfills the promise with a value.

reject(reason):
Rejects the promise with a reason.

A promise can settle only once.
*/

console.log("\n--- 6. Promises ---");

const simplePromise = new Promise(function (resolve, reject) {
    const taskSucceeded = true;

    if (taskSucceeded) {
        resolve("Task completed successfully.");
    } else {
        reject(new Error("Task failed."));
    }
});

simplePromise
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.log("Error:", error.message);
    });


// ============================================================
// 7. RESOLVE AND REJECT
// ============================================================

/*
resolve() leads to successful completion.
reject() indicates failure.
*/

console.log("\n--- 7. resolve() and reject() ---");

function checkExamScore(score) {
    return new Promise(function (resolve, reject) {
        if (score >= 40) {
            resolve(`Passed with ${score} marks.`);
        } else {
            reject(new Error(`Failed with ${score} marks.`));
        }
    });
}

checkExamScore(75)
    .then(function (message) {
        console.log(message);
    })
    .catch(function (error) {
        console.log(error.message);
    });

checkExamScore(25)
    .then(function (message) {
        console.log(message);
    })
    .catch(function (error) {
        console.log(error.message);
    });


// ============================================================
// 8. .then() AND .catch()
// ============================================================

/*
.then():
Handles a fulfilled promise.
Its returned value is passed to the next .then().

.catch():
Handles a rejection from the promise or an earlier chain step.
*/

console.log("\n--- 8. then() and catch() ---");

Promise.resolve(10)
    .then(function (number) {
        console.log("Starting value:", number);

        return number * 2;
    })
    .then(function (result) {
        console.log("Doubled value:", result);

        return result + 5;
    })
    .then(function (result) {
        console.log("Final value:", result);
    })
    .catch(function (error) {
        console.log("Chain error:", error.message);
    });

/*
OUTPUT:
Starting value: 10
Doubled value: 20
Final value: 25
*/


// ============================================================
// 9. PROMISE CHAINING
// ============================================================

/*
Promise chaining helps avoid deeply nested callbacks.

Each step returns a promise.
The next .then() receives the previous step's result.
*/

console.log("\n--- 9. Promise chaining ---");

function getCoursePromise() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({
                courseId: 101,
                name: "Data Science"
            });
        }, 200);
    });
}

function getLessonsPromise(courseId) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(["JavaScript", "Python", "SQL"]);
        }, 200);
    });
}

function getLessonDetailsPromise(lessonName) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({
                lesson: lessonName,
                durationMinutes: 30
            });
        }, 200);
    });
}

getCoursePromise()
    .then(function (course) {
        console.log("Course:", course.name);

        return getLessonsPromise(course.courseId);
    })
    .then(function (lessons) {
        console.log("Lessons:", lessons);

        return getLessonDetailsPromise(lessons[0]);
    })
    .then(function (details) {
        console.log("Lesson details:", details);
    })
    .catch(function (error) {
        console.log("Something failed:", error.message);
    });


// ============================================================
// 10. ASYNC FUNCTIONS
// ============================================================

/*
An async function always returns a Promise.

If the function returns a normal value, the Promise fulfills with
that value.

If the function throws an error, its Promise rejects.
*/

console.log("\n--- 10. async functions ---");

async function sayHello() {
    return "Hello from an async function!";
}

sayHello().then(function (message) {
    console.log(message);
});


// ============================================================
// 11. AWAIT
// ============================================================

/*
await is used inside an async function to wait for a Promise.

If fulfilled:
await evaluates to the fulfilled value.

If rejected:
await throws the rejection reason.

IMPORTANT:
await pauses the current async function, not the entire program.
*/

console.log("\n--- 11. async and await ---");

function wait(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}

async function runSequence() {
    console.log("Sequence started.");

    await wait(500);
    console.log("Half a second passed.");

    await wait(500);
    console.log("One second passed in total.");

    return "Sequence finished.";
}

runSequence().then(function (message) {
    console.log(message);
});

console.log("This line runs while runSequence is waiting.");


// ============================================================
// 12. ERROR HANDLING WITH ASYNC/AWAIT
// ============================================================

/*
Use try...catch to handle rejected promises when using await.
*/

console.log("\n--- 12. Async error handling ---");

function getNumberPromise(shouldSucceed) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (shouldSucceed) {
                resolve(42);
            } else {
                reject(new Error("Could not get the number."));
            }
        }, 300);
    });
}

async function showNumber() {
    try {
        const number = await getNumberPromise(true);

        console.log("Number received:", number);

        const anotherNumber = await getNumberPromise(false);

        // This line won't execute because the previous await rejects.
        console.log("Another number:", anotherNumber);

    } catch (error) {
        console.log("Caught async error:", error.message);
    }
}

showNumber();


// ============================================================
// 13. IIFE
// ============================================================

/*
IIFE = Immediately Invoked Function Expression.

It is a function expression that is called immediately after definition.

Common syntax:

(function () {
    // code
})();

An IIFE creates a local scope for its variables.
*/

console.log("\n--- 13. IIFE ---");

(function () {
    const message = "Regular IIFE ran immediately.";

    console.log(message);
})();


// Arrow-function IIFE
(() => {
    console.log("Arrow IIFE ran immediately.");
})();


// ============================================================
// 14. ASYNC IIFE
// ============================================================

/*
An async IIFE allows await to be used inside an immediately invoked
function in a regular Node.js script.
*/

console.log("\n--- 14. Async IIFE ---");

(async function () {
    const message = await Promise.resolve(
        "Async IIFE completed."
    );

    console.log(message);
})();


// ============================================================
// 15. PROMISE.ALL
// ============================================================

/*
Promise.all() is useful when independent tasks can run concurrently.

It fulfills when all input promises fulfill.
It rejects if any input promise rejects.
*/

console.log("\n--- 15. Promise.all() ---");

const task1 = wait(300).then(function () {
    return "Task 1 result";
});

const task2 = wait(500).then(function () {
    return "Task 2 result";
});

Promise.all([task1, task2])
    .then(function (results) {
        console.log("All tasks finished:", results);
    })
    .catch(function (error) {
        console.log("A task failed:", error.message);
    });


// ============================================================
// 16. PYTHON COMPARISON
// ============================================================

/*
Python comparison:

Synchronous Python:
print("First")
print("Second")

JavaScript callbacks:
setTimeout(() => console.log("Later"), 1000)

Python has async/await too, but asynchronous operations usually use
asyncio and awaitable objects.

JavaScript:
async function getData() {
    const result = await somePromise;
    return result;
}

Python:
async def get_data():
    result = await some_coroutine()
    return result

Do not assume every JavaScript Promise is equivalent to every Python
coroutine; their runtimes and APIs differ.
*/


// ============================================================
// 17. QUICK REVISION
// ============================================================

/*
SYNCHRONOUS:
Code runs in sequence.

ASYNCHRONOUS:
Allows scheduled work to complete without blocking all other JS work.

CALLBACK:
Function passed to another function.

CALLBACK HELL:
Deeply nested callbacks.

PROMISE:
Represents eventual success or failure.

PENDING:
Not settled yet.

FULFILLED:
Completed successfully.

REJECTED:
Failed.

resolve(value):
Fulfills a promise.

reject(reason):
Rejects a promise.

.then():
Handles fulfillment and passes values through a chain.

.catch():
Handles promise rejection.

async:
Declares a function that returns a Promise.

await:
Waits for a Promise inside an async function.

IIFE:
Function invoked immediately after definition.

Promise.all():
Waits for all promises to fulfill, or rejects if one rejects.
*/


// ============================================================
// 18. PRACTICE EXERCISES
// ============================================================

/*
EXERCISE 1:
Write a callback-based function that waits 1 second and prints
"Task complete".

EXERCISE 2:
Create agePromise.
Resolve it if age >= 18; otherwise reject with an Error.
Handle both outcomes with .then() and .catch().

EXERCISE 3:
Start with Promise.resolve(5), multiply by 3, add 10, and print
the final result.
Expected output: 25.

EXERCISE 4:
Write an async function that awaits a Promise resolving after 1 second,
then prints "Finished".

EXERCISE 5:
Use try...catch inside an async function to handle a rejected Promise.

EXERCISE 6:
Write a regular IIFE and an arrow-function IIFE.

EXERCISE 7:
Explain:
- synchronous vs asynchronous execution
- callback vs promise
- pending vs fulfilled vs rejected
- .then() vs .catch()
- async vs await
- callback hell vs promise chaining
*/


console.log("\nJS12 asynchronous JavaScript revision file loaded.");