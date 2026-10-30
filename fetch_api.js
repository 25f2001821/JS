/*
============================================================
JAVASCRIPT FETCH API — COMPLETE THEORY AND REVISION
============================================================

TOPICS:

1. What is Fetch API?
2. How Fetch API works
3. HTTP requests and responses
4. GET request
5. Fetch a single user
6. response.json()
7. response.ok and response.status
8. POST request
9. PUT request
10. PATCH request
11. DELETE request
12. Promise chaining with Fetch
13. Async/await with Fetch
14. Error handling
15. Query parameters
16. Request headers
17. AbortController
18. Display API data using DOM
19. Python vs JavaScript comparison
20. Common mistakes
21. Quick revision
22. Practice exercises


API USED:
https://jsonplaceholder.typicode.com

This is a free testing API.

IMPORTANT:
The examples require an internet connection.

For browser examples, use an HTML file.
For Node.js examples, Node.js 18+ is recommended.
*/


// ============================================================
// 1. WHAT IS FETCH API?
// ============================================================

/*
THEORY:

Fetch API is used to communicate with servers.

It allows JavaScript to:

1. Retrieve data from a server.
2. Send data to a server.
3. Update existing data.
4. Delete data from a server.

Examples:

- Fetch users from an API.
- Retrieve products from an e-commerce website.
- Send login information.
- Submit registration forms.
- Update user profiles.

Fetch API returns a Promise.

Therefore, we can use:

- .then()
- .catch()
- async
- await


BASIC SYNTAX:

fetch(URL)
    .then(response => {
        // Handle response
    })
    .catch(error => {
        // Handle error
    });
*/


// ============================================================
// 2. HOW FETCH API WORKS
// ============================================================

/*
THEORY:

The basic Fetch API workflow:

1. JavaScript sends an HTTP request using fetch().
2. The server receives the request.
3. The server processes the request.
4. The server sends an HTTP response.
5. JavaScript reads the response.
6. JavaScript converts the response body into usable data.

IMPORTANT:

fetch() returns a Promise.

response.json() also returns a Promise.

This means we usually need two await statements:

const response = await fetch(URL);
const data = await response.json();
*/


// ============================================================
// 3. UNDERSTANDING HTTP METHODS
// ============================================================

/*
HTTP methods define what operation we want to perform.

GET:
Retrieve data from a server.

POST:
Create or submit data.

PUT:
Replace an existing resource.

PATCH:
Partially update an existing resource.

DELETE:
Delete a resource.


EXAMPLE:

GET    /users       Retrieve users
POST   /users       Create a user
PUT    /users/1     Replace user 1
PATCH  /users/1     Update part of user 1
DELETE /users/1     Delete user 1
*/


// ============================================================
// 4. BASIC GET REQUEST
// ============================================================

/*
THEORY:

GET is used to retrieve information from a server.

fetch(URL) sends a GET request by default.

We do not need to specify method: "GET" explicitly.
*/

const API_URL = "https://jsonplaceholder.typicode.com";

async function getUsers() {

    try {

        const response = await fetch(`${API_URL}/users`);

        const data = await response.json();

        console.log("All Users:");
        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// Uncomment to execute:
// getUsers();


// ============================================================
// 5. FETCH A SINGLE USER
// ============================================================

/*
THEORY:

We can retrieve a particular user using their ID.

Example:

/users/1
/users/2
/users/3

The server returns information about the requested user.
*/

async function getSingleUser() {

    try {

        const response = await fetch(`${API_URL}/users/1`);

        const user = await response.json();

        console.log("\nSingle User:");

        console.log("ID:", user.id);
        console.log("Name:", user.name);
        console.log("Email:", user.email);
        console.log("City:", user.address.city);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// getSingleUser();


// ============================================================
// 6. UNDERSTANDING response.json()
// ============================================================

/*
THEORY:

The server often sends JSON data.

JSON = JavaScript Object Notation.

Example JSON response:

{
    "id": 1,
    "name": "Rahul",
    "email": "rahul@example.com"
}

response.json():

- Reads the response body.
- Parses JSON text.
- Returns a Promise.
- Resolves to a JavaScript value.

Example:

const response = await fetch(URL);
const data = await response.json();

Now we can access:

data.name
data.email
data.id


IMPORTANT:

response.json() does NOT directly return an object.
It returns a Promise that resolves to the parsed data.
*/


// ============================================================
// 7. response.ok AND response.status
// ============================================================

/*
THEORY:

A very important concept.

fetch() generally does NOT reject its Promise for HTTP errors
such as 404 or 500.

It can successfully receive an HTTP response even when the
server reports an error.

Therefore, check response.ok.

response.ok:
Returns true for HTTP status codes from 200 to 299.

response.status:
Returns the HTTP status code.

Examples:

200 = OK
201 = Created
400 = Bad Request
401 = Unauthorized
403 = Forbidden
404 = Not Found
500 = Internal Server Error
*/

async function getUsersWithStatusCheck() {

    try {

        const response = await fetch(`${API_URL}/users`);

        console.log("Status:", response.status);
        console.log("Success:", response.ok);

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// getUsersWithStatusCheck();


// ============================================================
// 8. POST REQUEST — CREATE DATA
// ============================================================

/*
THEORY:

POST is used to send data to a server.

Example:
Creating a new user.

Important properties:

method:
Specifies the HTTP method.

headers:
Contains request metadata.

Content-Type:
Tells the server what format the request body uses.

application/json:
Means the request body contains JSON.

body:
Contains the actual data being sent.

JSON.stringify():
Converts a JavaScript object into JSON text.

Example:

const user = {
    name: "Rahul",
    email: "rahul@example.com"
};

JSON.stringify(user);


IMPORTANT:

JSON.stringify():
JavaScript object -> JSON text

response.json():
JSON response body -> JavaScript value
*/

async function createUser() {

    try {

        const response = await fetch(`${API_URL}/users`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: "Divyansh",

                email: "divyansh@example.com",

                username: "divyansh123"

            })

        });

        if (!response.ok) {

            throw new Error("Failed to create user");

        }

        const data = await response.json();

        console.log("\nCreated User:");
        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// createUser();


// ============================================================
// 9. PUT REQUEST — REPLACE DATA
// ============================================================

/*
THEORY:

PUT is generally used to replace an existing resource.

For example:

Updating user 1 completely.

The request body usually contains the complete representation
of the resource being replaced.

PUT:

Replace existing resource.
*/

async function updateUser() {

    try {

        const response = await fetch(`${API_URL}/users/1`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id: 1,

                name: "Updated Name",

                username: "updated123",

                email: "updated@example.com"

            })

        });

        if (!response.ok) {

            throw new Error("Failed to update user");

        }

        const data = await response.json();

        console.log("\nUpdated User:");
        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// updateUser();


// ============================================================
// 10. PATCH REQUEST — PARTIALLY UPDATE DATA
// ============================================================

/*
THEORY:

PATCH is used when we want to update only selected properties.

Example:

We only want to update the user's name.

We do not need to send every property.
*/

async function patchUser() {

    try {

        const response = await fetch(`${API_URL}/users/1`, {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: "New Updated Name"

            })

        });

        if (!response.ok) {

            throw new Error("Failed to patch user");

        }

        const data = await response.json();

        console.log("\nPartially Updated User:");
        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// patchUser();


// ============================================================
// 11. DELETE REQUEST
// ============================================================

/*
THEORY:

DELETE is used to delete a resource from a server.

Example:

DELETE /users/1

A successful DELETE request may return:

- 200 OK with a response body.
- 204 No Content without a response body.

IMPORTANT:

Do not automatically call response.json() for every DELETE
request. A 204 response has no body to parse.
*/

async function deleteUser() {

    try {

        const response = await fetch(`${API_URL}/users/1`, {

            method: "DELETE"

        });

        if (!response.ok) {

            throw new Error("Failed to delete user");

        }

        if (response.status === 204) {

            console.log("User deleted successfully.");

        } else {

            const data = await response.json();

            console.log("Delete response:", data);

        }

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// deleteUser();


// ============================================================
// 12. FETCH API USING PROMISE CHAINING
// ============================================================

/*
THEORY:

Fetch returns a Promise.

We can use .then() and .catch() instead of async/await.

Workflow:

fetch()
    .then(response)
    .then(data)
    .catch(error)

The first .then() receives the HTTP response.

The second .then() receives the parsed JSON data.
*/

function getUsersWithPromises() {

    fetch(`${API_URL}/users`)

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    `HTTP Error: ${response.status}`
                );

            }

            return response.json();

        })

        .then(function (data) {

            console.log("\nUsers using Promises:");
            console.log(data);

        })

        .catch(function (error) {

            console.log("Error:", error.message);

        });

}

// getUsersWithPromises();


// ============================================================
// 13. QUERY PARAMETERS
// ============================================================

/*
THEORY:

Sometimes we don't want all records.

We want to filter data.

Example:

Get posts belonging to user 1.

URL:

/posts?userId=1

The question mark (?) starts the query parameters.

URLSearchParams helps create query parameters safely.
*/

async function getFilteredPosts() {

    try {

        const params = new URLSearchParams({

            userId: 1

        });

        const response = await fetch(
            `${API_URL}/posts?${params}`
        );

        if (!response.ok) {

            throw new Error("Failed to fetch posts");

        }

        const posts = await response.json();

        console.log("\nFiltered Posts:");

        console.log(posts);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// getFilteredPosts();


// ============================================================
// 14. REQUEST HEADERS
// ============================================================

/*
THEORY:

Headers provide additional information about an HTTP request.

Common headers:

Content-Type:
Specifies the format of the request body.

Accept:
Specifies the response formats the client can handle.

Authorization:
Can carry authentication credentials or access tokens.

Example:

headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

IMPORTANT:

Never put secret API keys or private credentials directly
inside frontend JavaScript code.
*/

async function fetchWithHeaders() {

    try {

        const response = await fetch(`${API_URL}/users`, {

            method: "GET",

            headers: {

                "Accept": "application/json"

            }

        });

        if (!response.ok) {

            throw new Error("Request failed");

        }

        const data = await response.json();

        console.log("\nUsers with Headers:");
        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// fetchWithHeaders();


// ============================================================
// 15. ABORTCONTROLLER — CANCEL REQUEST
// ============================================================

/*
THEORY:

AbortController allows us to cancel a Fetch request.

It is useful when:

- A user navigates away from a page.
- A search request becomes outdated.
- We no longer need the response.

Steps:

1. Create an AbortController.
2. Pass controller.signal to fetch().
3. Call controller.abort() to cancel the request.
*/

async function fetchWithAbort() {

    const controller = new AbortController();

    try {

        const response = await fetch(
            `${API_URL}/users`,
            {
                signal: controller.signal
            }
        );

        if (!response.ok) {

            throw new Error("Request failed");

        }

        const data = await response.json();

        console.log("\nAbort Example:");
        console.log(data);

    } catch (error) {

        if (error.name === "AbortError") {

            console.log("Request was cancelled.");

        } else {

            console.log("Error:", error.message);

        }

    }

    // In a real application, call this when cancellation is needed:
    // controller.abort();
}

// fetchWithAbort();


// ============================================================
// 16. DISPLAY API DATA USING DOM
// ============================================================

/*
THEORY:

Fetch API retrieves data.

DOM allows us to display that data on a webpage.

HTML:

<div id="users"></div>

We will:

1. Fetch users.
2. Parse the response.
3. Select the HTML container.
4. Create elements.
5. Insert user information.

IMPORTANT SECURITY NOTE:

Use textContent for text received from an API.
Avoid inserting untrusted API data using innerHTML.
*/

async function displayUsers() {

    try {

        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {

            throw new Error("Failed to load users");

        }

        const users = await response.json();

        const container = document.getElementById("users");

        if (!container) {

            throw new Error(
                "HTML element with id 'users' was not found."
            );

        }

        container.replaceChildren();

        users.forEach(function (user) {

            const div = document.createElement("div");

            const heading = document.createElement("h3");

            heading.textContent = user.name;

            const email = document.createElement("p");

            email.textContent = user.email;

            div.appendChild(heading);

            div.appendChild(email);

            container.appendChild(div);

        });

    } catch (error) {

        console.log("Error:", error.message);

    }

}

/*
HTML FILE:

<!DOCTYPE html>
<html>
<head>
    <title>Fetch API Demo</title>
</head>
<body>

    <h1>User Directory</h1>

    <div id="users"></div>

    <script src="fetch_api_revision.js"></script>

    <script>
        displayUsers();
    </script>

</body>
</html>

Open the HTML file in a browser to see the users.

The displayUsers() function is browser-specific because it uses DOM.
*/


// ============================================================
// 17. PYTHON VS JAVASCRIPT COMPARISON
// ============================================================

/*
Python commonly uses the requests library for HTTP requests.

PYTHON:

import requests

response = requests.get(
    "https://jsonplaceholder.typicode.com/users"
)

data = response.json()

print(data)


JAVASCRIPT:

async function getUsers() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const data = await response.json();

    console.log(data);

}

getUsers();


IMPORTANT DIFFERENCES:

Python requests.get():
Usually performs a blocking request unless using an async HTTP library.

JavaScript fetch():
Returns a Promise and is designed for asynchronous use.

Python response.json():
Parses the response body.

JavaScript response.json():
Returns a Promise that resolves to parsed JSON data.

Both approaches allow you to work with APIs.
*/


// ============================================================
// 18. COMMON MISTAKES
// ============================================================

/*
MISTAKE 1: FORGETTING await BEFORE response.json()

Incorrect:

const data = response.json();

Correct:

const data = await response.json();


MISTAKE 2: NOT CHECKING response.ok

fetch() generally does not reject for HTTP errors like 404.

Correct:

if (!response.ok) {
    throw new Error("Request failed");
}


MISTAKE 3: FORGETTING JSON.stringify()

Incorrect:

body: {
    name: "Rahul"
}

Correct:

body: JSON.stringify({
    name: "Rahul"
})


MISTAKE 4: FORGETTING CONTENT-TYPE HEADER

For a JSON request body, commonly use:

headers: {
    "Content-Type": "application/json"
}


MISTAKE 5: THINKING fetch() RETURNS DATA DIRECTLY

Incorrect:

const data = await fetch(URL);

Correct:

const response = await fetch(URL);
const data = await response.json();


MISTAKE 6: PARSING AN EMPTY RESPONSE AS JSON

A 204 No Content response has no JSON body.
Do not call response.json() on it.


MISTAKE 7: USING innerHTML WITH UNTRUSTED API DATA

Prefer textContent for displaying plain text.
*/


// ============================================================
// 19. QUICK REVISION
// ============================================================

/*
FETCH:
Sends an HTTP request and returns a Promise.

GET:
Retrieves data.

POST:
Creates or submits data.

PUT:
Replaces a resource.

PATCH:
Partially updates a resource.

DELETE:
Deletes a resource.

response:
Contains HTTP response information and body methods.

response.ok:
True for HTTP status codes 200–299.

response.status:
Provides the HTTP status code.

response.json():
Reads and parses the response body as JSON.
Returns a Promise.

JSON.stringify():
Converts a JavaScript value into JSON text.

headers:
Provides request metadata.

body:
Contains the request payload.

URLSearchParams:
Helps create query parameters.

AbortController:
Can cancel a Fetch request.

try...catch:
Handles errors in async/await code.
*/


// ============================================================
// 20. PRACTICE EXERCISES
// ============================================================

/*
EXERCISE 1:

Fetch all users.

Print only their names.


EXERCISE 2:

Fetch user ID 3.

Print:
- Name
- Email
- City


EXERCISE 3:

Fetch all posts.

Display the first five posts.


EXERCISE 4:

Create a new post using POST.

Properties:
- title
- body
- userId


EXERCISE 5:

Update a post using PUT.


EXERCISE 6:

Update only the title of a post using PATCH.


EXERCISE 7:

Delete a post using DELETE.


EXERCISE 8:

Fetch all users and display them in an HTML page.


EXERCISE 9:

Fetch posts belonging to user ID 2 using query parameters.


EXERCISE 10:

Create a function that fetches data and handles:
- Network errors
- HTTP errors
- JSON parsing errors
*/


// ============================================================
// END OF FETCH API REVISION
// ============================================================

console.log("\nFetch API revision file loaded successfully.");