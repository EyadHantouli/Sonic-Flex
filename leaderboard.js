// Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, getDocs, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyASsyz7AR0Vw-a9YFGm2tsEVsvnabg83hg",
  authDomain: "sonicflex-3ce7e.firebaseapp.com",
  projectId: "sonicflex-3ce7e",
  storageBucket: "sonicflex-3ce7e.appspot.com",
  messagingSenderId: "975349845241",
  appId: "1:975349845241:web:f133deabe7420bfb5fa628",
  measurementId: "G-LYNZT7VFK7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(getFirestore)

const fetchData = query(collection(db, 'users'), orderBy('score', 'asc'))

let users = [];

async function GetAllDataOnce() {
    const querySnapshot = await getDocs(fetchData);
    querySnapshot.forEach(doc => {
        users.push(doc.data());
    });
    setChart(users)
    }

GetAllDataOnce()

// Chart

function setChart(users) {
    var yArray = [];
    var xArray = [];

    users.map((user) => {
        yArray.push(user.name + ' ');
        xArray.push(user.score);
    })

    var data = [{
    x:xArray,
    y:yArray,
    type:"bar",
    orientation:"h",
    marker: {color:"#f19200db"}
    }];

    var layout = {title:"Sonic Flex Leaderboard"};

    Plotly.newPlot("chart", data, layout);
}