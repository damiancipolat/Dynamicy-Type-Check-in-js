/*
  Objetive: 
  Validate data type using assert and typeof in a single js script,
  we don't use any framework or lib all 100% vanilla js.
*/

const assert = require('assert');

//Define some values.
const money = 100.20;
const name  = 'Damian';
const today = new Date();
const apply = true;
const dog   = {name:'damian',surname:'cipolat'};

//Define datatype constants, to basic js primitive types.
const NUMBER = 'number';
const STRING = 'string';
const DATE   = 'date';
const BOOL   = 'boolean';
const OBJECT = 'object';

//I have created a basic function to avoid use the typeof many times.
const matchType = (data,type) => typeof data===type;

/*
  How to use assert with typeof througt matchType function?
*/

//NUMBER - ok
assert(matchType(money,NUMBER),'Bad number format');

//NUMBER - error
assert(matchType(name,NUMBER),'Bad number format');

//STRING - ok
assert(matchType(name,STRING),'Bad string format');

//STRING - error
assert(matchType(name,STRING),'Bad string format');

//BOOLEAN - ok
assert(matchType(apply,BOOL),'Bad boolean format');

//BOOLEAN - error
assert(matchType(name,BOOL),'Bad boolean format');

//DATE - ok
assert(matchType(today,DATE),'Bad date format');

//DATE - error
assert(matchType(name,DATE),'Bad date format');

//OBJECT - ok
assert(matchType(dog,OBJECT),'Bad object format');

//OBJECT - error
assert(matchType(name,OBJECT),'Bad object format');

/*
  How to validate function type parameters into a function?
*/

const newLoan = (accountId,name,surname,email,ammount) =>{

  console.log(accountId,name,surname,email,ammount);

  //Add a validation lines before start the function-
  assert(matchType(accountId,NUMBER),'Bad number format');
  assert(matchType(name,STRING),'Bad string format');
  assert(matchType(surname,STRING),'Bad string format');
  assert(matchType(email,STRING),'Bad string format');
  assert(matchType(ammount,NUMBER),'Bad number format');

  console.log('Type validation OK!');
  console.log('todo......');

}

//Function call ok
newLoan(10011,'Damian','Cipolat','damian.cipolat@gmail.com',200000);

//Function call with errors
newLoan(10011,'Damian','Cipolat','damian.cipolat@gmail.com','2222222');

/*
  How to validate type variable in the middle of a function?
*/
const newLoan2 = (accountId,name,surname,email,ammount) =>{

  const formId = accountId+10;

  //Validate if the variable have the rigth format.
  assert(matchType(formId,NUMBER),'Bad number format');
  
  console.log('todo......');

}

//Function call ok
newLoan2(10011,'Damian','Cipolat','damian.cipolat@gmail.com',200000);

//Function call with errors
newLoan2('wwwww','Damian','Cipolat','damian.cipolat@gmail.com',33333333);
