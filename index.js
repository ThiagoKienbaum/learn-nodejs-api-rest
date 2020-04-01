const express = require('express');
const server = express();
server.use(express.json());

const projects = ['teste','teste2']

server.get('/projects', (req, res) => {
   return res.json(projects);
})

server.post('/projects', (req, res) => {
    const { project } = req.body;
    projects.push(project);

    return res.json(projects);
})

server.delete('/projects/:index', (req, res) => {
    const { index } = req.query;
     
    projects.splice(index,1);

    return res.json(projects);

})

server.listen(3333);