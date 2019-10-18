# Dynamic type validation techniques
In this file I show several ways to do dynamic type check only using Javascript.

#### What is Dynamic type checking?
Dynamic type checking is the process of verifying the type safety of a program at runtime. Implementations of dynamically type-checked languages generally associate each runtime object with a type tag (i.e., a reference to a type) containing its type information.

- So we know that in JS don't exists Type checking, and make STATIC type check maybe is'nt the best idea.

I am going to show you **three** different ways of how to do this, some are simpler than others but you will surely understand all of them.

### 1) Assert + Typeof
We will use the typeof function and the nodejs native module ASSERT(https://nodejs.org/api/assert.html).

The idea is to use typeof to validate the content of a variable's primitives vs a parameter that is the type with which we are going to compare. We will use ASSERT to generate an exception that interrupts the normal flow of execution in the scope where the script is executed.

```js
//Include assert.
const assert = require('assert');

//Define datatype constants, to basic js primitive types.
const NUMBER = 'number';
const STRING = 'string';
const DATE   = 'date';
const BOOL   = 'boolean';
const OBJECT = 'object';

//I have created a basic function to avoid use the typeof many times.
const matchType = (data,type) => typeof data===type;

//NUMBER - success
assert(matchType(money,NUMBER),'Bad number format');

//NUMBER - throw exception
assert(matchType(name,NUMBER),'Bad number format');
```
