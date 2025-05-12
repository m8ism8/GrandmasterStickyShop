class User {
    constructor(username, password, isSeller = false) {
        this.username = username;
        this.password = password;
        this.isSeller = isSeller;
    }

    static fromJSON(json) {
        return new User(
            json.username,
            json.password,
            json.isSeller
        );
    }

    toJSON() {
        return {
            username: this.username,
            password: this.password,
            isSeller: this.isSeller
        };
    }
}

export default User; 