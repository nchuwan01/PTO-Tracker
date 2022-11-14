const express = require('express')
const app = express()
let bodyParser = require('body-parser')
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


app.get("/logIn", function (req, res){
    res.render("logIn")
})
app.get("/registrationPage", function (req, res){
    res.render("registrationPage")
})
app.get("/resetPassword", function (req, res){
    res.render("resetPassword")
})
app.get("/managerStatusPage", function (req, res){
    res.render("managerStatusPage");
})
app.get("/devStatusPage", function (req, res){
    res.render("devStatusPage")
})
app.get("/managerPrintReport", function (req, res){
    res.render("managerPrintReport")
})
app.get("/directorPrintReport", function (req, res){
    res.render("directorPrintReport")
})
app.get("/managerEmployeeReport", function (req, res){
    res.render("managerEmployeeReport")
})
app.get("/directorEmployeeReport", function (req, res){
    res.render("directorEmployeeReport")
})
app.get("/directorHomePage", function(req, res) {
    res.render("DirectorHomePage");
})
app.get("/makeRequest", function(req, res) {
    res.render("RequestPage");
})
app.get("/devmakeRequest", function(req, res) {
    res.render("devRequestPage");
})
let port = 3018;
app.listen(port, ()=>{
    console.log("Listening on http://localhost:" + port);
});
