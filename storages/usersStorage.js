class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }
  addUser({ firstName, lastName, age, email, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, age, email, bio };
    this.id++;
  }
  getUsers() {
    return Object.values(this.storage);
  }
  getUser(id) {
    return this.storage[id];
  }
  updateUser(id, { firstName, lastName, age, email, bio }) {
    this.storage[id] = { id, firstName, lastName, age, email, bio };
  }
  deleteUser(id) {
    delete this.storage[id];
  }
}
module.exports = new UsersStorage();
// This code defines a UsersStorage class that manages user data in memory.
// It allows adding, retrieving, updating, and deleting users by storing them in an object.
// Each user is identified by a unique ID, which is automatically incremented.
