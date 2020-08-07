const fs = require("fs");
const { json } = require("express");
// LOAD DATA
// We are linking our routes to a series of "data" sources.

var noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app) {
    // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link


    app.get("/api/notes", function(req, res){
        res.json(noteData);
    });

    // Below code handles when a user request a specific resource
    app.get("/api/notes/:id", function(req, res){
        res.json(noteData[Number(req.params.id)]);
    });
    // ========================================================= //
    // API POST Requests
  // Below code handles when a user saves a notes and thus store data to the server.
    app.post("/api/notes", function(req, res){
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        let newNote = req.body;
        // Here we give a way to assign a unique id to our new notes posted by the user.
        let uniqueId = (noteData.length).tostring();
        newNote.id = uniqueId;
        noteData.push(newNote);
        
        res.json(noteData);

    });

    //Delete a specific resource 
    // Dynamic route
    app.delete("/api/notes/:id", function(req, res){
        const note = noteData.find(n => n.id === parseInt(req.params.id));
        if(!note) res.status(404).send('The note with a given ID is not found');
        const index = noteData.indexOf(note);
        noteData.splice(index, 1);
        res.json(note);
    });
    
}