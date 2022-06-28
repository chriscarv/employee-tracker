const express = require('express');
const inquirer =require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { connect } = require('./db/connection');

const PORT = process.env.PORT || 3001;

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');

});

function initialPrompt(){
    inquirer.prompt(
        {
        type: 'list',
        name: 'options',
        message: 'what would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 
        'add a role', 'add an employee', 'update an employee role']   
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

            }
        })
   };
/*
const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'what would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 
        'add a role', 'add an employee', 'update an employee role']
    } , 
    {
        type: 'list',
        name: 'departments',
        message: 'view all departments',
        choices: ['1', '2', '3'],
        when: (answers) => answers.options === 'view all departments'
    }
    .then viewDepartments(),
    
    {
        type: 'list',
        name: 'roles',
        message: 'view all roles',
        choices: ['1', '2', '3'],
        when: (answers) => answers.options === 'view all roles'
    },
]
*/

function viewDepartments() {
    const query = `SELECT * FROM department`;
    db.query(query, (err, data) => {
        if(err) throw err;

        console.table(data);
    })
    };

function viewRoles() {
    const query = 'SELECT * FROM role';
    db.query(query, (err, data) => {
        if(err) throw err;
        console.table(data);
    })
};

function viewEmployees() {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, data) => {
        if(err) throw err;
        console.table(data);
    })
}
/*
function init() {
    inquirer.prompt(questions);
}
init();
*/

initialPrompt();
