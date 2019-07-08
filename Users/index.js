class Users {
   constructor() {
      this.users = [];
   }

   addUser(name) {
      if (this.users.indexOf(name) === -1) {
         this.users.push(name);
      }
   }
   deleteUser(name) {
      const index = this.users.indexOf(name);
      if (index !== -1) this.users = this.users.splice(index + 1, 1);
   }
   getUsers() {
      return this.users;
   }
}

module.exports = new Users();
