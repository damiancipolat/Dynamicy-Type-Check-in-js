const {
  functionT
} = require('./functionT.js');

//Tests functions.
const sayHello = (str_name,str_surname,int_age) => console.log('Hello',str_name,',',str_name,' age ',int_age);

//Calcular impuesto.
const calcTaxes = (int_base,int_tax)=> (int_base*int_tax)/0.21;

//Decorate the function to add a type layer.
const sayHelloT  = functionT(sayHello);
const calcTaxesT = functionT(calcTaxes);

//Test the new functions.

//1
sayHelloT('Damian','Cipolat',31);     //ok
sayHelloT('Damian','Cipolat','XXX');  //error

//2
calcTaxesT(1000,31);    //ok
calcTaxesT(1000,'XXX'); //error
