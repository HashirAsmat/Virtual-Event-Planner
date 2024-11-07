//this is user to filter data and send some specific data, not whole user object - DTO concept
class UserDTO{
    constructor(user){
        this._id= user.id;
        this.name=user.username;
        this.email=user.email;

    }
}

module.exports = UserDTO;