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

//Using only one assert.
const requestLoan = (name,surname,age,ammount,email,phone)=>{

  [
    typeCheck('String', name),
    typeCheck('String', name),
    typeCheck('String', surname),
    typeCheck('Number', age),
    typeCheck('Number', ammount),
    typeCheck('String', email),
    typeCheck('String', phone)
  ].every(valid=>valid===true)?true:assert(false,'Error produced in parameters types');

  //Do something....
  console.log('11111111111111111111');

}

//Test
requestLoan('a','v',1,3,'damian.cipolat@gmail.com','15667382');

//2) VALIDATE PARAMETERS USING A DECORATOR.
const requestLoan2 = (name,surname,age,ammount,email,phone)=>{

  //Do something...
  console.log('->',name,surname,age,ammount,email,phone);

}

//Decorator handler.
const decorateType = (types) => (fn) => (...args) => {

  //Loop one to one validating types vs args.
  types.map((type,i)=>typeCheck(type,args[i])).every(valid=>valid===true)?true:assert(false,'TYPE ERROR');

  //Run the function.
  return fn(...args);

}

//Return a new decorated function that include a type check layer.
const requestLoanDecorated = decorateType(['String','String','String','Number','Number','String','String'])(requestLoan2);

//TEST
requestLoanDecorated('a','v',1,3,'damian.cipolat@gmail.com','15667382');