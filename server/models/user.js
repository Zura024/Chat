class User {
    constructor() {
        this.users = [];
    }

    add(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    get(id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    remove(id) {
        let user = this.get(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user;
    }


    getNameList(room) {
        return this.users.filter((user) => user.room === room).map((user) => user.name);
    }
}


module.exports = {User};