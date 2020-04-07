const express = require('express');
const server = express();

const projects = [
    {
        "id": "1",
        "title": "Projeto01",
        "tasks": ["tarefa01","tarefa02","tarefa03"]
    },
    {
        "id": "2",
        "title": "Projeto02",
        "tasks": ["tarefa04","tarefa05","tarefa06"]
    },
    {
        "id": "3",
        "title": "Projeto03",
        "tasks": ["tarefa07","tarefa08","tarefa09"]
    }
];

function logRequests(req, res, next) {
    console.time('Request');
    console.count('Requests')
    console.log(`Method: ${req.method}, URL: ${req.url}.`);
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

server.post('/projects', (req, res) => {
    const { id } = req.body
    const { title } = req.body;
    projects.push({ "id": id, "title": title });
    return res.json(projects);
});

//Criar uma nova task
server.post('/projects/:id/tasks', validateProjectID, (req, res) => {
    req.projectFound.tasks.push(req.body.tasks);
    return res.json(req.projectFound);    
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.get('/projects/:id', validateProjectID, (req, res) => {
    return res.json(req.projectFound)
});

server.put('/projects/:id', validateProjectID, (req, res) => {
    req.projectFound.title = req.body.title;
    return res.json(req.projectFound);
});

server.delete('/projects/:id', validateProjectID, (req, res) => {
    var projectToDelete = projects.indexOf(req.projectFound)
    projects.splice(projectToDelete, 1);
    return res.json(projects);
});

server.listen(3333);