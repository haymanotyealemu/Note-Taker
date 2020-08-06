// LOAD DATA
// We are linking our routes to a series of "data" sources.

var noteData = require("../db/noteArray");


module.exports = function(app) {
    // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link


    app.get("/api/notes", function(req, res){
        res.json(noteData);
    });
    // API POST Requests
  // Below code handles when a user saves a notes and thus store data to the server.
    app.post("/api/notes", function(req, res){
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newNote ={
            id: noteData.length + 1,
            title: req.body.title,
            text: req.body.text
        };
        noteData.push(newNote);
        res.json(newNote);

    });

    //Delete request
    app.delete("/api/notes/:id", function(req, res){
        const note = noteData.find(n => n.id === parseInt(req.params.id));
        if(!note) res.status(404).send('The note with a given ID is not found');
        const index = noteData.indexOf(note);
        noteData.splice(index, 1);
        res.json(note);
    });
    
}