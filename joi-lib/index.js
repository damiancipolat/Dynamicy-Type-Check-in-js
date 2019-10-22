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

//USE JOI with a function to validate parameters.
const testFunction = (name,email,age)=>{

  //Validate call parameters.
  assert(!(fnSchema.validate({name,email,age}).error),'Type call error format');
    
  console.log('TEST FUNCTION .....');

}

//Run function.
testFunction('susan','aaa@getnada.com',31);