<img src="https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/doc/js-logo.png?raw=true" width="100px" align="right" />

# Use Joi
In this file I will show you how to use this module to make type check, but using a third party code.

### What is Joi?
The most powerful schema description language and data validator for JavaScript.
joi is part of the hapi ecosystem and was designed to work seamlessly with the hapi web framework and its other components (but works great on its own or with other frameworks).

Download it in: https://www.npmjs.com/package/@hapi/joi

### How to use?
In the npm page is very good explained, and there are some interesting links 
in internet.

- https://medium.com/@rossbulat/joi-for-node-exploring-javascript-object-schema-validation-50dd4b8e1b0fhttps://medium.com/@rossbulat/joi-for-node-exploring-javascript-object-schema-validation-50dd4b8e1b0f
- https://scotch.io/tutorials/node-api-schema-validation-with-joi
- http://zetcode.com/javascript/hapijoi/


```js
//Include joi module.
const Joi    = require('@hapi/joi');
const assert = require('assert');

//CLIENT schema.
const clientSchema = Joi.object().keys({
    username: Joi.string(),
    surname: Joi.string(),
    age: Joi.number(),
    email: Joi.string().email()
});

//BLOG Schema, object + object arrays.
const blogPostSchema = Joi.object().keys({ 
  title: Joi.string(),
  description: Joi.string(), 
  comments: Joi.array().items(Joi.object().keys({ 
    description: Joi.string(), 
    author: Joi.string().required(), 
    grade: Joi.number().min(1).max(5) 
  }))
});

//PET SCHEMA - nested object.
const petSchema = Joi.object().keys({ 
  name: Joi.string().alphanum().min(3).max(30).required(),
  colour: Joi.string(),
  owner: clientSchema
});

//Function params.
const fnSchema = Joi.object().keys({ 
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  age: Joi.number()
});

//Client test
const client = { 
  username:'Damian',
  surname:'Cipolat',
  age:32,
  email:'damian.cipolat@gmail.com'
};

//BLOG test
const post = {
  title:'hello js dev',
  description:'This is a js example of how to use joi.',
  comments:[
    {description:'test 1234', author:'Bart simpson',grade:2},
    {description:'test 1234', author:'Marge simpson',grade:1},
    {description:'test 1234', author:'Homer simpson',grade:3},
  ]
}

//Pet test.
const pet = {
  name:'kikito',
  colour:'red',
  owner:client
};

//Validate CLIENT object.
let result = clientSchema.validate(client);

if (result.error)
  console.log('CLIENT Error',result.error);
else
  console.log('CLIENT Data',result.value);

//Validate POST object.
result = blogPostSchema.validate(post);

if (result.error)
  console.log('POST Error',result.error);
else
  console.log('POST Data',result.value);

//Validate PET object.
result = petSchema.validate(pet);

if (result.error)
  console.log('PET Error',result.error);
else
  console.log('PET Data',result.value);
```

### How to use joi to create a type protection layer?
Take a look of the next code:

```js
//Include modules.
const Joi    = require('@hapi/joi');
const assert = require('assert');

//USE JOI with a function to validate parameters.
const testFunction = (name,email,age)=>{

  //Validate call parameters.
  assert(!(fnSchema.validate({name,email,age}).error),'Type call error format');
    
  console.log('TEST FUNCTION .....');

}

//Run function.
testFunction('susan','aaa@getnada.com',31);
```