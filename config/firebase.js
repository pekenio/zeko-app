// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp()
// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCh-ECnIUyUYasAYlEKIrwSV_HEGvn404A",
//   authDomain: "zeko-app-1b172.firebaseapp.com",
//   projectId: "zeko-app-1b172",
//   storageBucket: "zeko-app-1b172.appspot.com",
//   messagingSenderId: "668310992722",
//   appId: "1:668310992722:web:d0632e70b905ec2cce6c8b",
//   measurementId: "G-F6EF27QL4W"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const multer = require('multer')

const MINE_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/gif':'gif'
    
}

const storage = multer.diskStorage({
    destination : (requ,file,callback)=>{
        
        callback(null,'../assets/avatars')
    },
    filename : (requ,file,callback)=>{
        console.log(file)
        const name = file.originalname.split(' ').join('_')
        const extension = MINE_TYPES[file.mimetype]
        callback(null,name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage}).single('image')