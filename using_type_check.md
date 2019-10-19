<img src="https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/doc/js-logo.png?raw=true" width="100px" align="right" />

# Use type-check
In this file I will show you how to use this module to make type check, but using a third party code.

## What is type-check?
type-check is a library which allows you to check the types of JavaScript values at runtime with a Haskell like type syntax. It is great for checking external input, for testing, or even for adding a bit of safety to your internal code. It is a major component of levn.

Download it in: https://www.npmjs.com/package/type-check

## How to use?
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
