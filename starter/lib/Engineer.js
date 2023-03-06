// This imports the Employee class
const Employee = require('./Employee');

// This will define the Engineer class that inherits from Employee
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return 'Engineer';
  }
}

// This will export the Engineer class
module.exports = Engineer;

