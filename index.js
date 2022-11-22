const express = require('express')
const app = express()
let bodyParser = require('body-parser')
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');
let connection = require ("./dbLogin");
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'static')))


app.get('/', function(req, res) {
    // Render login template
    res.render("login")
});
app.post('/auth',function (req,res){
    let username = req.body.username
    let password = req.body.password
    if(username && password){
        connection.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                connection.query('SELECT role FROM employee WHERE username = ?',[req.body.username],function(error,results,fields){
                    if (error) throw error;
                    if(results=="Employee"){
                    res.render("dev/devHomePage")
                    }else if(results == "Manager"){
                    res.render("ManagerFiles/managerHomePage")
                    }else{
                    res.render("DirectorPages/DirectorHomePage")
                    }});
            }  else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        console.log(username,password)
        res.send({username},{password})
        res.send('Please enter Username and Password!');
        res.end();
    }
});
app.get("/managerStatusPage", function (req, res){
    res.render("ManagerFiles/managerStatusPage");
})
app.get("/devStatusPage", function (req, res){
    res.render("DevPugs/devStatusPage")
})
app.get("/managerPrintReport", function (req, res){
    res.render("ManagerFiles/managerPrintReport")
})
app.get("/directorPrintReport", function (req, res){
    res.render("DirectorPages/directorPrintReport")
})
app.get("/managerEmployeeReport", function (req, res){
    res.render("ManagerFiles/managerEmployeeReport")
})
app.get("/directorEmployeeReport", function (req, res){
    res.render("DirectorPages/directorEmployeeReport")
})
app.get("/directorHomePage", function(req, res) {
    res.render("DirectorPages/DirectorHomePage");
})
app.get("/makeRequest", function(req, res) {
    res.render("ManagerFiles/RequestPage");
})
app.get("/devmakeRequest", function(req, res) {
    res.render("DevPugs/devRequestPage");
})
app.get("/devHomePage", function(req, res) {
    res.render("DevPugs/devHomePage");
})
app.get("/managerHomePage", function(req, res) {
    res.render("ManagerFiles/managerHomePage");
})
app.get("/resetPassword", function (req, res){
    res.render("resetPassword")
})
app.get("/registrationPage", function (req, res){
    res.render("registrationPage")
})
let port = 3021;
app.listen(port, ()=>{
    console.log("Listening on http://localhost:" + port);
});
