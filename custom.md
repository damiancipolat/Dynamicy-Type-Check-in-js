<img src="https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/doc/js-logo.png?raw=true" width="100px" align="right" />

# Custom function parser
I have created a function parser module, that receive a function, extract the parameters names, and match
vs a type enumerator, finding if the value of some parameter dont match with the defined type in the function variable name.

#### How to use?
Take a look at this code:

```js
const {
  functionT
} = require('./functionT.js');

//Tests functions.
const sayHello = (str_name,str_surname,int_age) => console.log('Hello',str_name,',',str_name,' age ',int_age);

//Calculate taxes.
const calcTaxes = (int_base,int_tax)=> (int_base*int_tax)/0.21;

//Test function.
const findDate = (str_name,int_age,bool_married)=>{

  if (!bool_married)
    console.log('Error cant find a date to a married user');
  else
    console.log('Finding... for profile',str_name,int_age,bool_married);

}

//Decorate the function to add a type layer.
const sayHelloT  = functionT(sayHello);
const calcTaxesT = functionT(calcTaxes);
const findDateT  = functionT(findDate);

//Test the new functions.

//1
sayHelloT('Damian','Cipolat',31);     //ok
sayHelloT('Damian','Cipolat','XXX');  //error

//2
calcTaxesT(1000,31);    //ok
calcTaxesT(1000,'XXX'); //error

//3
findDateT('Damian',31,true);    //ok
findDateT('Damian',31,false);   //ok
findDateT(222222,31,'DDDD');    //error
```
To see the module source code, you and take a look at this file: https://github.com/damiancipolat/Dynamicy-Type-Check-in-js/blob/master/function_parser/functionT.js

  The idea of this code is to create a function parameters parse to make an automatic type check
  in runtime. The code use the "variable_name" to detect the data type.

  Example:
    str_name       - validate a string.
    int_age        - validate a integer.
    bool_married   - validate a boolean.
    date_birthdate - validate a js date.
  
  Code:
    function test(str_name,int_age,bool_married,date_birthdate){

### EXTEND type system.
This is a work in progress, i will continue improving this module, if you want you can extend the type enumerator with
custom validators.

```js
//TYPE ENUMERATOR.
const types = [
  {
    type:'integer',
    prefix:'int_',
    validator: (data)=>(typeof data)==='number'&&!isNaN(data)
  },
  {
    type:'string',    
    prefix:'str_',
    validator:(data)=>(typeof data)==='string'
  },
  {
    type:'date',    
    prefix:'date_',
    validator:(data)=>(typeof data)==='date'
  },
  {
    type:'boolean',
    prefix:'bool_',
    validator:(data)=>(typeof data)==='boolean'
  },
  {
    type:'object',
    prefix:'obj_',
    validator: (data)=>(typeof data)==='object'
  }
];
```
