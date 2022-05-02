let students = require('../data/students')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(students)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const student = students.find( student => student.id == id)
        resolve(student)
    })
}

function create(student) {
    return new Promise((resolve, reject) => {
        const newStudent = {id: uuidv4(), ...student}
        students.push(newStudent)
        writeDataToFile('./data/students.json', students);
        resolve(newStudent)
    })
}

function update(id, student) {
    return new Promise((resolve, reject) => {
        const index = students.findIndex((s) => s.id === id)
        students[index] = {id, ...student}
        writeDataToFile('./data/students.json', students);
        resolve(students[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        students = students.filter((s) => s.id !== id)
        writeDataToFile('./data/students.json', students);
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}