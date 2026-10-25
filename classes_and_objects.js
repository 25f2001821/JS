/*
============================================================
JAVASCRIPT CLASSES AND OBJECTS — COMPLETE REVISION
WITH PYTHON OOP COMPARISONS
============================================================

Topics:
1. Objects
2. Classes and instances
3. Constructor
4. this vs self
5. Properties and methods
6. Default parameters and validation
7. Static methods and properties
8. Getters and setters
9. Inheritance and super()
10. Method overriding
11. Encapsulation and private fields
12. Composition
13. instanceof
14. Object references
15. Common mistakes
16. Python vs JavaScript OOP
17. Practice exercises
*/


// ============================================================
// 1. OBJECTS
// ============================================================

/*
THEORY:
An object stores related data as key-value pairs.

Properties store data.
Methods are functions associated with an object.

Python:
student = {"name": "Asha", "age": 20}

JavaScript:
const student = { name: "Asha", age: 20 };
*/

const studentObject = {
    name: "Asha",
    age: 20,

    introduce: function () {
        console.log(`Hi, I am ${this.name}. I am ${this.age} years old.`);
    }
};

console.log("\n--- 1. Objects ---");

console.log(studentObject.name);
console.log(studentObject["age"]);

studentObject.age = 21;
studentObject.city = "Bhopal";

studentObject.introduce();


// ============================================================
// 2. WHY CLASSES?
// ============================================================

/*
A class is a blueprint for creating objects with similar properties
and behavior.

An object created from a class is called an instance.

Analogy:
Class  = House blueprint
Object = Actual house
*/


// ============================================================
// 3. CLASS, CONSTRUCTOR, INSTANCES, AND THIS
// ============================================================

/*
- class Student declares a class.
- constructor() initializes an instance.
- new Student() creates an instance.
- this refers to the current instance in these method calls.

Python comparison:
JavaScript constructor() ~ Python __init__()
JavaScript this          ~ Python self
JavaScript new Student() ~ Python Student()
*/

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`My name is ${this.name}, and I am ${this.age}.`);
    }

    haveBirthday() {
        this.age += 1;

        console.log(
            `Happy birthday, ${this.name}! Age is now ${this.age}.`
        );
    }
}

console.log("\n--- 3. Classes and instances ---");

const student1 = new Student("Rahul", 20);
const student2 = new Student("Aman", 22);

student1.introduce();
student2.introduce();

student1.haveBirthday();

console.log(student1.age); // 21
console.log(student2.age); // 22

/*
Each object has its own properties.

Changing student1.age does not change student2.age.
*/


// ============================================================
// 4. PROPERTIES VS METHODS
// ============================================================

/*
Property = Data associated with an object.
Method   = Action an object can perform.

Examples:
this.name       -> Property
this.balance    -> Property
deposit()       -> Method
showBalance()   -> Method
*/

class BankAccount {
    constructor(owner, startingBalance) {
        this.owner = owner;
        this.balance = startingBalance;
    }

    deposit(amount) {
        if (amount <= 0) {
            console.log("Deposit amount must be positive.");
            return;
        }

        this.balance += amount;

        console.log(`${this.owner} deposited ${amount}.`);
    }

    withdraw(amount) {
        if (amount <= 0) {
            console.log("Withdrawal amount must be positive.");
            return;
        }

        if (amount > this.balance) {
            console.log("Insufficient balance.");
            return;
        }

        this.balance -= amount;

        console.log(`${this.owner} withdrew ${amount}.`);
    }

    showBalance() {
        console.log(`${this.owner}'s balance: ${this.balance}`);
    }
}

console.log("\n--- 4. Properties and methods ---");

const account1 = new BankAccount("Neha", 1000);

account1.deposit(500);
account1.withdraw(200);
account1.showBalance(); // 1300


// ============================================================
// 5. THE THIS KEYWORD
// ============================================================

/*
In car1.accelerate(), this refers to car1.
In car2.accelerate(), this refers to car2.

JavaScript's this depends on how a function is called.

Arrow functions do not create their own this; they capture it from
the surrounding scope.
*/

class Car {
    constructor(brand, speed = 0) {
        this.brand = brand;
        this.speed = speed;
    }

    accelerate(amount) {
        this.speed += amount;

        console.log(`${this.brand} speed: ${this.speed}`);
    }
}

console.log("\n--- 5. this ---");

const car1 = new Car("BMW", 50);
const car2 = new Car("Audi", 80);

car1.accelerate(10); // BMW speed: 60
car2.accelerate(5);  // Audi speed: 85


// ============================================================
// 6. DEFAULT PARAMETERS AND VALIDATION
// ============================================================

/*
Default parameters provide a value when an argument is omitted.

Validation checks whether supplied data follows the class's rules.
*/

class Product {
    constructor(name, price = 0) {
        if (price < 0) {
            throw new Error("Price cannot be negative.");
        }

        this.name = name;
        this.price = price;
    }

    showProduct() {
        console.log(`${this.name}: ₹${this.price}`);
    }
}

console.log("\n--- 6. Defaults and validation ---");

const product1 = new Product("Notebook", 50);
const product2 = new Product("Pen");

product1.showProduct();
product2.showProduct();

// Uncomment to test:
// const invalidProduct = new Product("Broken product", -10);


// ============================================================
// 7. STATIC METHODS AND PROPERTIES
// ============================================================

/*
Static members belong to the class itself, not to each instance.

Call them using ClassName.methodName().
*/

class MathHelper {
    static description = "A small math utility";

    static add(a, b) {
        return a + b;
    }
}

console.log("\n--- 7. Static members ---");

console.log(MathHelper.description);
console.log(MathHelper.add(5, 3)); // 8

// Static methods are called on the class, not an instance.
// const helper = new MathHelper();
// helper.add(5, 3); // TypeError


// ============================================================
// 8. GETTERS AND SETTERS
// ============================================================

/*
Getter:
Reads a value using property-like syntax.

Setter:
Assigns a value and can validate it.

Use person.fullName, not person.fullName().
*/

class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set age(value) {
        if (value < 0) {
            throw new Error("Age cannot be negative.");
        }

        this._age = value;
    }

    get age() {
        return this._age;
    }
}

console.log("\n--- 8. Getters and setters ---");

const person1 = new Person("Riya", "Sharma", 24);

console.log(person1.fullName);
console.log(person1.age);

person1.age = 25;

console.log(person1.age);

// Uncomment to test:
// person1.age = -1;


// ============================================================
// 9. INHERITANCE AND SUPER
// ============================================================

/*
Inheritance allows a child class to reuse or specialize a parent class.

extends declares inheritance.
super() calls the parent constructor.

In a derived constructor, call super() before using this.
*/

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);

        this.breed = breed;
    }

    fetch() {
        console.log(`${this.name} is fetching the ball.`);
    }
}

console.log("\n--- 9. Inheritance ---");

const dog1 = new Dog("Bruno", "Labrador");

dog1.speak();
dog1.fetch();

console.log(dog1.breed);


// ============================================================
// 10. METHOD OVERRIDING
// ============================================================

/*
Method overriding occurs when a child class provides its own
implementation of a method inherited from its parent.
*/

class Cat extends Animal {
    speak() {
        console.log(`${this.name} says meow.`);
    }
}

console.log("\n--- 10. Method overriding ---");

const cat1 = new Cat("Milo");

cat1.speak();


// ============================================================
// 11. ENCAPSULATION AND PRIVATE FIELDS
// ============================================================

/*
Encapsulation controls access to an object's internal state.

JavaScript private fields begin with #.
They cannot be accessed directly outside their class.
*/

class SecureWallet {
    #balance;

    constructor(startingBalance = 0) {
        if (startingBalance < 0) {
            throw new Error("Starting balance cannot be negative.");
        }

        this.#balance = startingBalance;
    }

    addMoney(amount) {
        if (amount <= 0) {
            console.log("Amount must be positive.");
            return;
        }

        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

console.log("\n--- 11. Encapsulation ---");

const wallet = new SecureWallet(100);

wallet.addMoney(50);

console.log(wallet.getBalance()); // 150

// wallet.#balance; // SyntaxError outside the class


// ============================================================
// 12. COMPOSITION
// ============================================================

/*
Composition builds a larger object by combining smaller objects.
A Vehicle object can contain an Engine object.
*/

class Engine {
    start() {
        console.log("Engine started.");
    }
}

class Vehicle {
    constructor(brand, engine) {
        this.brand = brand;
        this.engine = engine;
    }

    startVehicle() {
        console.log(`${this.brand} is starting.`);

        this.engine.start();
    }
}

console.log("\n--- 12. Composition ---");

const engine1 = new Engine();
const vehicle1 = new Vehicle("Toyota", engine1);

vehicle1.startVehicle();


// ============================================================
// 13. INSTANCEOF AND OBJECT IDENTITY
// ============================================================

/*
instanceof checks whether a class's prototype appears in an object's
prototype chain.
*/

console.log("\n--- 13. instanceof ---");

console.log(dog1 instanceof Dog);    // true
console.log(dog1 instanceof Animal); // true
console.log(dog1 instanceof Car);    // false

const objectA = { score: 10 };
const objectB = { score: 10 };
const objectC = objectA;

console.log(objectA === objectB); // false
console.log(objectA === objectC); // true


// ============================================================
// 14. OBJECT REFERENCES
// ============================================================

/*
Assigning an object to another variable copies its reference,
not an independent object.
*/

console.log("\n--- 14. Object references ---");

const original = { city: "Bhopal" };

const referenceCopy = original;
referenceCopy.city = "Indore";

console.log(original.city); // Indore

// A shallow copy creates a new outer object.
const shallowCopy = { ...original };

shallowCopy.city = "Delhi";

console.log(original.city);    // Indore
console.log(shallowCopy.city); // Delhi

/*
Spread syntax makes a shallow copy. Nested objects may still be shared.
*/


// ============================================================
// 15. COMMON MISTAKES
// ============================================================

/*
1. Forgetting new:

   Incorrect:
   const s = Student("Rahul", 20);

   Correct:
   const s = new Student("Rahul", 20);


2. Forgetting this:

   Incorrect:
   introduce() {
       console.log(name);
   }

   Correct:
   introduce() {
       console.log(this.name);
   }


3. Method reference vs method call:

   student1.introduce;   // Function reference
   student1.introduce(); // Calls the function


4. Forgetting super():

   A derived class must call super() before using this.


5. Object assignment doesn't create an independent copy.


6. Static methods are accessed through the class.
*/


// ============================================================
// 16. PYTHON VS JAVASCRIPT OOP COMPARISON
// ============================================================

/*
The Python snippets below are comments for comparison.
They are not executed by JavaScript.
*/


// ------------------------------------------------------------
// A. CLASS AND OBJECT CREATION
// ------------------------------------------------------------

/*
PYTHON:

class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"My name is {self.name}, age {self.age}")

s1 = Student("Rahul", 20)
s1.introduce()


JAVASCRIPT:

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`My name is ${this.name}, age ${this.age}`);
    }
}

const s1 = new Student("Rahul", 20);
s1.introduce();


KEY DIFFERENCES:

Python initializer:       __init__()
JavaScript initializer:   constructor()

Python instance reference: self
JavaScript instance reference: this

Python object creation:   Student(...)
JavaScript object creation: new Student(...)
*/


// ------------------------------------------------------------
// B. self VS this
// ------------------------------------------------------------

/*
PYTHON:

class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(self.name, "says woof")

dog = Dog("Bruno")
dog.bark()


JAVASCRIPT:

class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(this.name, "says woof");
    }
}

const dog = new Dog("Bruno");
dog.bark();


Both output:
Bruno says woof


IMPORTANT DIFFERENCES:

1. Python explicitly writes self as the first instance-method parameter.
2. JavaScript uses this, which is a special keyword, not a parameter.
3. Python automatically binds self when an instance method is accessed.
4. JavaScript this generally depends on how the function is called.

Example JavaScript binding issue:

const sayBark = dog.bark;
// sayBark(); // In strict mode, this is undefined and this.name fails.

Preserve the binding:

const safeBark = dog.bark.bind(dog);
safeBark();
*/


// ------------------------------------------------------------
// C. INSTANCE PROPERTIES AND METHODS
// ------------------------------------------------------------

/*
PYTHON:

class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

counter = Counter()
counter.increment()
print(counter.count)  # 1


JAVASCRIPT:

class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count += 1;
    }
}

const counter = new Counter();
counter.increment();
console.log(counter.count); // 1
*/


// ------------------------------------------------------------
// D. INHERITANCE AND PARENT CONSTRUCTOR
// ------------------------------------------------------------

/*
PYTHON:

class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(self.name, "makes a sound")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

dog = Dog("Bruno", "Labrador")
dog.speak()


JAVASCRIPT:

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(this.name, "makes a sound");
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}

const dog = new Dog("Bruno", "Labrador");
dog.speak();


COMPARISON:

Python:
class Dog(Animal)

JavaScript:
class Dog extends Animal

Python parent constructor:
super().__init__(name)

JavaScript parent constructor:
super(name)
*/


// ------------------------------------------------------------
// E. METHOD OVERRIDING
// ------------------------------------------------------------

/*
PYTHON:

class Animal:
    def speak(self):
        print("Some sound")

class Cat(Animal):
    def speak(self):
        print("Meow")

Cat().speak()


JAVASCRIPT:

class Animal {
    speak() {
        console.log("Some sound");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Meow");
    }
}

new Cat().speak();

Both allow a child class to replace an inherited method implementation.
*/


// ------------------------------------------------------------
// F. STATIC METHODS
// ------------------------------------------------------------

/*
PYTHON:

class MathHelper:
    @staticmethod
    def add(a, b):
        return a + b

print(MathHelper.add(2, 3))


JAVASCRIPT:

class MathHelper {
    static add(a, b) {
        return a + b;
    }
}

console.log(MathHelper.add(2, 3));

Python uses @staticmethod.
JavaScript uses the static keyword.
*/


// ------------------------------------------------------------
// G. GETTERS AND SETTERS
// ------------------------------------------------------------

/*
PYTHON:

class Person:
    def __init__(self, age):
        self._age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

person = Person(20)
print(person.age)
person.age = 21


JAVASCRIPT:

class Person {
    constructor(age) {
        this.age = age;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        if (value < 0) {
            throw new Error("Age cannot be negative");
        }
        this._age = value;
    }
}

const person = new Person(20);
console.log(person.age);
person.age = 21;

Both support property-like access with validation.
*/


// ------------------------------------------------------------
// H. ENCAPSULATION AND PRIVATE DATA
// ------------------------------------------------------------

/*
PYTHON:

A leading underscore, such as self._balance, conventionally marks
an internal attribute. It does not enforce strict privacy.

JAVASCRIPT:

class Wallet {
    #balance = 0;

    add(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }

    getBalance() {
        return this.#balance;
    }
}

const wallet = new Wallet();
wallet.add(50);
console.log(wallet.getBalance());

JavaScript #private fields are enforced by the language and cannot
be accessed directly outside their declaring class.
*/


// ------------------------------------------------------------
// I. CLASS PROPERTIES VS INSTANCE PROPERTIES
// ------------------------------------------------------------

/*
PYTHON:

class Example:
    category = "demo"  # Class attribute

    def __init__(self, name):
        self.name = name  # Instance attribute


JAVASCRIPT:

class Example {
    static category = "demo";

    constructor(name) {
        this.name = name;
    }
}

Python class attributes and JavaScript static properties are related
ideas, but their lookup and inheritance rules are not identical.
*/


// ------------------------------------------------------------
// J. QUICK COMPARISON TABLE
// ------------------------------------------------------------

/*
Concept                  Python                  JavaScript

Class                    class Student:          class Student {}
Initializer              __init__()              constructor()
Instance reference       self                    this
Create instance          Student("Rahul")        new Student("Rahul")
Inheritance              class Dog(Animal)       class Dog extends Animal
Parent constructor       super().__init__(...)   super(...)
Static method            @staticmethod           static methodName()
Getter                   @property               get propertyName()
Setter                   @propertyName.setter    set propertyName()
Private field            _name is convention     #name is private field
Print output             print(value)             console.log(value)

These are conceptual comparisons. Python and JavaScript have different
object models, so their features are not always exact equivalents.
*/


// ============================================================
// 17. QUICK REVISION
// ============================================================

/*
CLASS:
Blueprint for creating instances.

OBJECT:
A value grouping related properties and methods.

INSTANCE:
An object created from a class.

CONSTRUCTOR:
Initializes a new instance.

PROPERTY:
Data stored on an object.

METHOD:
Function associated with a class or object.

THIS:
In these regular method calls, refers to the current instance.

NEW:
Creates an instance from a class.

STATIC:
Member accessed on the class itself.

GETTER:
Reads a value with property-like syntax.

SETTER:
Assigns a value, potentially with validation.

INHERITANCE:
Child class reuses or specializes a parent using extends.

SUPER:
Calls the parent constructor or accesses parent methods.

OVERRIDING:
Child provides its own implementation of a parent method.

ENCAPSULATION:
Controls access to internal state.

COMPOSITION:
Builds an object using other objects.
*/


// ============================================================
// 18. PRACTICE EXERCISES
// ============================================================

/*
EXERCISE 1:
Create an Employee class with:
- name and salary properties
- showDetails() method
Create two employee instances and print their details.


EXERCISE 2:
Create a Rectangle class with width and height.
Add getArea() that returns width * height.


EXERCISE 3:
Create a Counter class:
- count starts at 0
- increment()
- decrement()
- showCount()


EXERCISE 4:
Create SavingsAccount extending BankAccount.
Add interestRate and a method calculating:
interest = balance * interestRate / 100


EXERCISE 5:
Create a Product class with a private #price field.
Add a getter and setter that reject negative prices.


EXERCISE 6:
Explain:
- Class vs object
- Property vs method
- Instance method vs static method
- Inheritance vs composition
- Copying a primitive vs copying an object reference
*/


// ============================================================
// 19. PYTHON VS JAVASCRIPT OOP — SELF-TEST
// ============================================================

/*
Try answering without looking at the comparison section.

1. What is the JavaScript equivalent of Python's __init__()?
2. What is similar about Python self and JavaScript this?
3. Why can JavaScript this behave differently if a method is detached?
4. How do you inherit from Animal in Python? How in JavaScript?
5. What does super() do in a child-class constructor?
6. Difference between Python's _balance and JavaScript's #balance?
7. How do you declare a static method in each language?
8. How is object creation different in Python and JavaScript?

ANSWERS:

1. constructor()
2. Both let instance methods access the current object's data.
3. JavaScript this generally depends on how the function is called.
4. Python: class Dog(Animal)
   JavaScript: class Dog extends Animal
5. Calls the parent constructor or accesses parent methods.
6. Python underscore is convention; JavaScript # fields are private.
7. Python: @staticmethod
   JavaScript: static methodName() {}
8. Python: Student(...)
   JavaScript: new Student(...)
*/

console.log("\nRevision file executed successfully.");