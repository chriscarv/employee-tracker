const express = require('express');
const inquirer =require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

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
    },
    {
        type: 'list',
        name: 'roles',
        message: 'view all roles',
        choices: ['1', '2', '3'],
        when: (answers) => answers.options === 'view all roles'

    }
]

function init() {
    inquirer.prompt(questions);
}
init();