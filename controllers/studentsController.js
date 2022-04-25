const Student = require('../models/studentsModel')

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

// @desc    Gets All Students
// @route   GET /api/students
async function getStudents(req, res) {
    try {
        const students = await Student.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(students))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Student
// @route   GET /api/students/:id
async function getStudent(req, res, id) {
    try {
        const student = await Student.findById(id)

        if(!student) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(student))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Student
// @route   POST /api/students
async function createStudent(req, res) {
    try {
        const body = await getPostData(req)

        const { firstname, lastname, group } = JSON.parse(body)

        const student = {
            firstname,
            lastname,
            group
        }

        const newStudent = await Student.create(student)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newStudent))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Student
// @route   PUT /api/students/:id
async function updateStudent(req, res, id) {
    try {
        const student = await Student.findById(id)

        if(!student) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            const body = await getPostData(req)

            const { firstname, lastname, group } = JSON.parse(body)

            const studentData = {
                firstname: firstname || student.firstname,
                lastname: lastname || student.lastname,
                group: group || student.group
            }

            const updStudent = await Student.update(id, studentData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updStudent)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Student
// @route   DELETE /api/students/:id
async function deleteStudent(req, res, id) {
    try {
        const student = await Student.findById(id)

        if(!student) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            await Student.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `User ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}