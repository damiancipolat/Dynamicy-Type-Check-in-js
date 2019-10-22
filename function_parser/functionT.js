/*

  The idea of this code is to create a function parameters parse to make an automatic type check
  in runtime. The code use the "variable_name" to detect the data type.

  Example:
    str_name       - validate a string.
    int_age        - validate a integer.
    bool_married   - validate a boolean.
    date_birthdate - validate a js date.
  
  Code:
    function test(str_name,int_age,bool_married,date_birthdate){}
 
*/

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
  
//Regex constants.
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
  
/*
  Get function parameters variable name.
  params:
    fn: function variable.
  returns:
    array
*/
const getParamNames = (func)=>{

  const fnStr  = func.toString().replace(STRIP_COMMENTS, '');
  const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

  return (result === null)?[]:result;

}

/*
  Validator the list of param name and the values.
  params:
    params: array of string,
    args: vallue array
  returns:
    [{check structure}]
*/
const validateCall = (fn,args)=>{

  //Get parameter names as an array.
  const paramNames = getParamNames(fn);

  //Scan each parameter.
  const result = paramNames.map((param,i)=>{
    
    //Check type.
    const typeCheck = types.find(typeTmp=>param.startsWith(typeTmp.prefix));

    return {
      param,
      value: args[i],
      iX:i,
      type: typeCheck?typeCheck.type:undefined,
      match: typeCheck?typeCheck.validator(args[i]):false
    };

  });

  //If there an error with the validation.
  const failed = result.filter(resu=>resu.match==false);

  if (failed.length>0)
    throw {error:'Type check error',result:failed};
  else
    return true;
}


//A function decorator, that receive a function and make the type-check analysis.
const functionT = (fn)=>(...args)=>{

  //Validate execution
  validateCall(fn,{...args});

  //Run the function after make a type validation.
  return fn(...args);

}

module.exports = {
  functionT
};
