import { PartTime, Manager } from "./roles.js";

(() => {
  class Main {
    constructor() {
      // Empty array for employees
      this.emp = [];
      // Can't start with 0 per instructions
      this.empId = 1;

      // Get the information for the DOM
      this.form = document.getElementById("infoForm");
      this.tableBody = document.getElementById("employeeTable");

      //   Listen for button click/form submission
      this.form.addEventListener("submit", (e) => {
        // Prevent page from reloading too early
        e.preventDefault();
        this.submitEmpForm();
      });

      // 3 Employees are visible on page load
      this.currentEmp();
      this.showEmp();
    }

    // Currently employed to show on page load
    currentEmp() {
      const startingEmp = [
        { name: "Barbara", age: 34, hours: 24, pay: 16 },
        { name: "John", age: 42, hours: 40, pay: 28 },
        { name: "Linda", age: 22, hours: 10, pay: 9 },
      ];
      // Creates employees after looping through each
      startingEmp.forEach((emp) => {
        this.createEmp(emp.name, emp.age, emp.hours, emp.pay);
      });

      // console.log("Starting employee information loaded.");
    }

    // add a new employee using hte form
    submitEmpForm() {
      const empName = document.getElementById("name").value;
      // Use parseInt for numbers
      const empAge = parseInt(document.getElementById("age").value);
      const empHours = parseInt(document.getElementById("hours").value);
      const empPay = parseFloat(document.getElementById("pay").value);

      // Create the new employee
      this.createEmp(empName, empAge, empHours, empPay);
      this.showEmp();
      //   resets the form to add a new employee
      this.form.reset();
      //   console.log("Form submitted.");
    }

    // Show the employee information on the page after adding, creates table/adds row
    showEmp() {
      // Forgot console clear - add in here even though I have the form
      console.clear();
      this.tableBody.innerHTML = "";
      // Loop through each employee in the array
      this.emp.forEach((emp) => {
        const tableRow = document.createElement("tr");
        // Creates the table with the buttons, edit and remove buttons are in the button group for better styling
        tableRow.innerHTML = `
  <td>${emp.id}</td>
  <td>${emp.name}</td>
  <td>${emp.age}</td>
  <td>$${emp.salary.toLocaleString()}</td>
  <td>${emp.hours}</td>
  <td>$${emp.pay.toFixed(2)}</td>
  <td>${emp.empType}</td>
  <td>
    <div class="button-group">
   
      <button onclick="app.editEmp(${emp.id})">Edit Employee</button>
      <button onclick="app.removeEmp(${emp.id})">Remove</button>
    </div>
  </td>
`;

        // Append/show a new table row
        this.tableBody.appendChild(tableRow);
        // Show in the console even though I have it on page, just for testing and additional reference
        console.log("ID\tName\tSalary\tHours\tPay\tRole");
        this.emp.forEach((emp) => {
          console.log(
            `${emp.id}\t${emp.name}\t${emp.salary.toLocaleString()}\t${
              emp.hours
            }\t${emp.pay.toFixed(2)}\t${emp.empType}`
          );
        });
      });

      console.log("Employee table updated.");
    }

    // Employee type - Manager or part time as per instructions
    createEmp(empName, empAge, empHours, empPay) {
      let newEmp;

      if (empHours >= 40) {
        // Full time = Manager
        newEmp = new Manager(empName, empAge, empPay);
      } else {
        // Part time = PartTime
        newEmp = new PartTime(empName, empAge, empPay, empHours);
      }
      // Set the new employee id by increasing the value by one with ++
      newEmp.id = this.empId++;
      //   will calculate the salary
      newEmp.calculatePay();
      // Push the new employee information to the array
      this.emp.push(newEmp);
      console.log("Employee added:", newEmp);
    }

    // Delete the employee, you're fired
    removeEmp(id) {
      this.emp = this.emp.filter((e) => e.id !== id);
      //   still shows remaining employees
      this.showEmp();
      console.log("Employee removed.");
    }

    // Edit employee information
    editEmp(id) {
      // Find the employee by their id
      const employee = this.emp.find((e) => e.id === id);
      // If no employee matches the id found this will stop the function from running to prevent errors in editing
      if (!employee) return;

      const newPay = prompt(
        "Enter new pay rate for " + employee.name + ":",
        employee.pay
      );

      if (Number(newPay)) {
        employee.pay = Number(newPay);
        employee.calculatePay();
        this.showEmp();
      }
      console.log("Pay has been updated for", employee.name);
    }
  }
  // Make it global
  window.app = new Main();
})();
