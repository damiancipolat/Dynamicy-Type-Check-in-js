<img src="https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/doc/js-logo.png?raw=true" width="100px" align="right" />

# Dynamic type check techniques
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
The example continue in this file https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/techniques/using_assert.js

### 2) Custom validators
In this case I show you an example of how we can create an extensible enumerable with the validations of the types of data we need. Only valid primitive types here.

The idea is to use ASSERT as in point 1 to throw an exception when the rule is not met. We will create a structure in which the types of data that we will use will go as attributes, each one is a function that knows how to validate if the last parameter complies with this type of data or not.

```js
const assert = require('assert');

//Declare our custom type enum with his custom type validators, this could be extended if you want.
const types = {
  NUMBER: (data)=>(typeof data)==='number'&&!isNaN(data),
  STRING: (data)=>(typeof data)==='string',
  DATE:   (data)=>(typeof data)==='date',
  BOOL:   (data)=>(typeof data)==='boolean',
  OBJECT: (data)=>(typeof data)==='object'
};

//This function handle the variable assignation if this is succed return the value if fail throw exception.
const matchType = (value,validator)=>validator(value)?value:assert(false,'INVALID TYPE ASSIGNATION');

/*
  How to use this in a function?
*/
const calcSalary = (baseValue, extraHsValue, workedHs,extraHs)=>{

  const salary = matchType(baseValue*workedHs,types.NUMBER);
  const extras = matchType(extraHsValue*extraHs,types.NUMBER);
  const total  = salary+extras;

  return total;

}

console.log('TEST 1 calc with rigth values, result:',calcSalary(100,150,300,50));
```
The example continue in this file https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/techniques/check_vars.js

### 3) Function decorator
The idea here is to mix point 1 and 2 in a function decorator, which dynamically extends a new function that mixes its normal behavior with an aggregate of data type validation.

In this case I aim to create a security layer for existing functions, in which we can ensure that at the time of execution, the type check is first performed and if it fails not to continue with the execution.

**How to decorate a function?**
With something like that:

```js
const decorate = (types) => (fn)=>(...args)=>{

  //...Do something with the types...
  
  //Run the parameter function
  return fn(...args);

}

//Test function.
const hello = (name)=>console.log('Hello',name);

//Crate a new function.
const newTest = decorate(['string'],hello);

//Run the new function.
newTest('Damian');

```

**Ok now that we have seen this concept, we review the higher order function?**
A higher order function is a function that takes a function as an argument, or returns a function . Higher order function is in contrast to first order functions, which don't take a function as an argument or return a function as output

```js
const assert = require('assert');

//Declare our custom type enum with his custom type validators, this could be extended if you want.
const types = {
  NUMBER: (data)=>(typeof data)==='number'&&!isNaN(data),
  STRING: (data)=>(typeof data)==='string',
  DATE:   (data)=>(typeof data)==='date',
  BOOL:   (data)=>(typeof data)==='boolean',
  OBJECT: (data)=>(typeof data)==='object'
};

//This function handle the variable assignation if this is succed return the value if fail throw exception.
const matchType = (value,validator)=>validator(value)?value:assert(false,'INVALID TYPE ASSIGNATION');

/*
  How to use this in a function?
*/
const calcSalary = (baseValue, extraHsValue, workedHs,extraHs)=>{

  const salary = matchType(baseValue*workedHs,types.NUMBER);
  const extras = matchType(extraHsValue*extraHs,types.NUMBER);
  const total  = salary+extras;

  return total;

}

console.log('TEST 1 calc with rigth values, result:',calcSalary(100,150,300,50));
```
The example continue in this file https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/techniques/check_vars.js
