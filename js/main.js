function startScreen(...callbackFunction){
    callbackFunction.forEach(func => func());
}