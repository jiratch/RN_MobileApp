
// https://stackoverflow.com/questions/47242340/how-to-perform-an-http-file-upload-using-express-on-cloud-functions-for-firebase


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// import express
const express = require('express');
const app = express();

// import other packages
var Jimp = require('jimp');
var bodyParser = require('body-parser');

app.use(bodyParser.json())

app.post('/', (req, res) => {
  Jimp.read(Buffer.from(req.body.base64, 'base64'))
  .then(image => {

    // Do stuff with the image.
    image.greyscale();

    // send base64 (for data URI) back to client
    image.getBase64(Jimp.MIME_PNG, (error, result) => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(result);
      res.end();
    })

  })
  .catch(err => {
    // Handle an exception.
    console.log(err);
  });
})

exports.uploadimage = functions.https.onRequest(app);