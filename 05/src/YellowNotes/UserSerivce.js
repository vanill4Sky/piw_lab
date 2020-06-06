class CrudException {
  constructor(message) {
    this.message = message;
  }
}

export default class UserService {
  constructor(userTableName) {
    this.userTableName = userTableName;
  }

  fetchUserTable() {
    let userTable = localStorage.getItem(this.userTableName);

    if (userTable) {
      return JSON.parse(userTable);
    } else {
      return [];
    }
  }

  storeUserTable(userTable) {
    localStorage.setItem(this.userTableName, JSON.stringify(userTable));
  }

  createUser(newUser) {
    const userTable = this.fetchUserTable();

    if (
      userTable.some((user) => {
        return user.login === newUser.login;
      })
    ) {
      throw new CrudException("User with this login already exists!");
    } else {
      userTable.push(newUser);
    }

    this.storeUserTable(userTable);
  }

  readUser(newUser) {
    const userTable = this.fetchUserTable();

    if (
      userTable.some((user) => {
        return (
          user.login === newUser.login && user.password === newUser.password
        );
      })
    ) {
      return true;
    } else {
      return false;
    }
  }
}
