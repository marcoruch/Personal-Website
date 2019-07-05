const express = require('express');
const path = require('path');
const cors = require('cors');
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// init firebase app
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://marcoruchch.firebaseio.com"
});

// init firestore
const firestore = firebase.firestore();


// init express app
const app = express();

// use cors
app.use(cors());

// greeting test
app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });
  
function testNode() {
    firestore.collection("testNode").add({
        'title': "Test",
        'tags': [1,2,3],
        'createDate': new Date(),
        'updateDate': new Date(),
        'content': "Document successfully written!",
    }).then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });
}



app.listen(5000, () =>{
        console.log('App is listening on port 5000');
})

