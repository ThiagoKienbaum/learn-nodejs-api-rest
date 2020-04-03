const express = require('express');
const server = express();

const projects = [
    {
        "id": "1",
        "title": "Projeto01",
        "tasks": ["tarefa01","tarefa04","tarefa03"]
    },
    {
        "id": "2",
        "title": "Projeto02",
        "tasks": ["tarefa01","tarefa04","tarefa03"]
    },
    {
        "id": "3",
        "title": "Projeto03",
        "tasks": ["tarefa01","tarefa04","tarefa03"]
    }
];

function logRequests(req, res, next) {
    console.time('Request');
    console.count('Requests')
    console.log(`Method: ${req.method}, URL: ${req.url}.`)
    next();
    console.timeEnd('Request');
};

function validateProjectID(req, res, next) {
    const { id } = req.params;
    const projectFound = projects.find(project => project.id == id);
    if(!projectFound) {
        return res.status(400).json({ error: 'Project not found.'})
    }
    req.projectFound = projectFound
    req.id = id;
    return next();
};

server.use(express.json());
server.use(logRequests);

//CRUD
    //Cadastrar novo projeto
server.post('/projects', (req, res) => {
    const { id } = req.body;
    const { title } = req.body;
    projects.push({ "id": id, "title": title })
});

    //Cadastrar nova task por ID do projeto
server.post('/projects/:id/tasks', validateProjectID, (req, res) => {
    
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.get('/projects/:id', validateProjectID, (req, res) => {
    return res.json(req.projectFound)
});

    //Alterar o nome do projeto por ID
server.put('/projects/:id', validateProjectID, (req, res) => {

});

    //Deletar projeto por ID
server.delete('/projects/:id', validateProjectID, (req, res) => {

});

server.listen(3333);