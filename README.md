1. What is the difference between var, let, and const?
var
i. Function Scope
ii. Reassignable
iii. Redeclarable
iv. Hoisted

let
i. Block Scope
ii. Reassignable
iii. Not Redeclarable
iv. Hoisted but in TDZ (Temporal Dead Zone)

const
i. Block Scope
ii. Not Reassignable
iii. Not Redeclarable
iv. Hoisted but in TDZ (Temporal Dead Zone)

2. What is the Spread Operator (...)
The spread operator (...) expands elements of an array or object.
Common Uses :
i. Copy arrays
ii. Merge arrays
iii. Copy objects
iv. Add new properties

Example :
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
console.log(newNumbers);
Output : [1, 2, 3, 4, 5]

3. Difference between map(), filter(), and forEach()
map()
i. Creates a new array by transforming elements
ii. Return a new array
Example :
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
Output : [2, 4, 6]

filter()
i. Creates a new array based on a condition
ii. Return a new array
Example : 
const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);
console.log(even);
Output : [2, 4]

forEach()
i. Loops through elements
ii. Return nothing
Example : 
const numbers = [1, 2, 3];
numbers.forEach(num => {
  console.log(num);
});

4. What is an Arrow Function
i. An arrow function is a shorter syntax for writing functions in JavaScript.
ii. Benefits :
  a. Shorter syntax
  b. Cleaner code
  c. Commonly used in modern JavaScript and React

Example :
const add = (a, b) => a + b;

5. What are Template Literals
Template literals allow you to insert variables inside strings using backticks (` `).
Advantages :
  i. Insert variables easily
  ii. Multi-line strings
  iii. Dynamic string creation

Example :
const name = "Nasim";
const age = 25;
const message = `My name is ${name} and I am ${age} years old`;
console.log(message);

Output : My name is Nasim and I am 25 years old
   