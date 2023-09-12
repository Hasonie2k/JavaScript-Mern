const PersonController = require("../controllers/person");

module.exports = app =>{
    app.get("/api/people", PersonController.findAllPeople);
    app.post('/api/people', PersonController.createPerson);
    app.get('/api/people/:id', PersonController.findOnePerson);
    app.patch('/api/people/:id', PersonController.updatePerson);
    app.delete('/api/people/:id', PersonController.deletePerson);
}