function validator(input){
    let message;
    let success;

    if (input.length < 7){
        message = "Password is too short!";
        success = false;
        return [success , message]
    }

    if(input.indexOf(' ') !== -1){
        message = "Password cannot contain spaces!";
        success = false;
        return [success , message]
    }

    
    if (!/[a-zA-Z]/.test(input)){
        message = "Password must contain letters!";
        success = false;
        return [success , message]
    }

    if (!/[0-9]/.test(input)){
        message = "Password must contain numbers!";
        success = false;
        return [success , message]
    }

    return [true , null];

}
module.exports = validator;