// This will Import the Employee class
const Employee = require('./Employee');

// This defines the Manager class that inherits from Employee
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return 'Manager';
  }
}

// This will Export the Manager class
module.exports = Manager;

