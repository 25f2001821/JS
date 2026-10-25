/*
============================================================
JS11: CLASSES, OBJECTS, PROTOTYPES & ERROR HANDLING
============================================================

TOPICS:
1. Objects: state and behaviour
2. Prototypes and __proto__
3. Classes and objects
4. constructor()
5. this keyword
6. Inheritance using extends
7. Method overriding
8. super keyword
9. User and Admin practice question
10. Error handling: try...catch
11. Additional important concepts
12. Quick revision and practice
*/


// ============================================================
// 1. OBJECTS: STATE AND BEHAVIOUR
// ============================================================

/*
An object is an entity containing:

STATE      = Properties / data
BEHAVIOUR  = Methods / functions

Example:
A student has a name and email (state).
A student can display their details (behaviour).
*/

const student = {
    name: "Rahul",
    email: "rahul@example.com",

    viewData: function () {
        console.log("Student details:");
        console.log(this.name);
        console.log(this.email);
    }
};

console.log("\n--- 1. Objects ---");

console.log(student.name);
console.log(student.email);

student.viewData();

/*
Output:
Rahul
rahul@example.com
Student details:
Rahul
rahul@example.com
*/


// ============================================================
// 2. PROTOTYPES IN JAVASCRIPT
// ============================================================

/*
THEORY:

JavaScript objects have an internal prototype link.

An object can access properties and methods from its prototype
through the prototype chain.

If an object and its prototype have methods with the same name,
the object's own method is used first.

The PDF introduces __proto__ to access/set the prototype.
It is included here for learning; modern code usually prefers
Object.create() when creating an object with a chosen prototype.
*/

const parentObject = {
    greet: function () {
        console.log("Hello from parent!");
    },

    showInfo: function () {
        console.log("This method comes from the prototype.");
    }
};

const childObject = {
    name: "Aman",

    greet: function () {
        console.log("Hello from child!");
    }
};

// Link childObject to parentObject for this example.
childObject.__proto__ = parentObject;

console.log("\n--- 2. Prototypes ---");

childObject.greet();
// Output: Hello from child!
// The object's own method takes priority.

childObject.showInfo();
// Output: This method comes from the prototype.

console.log(childObject.name);
// Output: Aman

/*
How JavaScript searches for a method:

1. Check childObject itself.
2. If not found, check its prototype.
3. Continue up the prototype chain.
4. If not found anywhere, the result is undefined.

Modern alternative:

const anotherChild = Object.create(parentObject);
anotherChild.name = "Riya";
anotherChild.showInfo();
*/


// ============================================================
// 3. CLASSES IN JAVASCRIPT
// ============================================================

/*
THEORY:

A class is a template for creating objects.

Syntax:

class MyClass {
    constructor() {
        // Initialize object
    }

    myMethod() {
        // Behaviour
    }
}

const obj = new MyClass();

The new keyword creates a class instance.
The constructor is automatically called during construction.
*/

class MyClass {
    constructor() {
        this.message = "Hello from MyClass!";
    }

    myMethod() {
        console.log(this.message);
    }
}

console.log("\n--- 3. Classes ---");

const myObj = new MyClass();

myObj.myMethod();

// Output: Hello from MyClass!


// ============================================================
// 4. CONSTRUCTOR AND THIS
// ============================================================

/*
constructor():

- Initializes a new object.
- Runs automatically when using new.
- Can receive arguments.

this:

- Refers to the current instance in these method calls.
- Allows us to access or update the object's properties.

Python comparison:

Python:      __init__(self, name)
JavaScript:  constructor(name)

Python:      self.name = name
JavaScript:  this.name = name
*/

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`My name is ${this.name}.`);
        console.log(`My age is ${this.age}.`);
    }

    haveBirthday() {
        this.age++;
        console.log(`New age: ${this.age}`);
    }
}

console.log("\n--- 4. Constructor and this ---");

const student1 = new Student("Rahul", 20);
const student2 = new Student("Aman", 22);

student1.introduce();
student2.introduce();

student1.haveBirthday();

console.log(student1.age); // 21
console.log(student2.age); // 22

/*
Each instance has its own name and age.

Changing student1.age does not change student2.age.
*/


// ============================================================
// 5. INHERITANCE USING extends
// ============================================================

/*
THEORY:

Inheritance allows a child class to inherit properties and methods
from a parent class.

Syntax:

class Parent { }

class Child extends Parent { }

The child can use inherited parent methods.
*/

class Parent {
    parentMethod() {
        console.log("This method belongs to Parent.");
    }
}

class Child extends Parent {
    childMethod() {
        console.log("This method belongs to Child.");
    }
}

console.log("\n--- 5. Inheritance ---");

const child = new Child();

child.parentMethod(); // Inherited
child.childMethod();  // Child's own method

/*
Python comparison:

class Child(Parent):
    pass

JavaScript:

class Child extends Parent {}
*/


// ============================================================
// 6. METHOD OVERRIDING
// ============================================================

/*
THEORY:

When a child class defines a method with the same name as a
parent method, the child's method is used for that child object.

This is called METHOD OVERRIDING.
*/

class Animal {
    speak() {
        console.log("Animal makes a sound.");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog barks.");
    }
}

console.log("\n--- 6. Method overriding ---");

const animal = new Animal();
const dog = new Dog();

animal.speak();
// Animal makes a sound.

dog.speak();
// Dog barks.

/*
The Dog class overrides Animal's speak() method.

The parent's version can still be called using super.speak().
*/


// ============================================================
// 7. SUPER KEYWORD
// ============================================================

/*
THEORY:

super is used to access parent-class functionality.

1. super(arguments)
   Calls the parent constructor.

2. super.methodName(arguments)
   Calls a parent method.

IMPORTANT:
In a derived class constructor, call super() before using this.
*/

class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    showDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
    }
}

class CollegeStudent extends Person {
    constructor(name, email, course) {
        super(name, email);

        this.course = course;
    }

    showCollegeDetails() {
        super.showDetails();

        console.log(`Course: ${this.course}`);
    }
}

console.log("\n--- 7. super keyword ---");

const collegeStudent = new CollegeStudent(
    "Rahul",
    "rahul@example.com",
    "Data Science"
);

collegeStudent.showCollegeDetails();

/*
Output:
Name: Rahul
Email: rahul@example.com
Course: Data Science
*/


// ============================================================
// 8. PDF PRACTICE: COLLEGE WEBSITE USER AND ADMIN
// ============================================================

/*
QUESTION FROM YOUR PDF:

Create a User class with:
- name
- email
- viewData() method

Then create an Admin class that inherits from User.
Add an editData() method to Admin.

This example displays data in the console.
It does not update a real website or database.
*/

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    viewData() {
        console.log("\nCollege website data:");

        console.log("Course: Data Science");
        console.log("Department: Computer Science");
        console.log("Announcement: Registration is open.");
    }
}

class Admin extends User {
    editData(newAnnouncement) {
        console.log(`\nAdmin ${this.name} edited the website data.`);
        console.log(`New announcement: ${newAnnouncement}`);
    }
}

console.log("\n--- 8. User and Admin ---");

const user1 = new User(
    "Aman",
    "aman@example.com"
);

console.log("User:", user1.name);
console.log("Email:", user1.email);

user1.viewData();

const admin1 = new Admin(
    "Riya",
    "riya@example.com"
);

console.log("\nAdmin:", admin1.name);

// Admin inherits viewData() from User.
admin1.viewData();

// Admin has its own editData() method.
admin1.editData("The college fest is on Friday.");

/*
IMPORTANT:

User:
- Has name and email.
- Can view website data.

Admin:
- Inherits name and email from User.
- Inherits viewData() from User.
- Adds editData().

This is a practical example of inheritance.
*/


// ============================================================
// 9. ERROR HANDLING: try...catch
// ============================================================

/*
THEORY:

try:
Contains code that may throw an error.

catch (err):
Handles an error thrown in the try block.

err.message:
Provides the error message.

Why use it?
It lets the program handle expected failures instead of stopping
without a useful response.
*/

console.log("\n--- 9. try...catch ---");

try {
    console.log("Code inside try.");

    throw new Error("Something went wrong!");

    // Code after throw in this block is skipped.
} catch (err) {
    console.log("An error occurred:", err.message);
}

console.log("Program continues after catch.");

/*
Output:
Code inside try.
An error occurred: Something went wrong!
Program continues after catch.
*/


// ============================================================
// 10. PRACTICAL ERROR HANDLING WITH USER
// ============================================================

/*
Example:
A user must have both a name and an email.

If either is missing, throw an error and handle it.
*/

function createUser(name, email) {
    try {
        if (!name || !email) {
            throw new Error("Name and email are required.");
        }

        return new User(name, email);
    } catch (err) {
        console.log("Could not create user:", err.message);
        return null;
    }
}

console.log("\n--- 10. User validation ---");

const validUser = createUser(
    "Neha",
    "neha@example.com"
);

console.log(validUser);

const invalidUser = createUser("", "");

console.log(invalidUser); // null


// ============================================================
// 11. ADDITIONAL IMPORTANT CONCEPT: instanceof
// ============================================================

/*
instanceof checks whether an object belongs to a class's
prototype chain.

It is useful when working with inheritance.
*/

console.log("\n--- 11. instanceof ---");

console.log(user1 instanceof User);   // true
console.log(admin1 instanceof Admin); // true
console.log(admin1 instanceof User);  // true

/*
Why is admin1 instanceof User true?

Because Admin extends User.
An Admin instance is also an instance of User through inheritance.
*/


// ============================================================
// 12. ADDITIONAL IMPORTANT CONCEPT: Object.hasOwn()
// ============================================================

/*
An object's own properties are different from inherited properties.

Object.hasOwn(object, propertyName) checks whether the property
belongs directly to the object, rather than being inherited.
*/

console.log("\n--- 12. Own properties ---");

console.log(Object.hasOwn(admin1, "name"));      // true
console.log(Object.hasOwn(admin1, "viewData"));  // false

/*
name is created directly on the instance by the parent constructor.
viewData is defined on User.prototype and inherited by admin1.
*/


// ============================================================
// 13. PYTHON VS JAVASCRIPT OOP COMPARISON
// ============================================================

/*
The following Python examples are comments only.
They are included to help you compare Python OOP with JavaScript OOP.
*/


// ------------------------------------------------------------
// A. CLASS AND OBJECT CREATION
// ------------------------------------------------------------

/*
PYTHON:

class Student:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello {self.name}")

s1 = Student("Rahul")
s1.greet()


JAVASCRIPT:

class Student {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}

const s1 = new Student("Rahul");
s1.greet();


COMPARISON:

Python initializer:       __init__()
JavaScript initializer:   constructor()

Python instance reference: self
JavaScript instance reference: this

Python creation:          Student("Rahul")
JavaScript creation:      new Student("Rahul")
*/


// ------------------------------------------------------------
// B. self VS this
// ------------------------------------------------------------

/*
Python uses self explicitly as the first instance-method parameter.

JavaScript uses this as a special keyword, not a method parameter.

Both can access the current object's properties.

However, JavaScript this generally depends on how the function is called.
A detached method can lose its original this binding.
*/


// ------------------------------------------------------------
// C. INHERITANCE
// ------------------------------------------------------------

/*
PYTHON:

class Animal:
    def speak(self):
        print("Animal sound")

class Dog(Animal):
    pass

dog = Dog()
dog.speak()


JAVASCRIPT:

class Animal {
    speak() {
        console.log("Animal sound");
    }
}

class Dog extends Animal {}

const dog = new Dog();
dog.speak();


Python inheritance:
class Dog(Animal)

JavaScript inheritance:
class Dog extends Animal
*/


// ------------------------------------------------------------
// D. PARENT CONSTRUCTOR
// ------------------------------------------------------------

/*
PYTHON:

class Child(Parent):
    def __init__(self, name):
        super().__init__(name)


JAVASCRIPT:

class Child extends Parent {
    constructor(name) {
        super(name);
    }
}
*/


// ------------------------------------------------------------
// E. STATIC METHODS
// ------------------------------------------------------------

/*
PYTHON:

class MathHelper:
    @staticmethod
    def add(a, b):
        return a + b


JAVASCRIPT:

class MathHelper {
    static add(a, b) {
        return a + b;
    }
}
*/


// ------------------------------------------------------------
// F. PRIVATE DATA
// ------------------------------------------------------------

/*
Python:
_balance is a naming convention for internal data.
It does not enforce strict privacy.

JavaScript:
#balance is a private field enforced by the language.
*/


// ============================================================
// 14. QUICK REVISION
// ============================================================

/*
OBJECT:
Contains state and behaviour.

PROTOTYPE:
Object used in property/method lookup through the prototype chain.

__proto__:
Legacy accessor for an object's prototype.

CLASS:
Template for creating objects.

constructor():
Initializes an object when using new.

new:
Creates an instance of a class.

this:
Refers to the current object in these method calls.

extends:
Establishes inheritance from a parent class.

METHOD OVERRIDING:
Child class provides its own implementation of a parent method.

super():
Calls the parent constructor.

super.methodName():
Calls a parent method.

try:
Runs code that may throw an error.

catch(err):
Handles an error thrown in the try block.

instanceof:
Checks an object's class/prototype relationship.

Object.hasOwn():
Checks whether a property belongs directly to an object.
*/


// ============================================================
// 15. PRACTICE QUESTIONS
// ============================================================

/*
1. Create a User class with name and email.
   Add a viewData() method.

2. Create an Admin class extending User.
   Add an editData() method.

3. Override viewData() in Admin.
   Make it display "Admin can view all data."

4. In the overridden method, call the parent's viewData() using
   super.viewData().

5. Create a Student class with name and age.
   Add a birthday() method that increments age.

6. Create a prototype object with a greet() method.
   Link another object to it using Object.create().
   Call greet() on the new object.

7. Use try...catch to handle an invalid age.

8. Explain the difference between:
   - A class and an object
   - An own method and an inherited method
   - extends and super
   - try and catch
*/


// ============================================================
// END OF JS11 REVISION FILE
// ============================================================

console.log("\nJS11 revision file executed successfully.");