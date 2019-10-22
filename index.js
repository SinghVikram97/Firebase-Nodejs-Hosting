const functions = require("firebase-functions");
const express = require("express");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const app = express();

let firebase = require("firebase");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let firebaseConfig = {
  apiKey: "AIzaSyC03DZ2w7BrLc4L2llOjYYFWAn0L22_UnI",
  authDomain: "fir-nodejs-hosting.firebaseapp.com",
  databaseURL: "https://fir-nodejs-hosting.firebaseio.com",
  projectId: "fir-nodejs-hosting",
  storageBucket: "fir-nodejs-hosting.appspot.com",
  messagingSenderId: "1000193842272",
  appId: "1:1000193842272:web:128830d880fa0921433705",
  measurementId: "G-R7467CD4JM"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

app.post("/lab", (req, res) => {
  const { LabName, Value, Unit, Observer, NotedDate, NotedTime } = req.body;
  db.collection("reports")
    .add({
      LabName,
      Value,
      Unit,
      Observer,
      NotedDate,
      NotedTime
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      res.send(docRef.id);
    })
    .catch(function(error) {
      console.log("Error adding document: ", error);
      res.send(error);
    });
});

app.get("/lab", (req, res) => {
  let reportsArray = [];
  db.collection("reports")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        reportsArray.push(doc.data());
      });
      res.send(reportsArray);
    });
});

app.get("/hi", (req, res) => {
  res.send("Hi");
});

exports.app = functions.https.onRequest(app);
