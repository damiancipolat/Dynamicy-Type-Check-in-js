<img src="https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/doc/js-logo.png?raw=true" width="100px" align="right" />

# Use type-check
In this file I will show you how to use this module to make type check, but using a third party code.

### What is type-check?
type-check is a library which allows you to check the types of JavaScript values at runtime with a Haskell like type syntax. It is great for checking external input, for testing, or even for adding a bit of safety to your internal code. It is a major component of levn.

Download it in: https://www.npmjs.com/package/type-check

### How to use?
In the npm page is very good explained, a single summary could be:

```js
// Basic types:
const typeCheck = require('type-check').typeCheck;

typeCheck('Number', 1);               // true
typeCheck('Number', 'str');           // false
typeCheck('Error', new Error);        // true
typeCheck('Undefined', undefined);    // true
 
// Comment
typeCheck('count::Number', 1);        // true
 
// One type OR another type:
typeCheck('Number | String', 2);      // true
typeCheck('Number | String', 'str');  // true
 
// Wildcard, matches all types:
typeCheck('*', 2) // true
 
// Array, all elements of a single type:
typeCheck('[Number]', [1, 2, 3]);                // true
typeCheck('[Number]', [1, 'str', 3]);            // false
 
// Tuples, or fixed length arrays with elements of different types:
typeCheck('(String, Number)', ['str', 2]);       // true
typeCheck('(String, Number)', ['str']);          // false
typeCheck('(String, Number)', ['str', 2, 5]);    // false
```

### How to mix in our code?
It's easy goto the file https://github.com/damiancipolat/Dynamicy-Type-Check-in-js/blob/master/typecheck-lib/index.js and take a look of the source code.

```js
// Basic types:
const typeCheck = require('type-check').typeCheck;
const assert    = require('assert');

//1) VALIDATE TYPE PARAMETERS BEFORE START THE FUNCTION.

//Using some asserts.
const requestLoan = (name,surname,age,ammount,email,phone)=>{

  assert(typeCheck('String', name));
  assert(typeCheck('String', name));
  assert(typeCheck('String', surname));
  assert(typeCheck('Number', age));
  assert(typeCheck('Number', ammount));
  assert(typeCheck('String', email));
  assert(typeCheck('String', phone));

  //Do something....
  console.log('11111111111111111111');

}
```
