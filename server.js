const express = require('express');
const inquirer =require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { connect } = require('./db/connection');

const PORT = process.env.PORT || 3001;

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    initialPrompt();
});

function initialPrompt(){
    inquirer.prompt(
        {
        type: 'list',
        name: 'options',
        message: 'what would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 
        'add a role', 'add an employee', 'update an employee role', 'exit']   
        } )
        .then(function ({ options }) {
            switch(options) {
                case 'view all departments':
                    viewDepartments();
                    break;
                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployees();
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateRole();
                    break;
                case 'exit':
                    db.end();       

            }
        })
   };

function viewDepartments() {
    const query = `SELECT * FROM department`;
    db.query(query, (err, data) => {
        if(err) throw err;

        console.table(data);
        initialPrompt();
    })
    };

function viewRoles() {
    const query = 'SELECT * FROM role';
    db.query(query, (err, data) => {
        if(err) throw err;
        console.table(data);
        initialPrompt();
    })
};

function viewEmployees() {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, data) => {
        if(err) throw err;
        console.table(data);
        initialPrompt();
    })
};

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the department'
    })
    .then((answer) => {
      var query = `INSERT INTO department (name) VALUES (?)`;
      db.query(query, answer.deptName, (err, data) => {
        if(err) throw err;
        initialPrompt();
      });
    });
};

function addRole(){
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is the name of the role'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role'
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'What is the department id of this role'
    }])
    . then((answers) => {
        db.query('INSERT INTO role SET ?', {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department_id
        }, (err)=>{
            if(err) throw err;
            initialPrompt();
        });
    });  
};

function addEmployee(){
   inquirer.prompt([
    {
        type: 'input',
        name: 'first_name',
        message: 'What is employees first name'
   },
   {
    type: 'input',
    name: 'last_name',
    message: 'What is employees last name'
   },
   {
    type: 'input',
    name: 'role_id',
    message: 'What is employees role id'
   },
   {
    type: 'input',
    name: 'manager_id',
    message: 'what is employees manager id'
   }
]) .then((answers) => {
    db.query('INSERT INTO employee SET ?', {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: answers.role_id,
        manager_id: answers.manager_id
    }, (err) => {
        if(err) throw(err);
        initialPrompt();
    });
});
};


function updateRole(){
    db.query('SELECT * FROM employee', (err, data) =>{
        if(err) throw err;

        var employees = [];
        var roles = [];

        for(var i = 0; i < data.length; i++){
            employees.push(data[i].first_name)
        }

    db.query('SELECT * FROM role', (err, data) => {
        if(err) throw(err);

        for(var i =0; i < data.length; i++){
            roles.push(data[i].title)
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'choose employee to update',
                choices: employees
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'choose role',
                choices: roles
            }
        ])
        .then (function({ employee_id, role_id }){
            db.query(`UPDATE employee SET role_id = ${roles.indexOf(role_id) +1} WHERE id = ${employees.indexOf(employee_id) +1}`,
            (err) => {
                if(err) throw(err);
                initialPrompt();
            }
            )
        })
    });
    });
};


