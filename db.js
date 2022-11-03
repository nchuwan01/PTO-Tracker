/* connects to the database */
let mysql = require('mysql');
const bodyParser = require("body-parser");
let PTODATA = require('./PTOAccrualBrackets.json');

//console.log(JSON.parse(ObjectT[0].Name));

//console.log(ObjectT.length);
let con = mysql.createConnection({
    host: '45.55.136.114',
    user: 'kingsF2022',
    password: 'kings_r_here!',
    database: 'kingsF2022'
});


con.connect((err) => {
    if (err) return console.error(
        'error: ' + err.message);

    for(let i=0; i<PTODATA.length; i++)
    {
            var yearsWorked = PTODATA[i].NumberOfYears,
                role = PTODATA[i].Role,
                maxVac = PTODATA[i].MaxVacation,
                vacPerYear = PTODATA[i].VacationPerYear,
                vacAccuralDate = PTODATA[i].VacationAccuralDate,
                maxPer = PTODATA[i].MaxPersonal,
                perPerYear = PTODATA[i].PersonalPerYear,
                perAccuralDate= PTODATA[i].PersonalAccuralDate,
                maxSick = PTODATA[i].MaxSick,
                sickPerYear = PTODATA[i].SickPerYear,
                sickAccural = PTODATA[i].SickAccuralDate;

            var insertStatement =
                `INSERT INTO accural values(?, ?, ?, ?,?,?,?,?,?,?,?)`;
            var items = [yearsWorked, role, maxVac, vacPerYear,vacAccuralDate,maxPer,perPerYear,perAccuralDate,maxSick,sickPerYear,sickAccural ];

            con.query(insertStatement, items,
                (err, results, fields) => {
                        return console.log(err);
                    }
                );
    }


});


module.exports = con;