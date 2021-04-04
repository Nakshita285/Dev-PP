// high order function

function firstName(name){
    // ["ABCD", "EFGH"]
    //      0,  1
    console.log(name[0]);

}

function lastName(name){
    // ["ABCD", "EFGH"]
    //      0       1
    console.log(name[1]);

}
function spliting(fullName, fun){
    // ABCD EFGH
    // return ["ABCD", "EFGH"]

    let name = fullName.split(" ");
    let requiredName = fun(name);

}

function sayHii(fullName, fun){
    // "Nakshita Malhotra", firstName
    spliting(fullName, fun);    
}

sayHii("Nakshita Malhotra", firstName);
sayHii("Tony Stark", lastName);


