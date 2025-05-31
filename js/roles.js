// Do not use strict with classes, mainly put this comment here to remind myself

import { Employee } from "./employee.js";

// set up emp class

class PartTime extends Employee {
  constructor(name, age, pay, hours) {
    super(name, age);
    this.pay = pay;
    this.hours = hours;
    this.empType = "Part Time";
  }
  // for part time theh pay is their pay times their hours times 52 weeks
  calculatePay() {
    this.salary = this.pay * this.hours * 52;
  }
}

//When emp type is manager

class Manager extends Employee {
  constructor(name, age, pay) {
    super(name, age);
    this.pay = pay;
    this.hours = 40;
    this.empType = "Manager";
  }

  calculatePay() {
    // for managers hours times weeks minus insurance
    this.salary = this.pay * 40 * 52 - 1000;
  }
}

// Allow exporting to other files
export { PartTime, Manager };
