const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')
const basicAuth = require("express-basic-auth");

const NoteRouter = require("./Router");
const NoteService = require("./noteService");
const noteService = new NoteService("./Database/database.json");


app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    basicAuth({
        authorizer: myAuthorizer,
        challenge: true,
        authorizeAsync: true,
        realm: "My Application",
    })
);


function myAuthorizer(username, password, callback) {
    const USERS = fs.readFileSync('./users.json', 'utf-8', async (err, data) => {
        if (err) {
            throw err
        }
        return await data
    });
    let parsed = JSON.parse(USERS);
    let user = parsed.users.filter((user) => user.username == username);
    if (user[0].username === username && user[0].password === password) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
}

app.get("/", (req, res, next) => {
    console.log("Getting");
    next();
});

app.get("/", (req, res) => {
    console.log(req.auth.user, req.auth.password);
    noteService.list(req.auth.user).then((data) => {
        console.log(data);
        res.render("index", {
            user: req.auth.user,
            notes: data,
        });
    });
});


app.use("/api/notes", new NoteRouter(noteService).router());

app.listen(8000, () => {
    console.log("Application listening to port 8000");
});


module.exports = app;
