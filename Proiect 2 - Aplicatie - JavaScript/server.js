const express = require('express');
const cors = require('cors');
const app = express();

var bodyParser = require('body-parser');
app.use(express.static('HTML'));
app.use(express.static('CSS'));
app.use(express.static('SCRIPT'));
app.use(express.static('images'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 7000;
const uid = require('uid');         //import

//Instantiate
let users = [
    {
        id: uid(25),
        email:  "",
        parola: "",
        parola2: "",
        sex: "",
        locatie: "",
        ora: ""
    }
]

let produse = [
    {
        id: uid(25),
        nume: "Pizza",
        pret: "15",
        src: "../images/meniu1.jpg"
    },
    {
        id: uid(25),
        nume: "Paste",
        pret: "15",
        src: "../images/pasta1.jpg"
    },
    {
        id: uid(25),
        nume: "Apperitive",
        pret: "10",
        src: "../images/appetizer1.jpg"
    },
    {
        id: uid(25),
        nume: "Supa",
        pret: "9",
        src: "../images/soup1.jpg"
    },
    {
        id: uid(25),
        nume: "Salata",
        pret: "7",
        src: "../images/salad1.jpg"
    },
]

//Inregistrare formular
app.post('/adauga-user', (request, response) => {
    const userData = request.body;
    userData.id = uid(25);
    users.push(request.body);
    response.statusCode = 201; //created
    response.send(users);
});

//Conectare
// app.get('/find-user', (request, response) => {
//     response.send(users);
// });

//Read
app.get('/lista-produse', (request, response) =>{
    response.send(produse);
});

//Create
app.post('/adauga-produs', (request, response) => {
    const produsData = request.body;
    if(!request.body.nume || !request.body.pret){
        return response.status(400).json({msg: 'Introduceti un produs valid' });
}
    else{
        produsData.src = "../images/soup1.jpg";
        produsData.id = uid(25);
        produse.push(request.body);
        response.statusCode = 201;
        response.send(produse);
    }
});

//Delete
app.delete('/sterge-produs/:id', (request, response) => {
    console.log("sterge", request.params.id);
    produse = produse.filter(produs => produs.id !== request.params.id);
    response.send(produse);
});

//Update
app.put('/update-produs/', (request, response) => {
    console.log(request.body);
    if(!request.body.upnume && !request.body.uppret){
        console.log("Camp necompletat!");
        return response.status(400).json({msg: 'Update la cel putin o informatie' });
}
    else{
        produse.forEach(produs => {
            if(produs.id===request.body.id)
            { 
                console.log("Am gasit");
                produs.nume = req.body.upnume;
                produs.pret = req.body.uppret;
                response.statusCode = 201;
                response.send(produse);
            }
    })
    }
});


app.get('*', function(request, response){
    res.status(404).sendFile(__dirname +'../HTML/error.html');
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));