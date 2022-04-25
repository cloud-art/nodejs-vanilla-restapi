const http = require('http')
const { getStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('./controllers/studentsController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/students' && req.method === 'GET') {
        getStudents(req, res)
    } else if(req.url.match(/\/api\/students\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getStudent(req, res, id)
    } else if(req.url === '/api/students' && req.method === 'POST') {
        createStudent(req, res)
    } else if(req.url.match(/\/api\/students\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateStudent(req, res, id)
    } else if(req.url.match(/\/api\/students\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteStudent(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT =  process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;