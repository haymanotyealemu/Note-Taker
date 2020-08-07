const fs = require("fs");
// LOAD DATA
// We are linking our routes to a series of "data" sources.

var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app) {
    // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link


    app.get("/api/notes", function(req, res){
        res.json(data);
    });

    // Below code handles when a user request a specific resource
    app.get("/api/notes/:id", function(req, res){

        res.json(data[Number(req.params.id)]);
    });
    // ========================================================= //
    // API POST Requests
  // Below code handles when a user saves a notes and thus store data to the server.
    app.post("/api/notes", function(req, res){
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        let newNote = req.body;
        // Here we give a way to assign a unique id to our new notes posted by the user.
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        });
        res.json(data);

    });

    //Delete a specific resource 
    // Dynamic route
    app.delete("/api/notes/:id", function(req, res){
        
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of data){
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
        
        
    });
    
}