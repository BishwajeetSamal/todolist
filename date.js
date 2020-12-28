//jshint esversion:6

//over here we can use "module.exports" or only  "exports.function name"
 exports.getDate = function getDate(){ 


    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return  today.toLocaleDateString("en-US", options);
    

}