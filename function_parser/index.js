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