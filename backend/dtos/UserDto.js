export class UserDto {
        
    constructor(userModel) {
        this._id = userModel._id
        this.name = userModel.name
        this.email = userModel.email
        this.isAdmin = userModel.isAdmin
    }
}