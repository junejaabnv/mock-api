var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')


var server = app.listen(process.env.PORT || 3001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

const jsonAPI = function (req, res) {
    res.set('Content-Type', 'application/json');
    let accountNumber = req.params.accountNumber || req.body.accountNumber;
    let users = {
        6759370: {
            firstName: "Abhinav",
            lastName: "Juneja",
        },
        6759371: {
            firstName: "Neha",
            lastName: "Saini",
        }
    }

    
    if (accountNumber == 6759370 || accountNumber == 6759371) {
    let response = `{
        "firstName":"${users[accountNumber].firstName}",
        "lastName":"${users[accountNumber].lastName}",
        "lastDate":"10102020",
        "amountDue":10
    }`
        res.send(response);
    } else {
        res.status(404).send('');
    }
}
const xmlAPI = function (req, res) {
    console.log(req.body, req.body.accountNumber)
    res.set('Content-Type', 'text/xml');
    let accountNumber = req.params.accountNumber || req.body.accountNumber;
    let users = {
        6759370: {
            firstName: "Abhinav",
            lastName: "Juneja",
        },
        6759371: {
            firstName: "Neha",
            lastName: "Saini",
        }
    }

    if (accountNumber == 6759370 || accountNumber == 6759371) {

    let response = `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <soapenv:Body>
            <setPaymentResponse xmlns="http://soapserver.commsoft.net">
                <setPaymentReturn>
                   <first_name>${users[accountNumber].firstName}</first_name>
                   <last_name>${users[accountNumber].lastName}</last_name>
                   <payment_due>10</payment_due>
                </setPaymentReturn>
            </setPaymentResponse>
        </soapenv:Body>
    </soapenv:Envelope>`
        res.send(response);
    } else {
        res.status(404).send('');
    }
}
app.use(bodyParser.json({ extended: false }))
app.post('/json-api/:accountNumber', jsonAPI);
app.post('/json-api', jsonAPI);
app.post('/xml-api/:accountNumber', xmlAPI);
app.post('/xml-api', xmlAPI);
