/*
  Objetive:
  Create a superior order function, that receive a function and the typelist to apply the validation,
  returning a new function that could be used and in each call the function will validate the parameters.
*/

//VALIDATIONS

//TYPE ENUMERATOR.
const types = {
  NUMBER: (data)=>(typeof data)==='number'&&!isNaN(data),
  STRING: (data)=>(typeof data)==='string',
  DATE:   (data)=>(typeof data)==='date',
  BOOL:   (data)=>(typeof data)==='boolean',
  OBJECT: (data)=>(typeof data)==='object'
};

//Parameter type validator.
const validate = (types,args)=>{

  if (types.length!=args.length)
    throw new Error('Type array and parameter length dont match');

  const matchAll = types.every((typeFn,i)=>typeFn(args[i]));

  if (!matchAll)
    throw new Error('Error in parameter validation',args,Object.keys(types));

  return true;

}

//Decorator function receive a type list and a function to process.
const decorate = (types) => (fn)=>(...args)=>{

  validate(types,args);  
  return fn(...args);

}

//TEST

//Business logic function.
const calculateTaxes = (baseAmmount,workedHs,extraHs) => (baseAmmount*workedHs)+((extraHs/2)*baseAmmount);

//Decorate business function with a dynamic type check LAYER.
const typedTaxesFn = decorate([
  types.NUMBER,
  types.NUMBER,
  types.NUMBER
])(calculateTaxes);

//Execute the function using the new layers.
console.log('TAXES',typedTaxesFn(1000,20,10));