// Calculator Operations:

const add = function(a,b) {
    return a + b;
};

const subtract = function(a,b){
    return a - b;
};

const multiply = function(a,b){
    return a * b;
};

const divide = function(a,b){
    if (!b){
        return "DIVIDE BY ZERO ERROR";
    }  else {
    return a / b;
}
};

// Mini Tests
console.log(add(1,1));
console.log(subtract(-3,1));
console.log(multiply(0,0));
console.log(multiply(0,1));
console.log(multiply(90,2));
console.log(divide(1,0));
console.log(divide(0,1));
console.log(divide(2,9));


const operate = function(a,b,func){
    return func(a,b)
};

// Do not edit below this line
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide,
//     operate
//   };
  