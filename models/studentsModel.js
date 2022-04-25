let students = require('../data/students')
const { v4: uuidv4 } = require('uuid')

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
        resolve(newStudent)
    })
}

function update(id, student) {
    return new Promise((resolve, reject) => {
        const index = students.findIndex((s) => s.id === id)
        students[index] = {id, ...student}
        resolve(students[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        students = students.filter((s) => s.id !== id)
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