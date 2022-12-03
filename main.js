// Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";


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

const fetchData = collection(db, 'users')


//////////////////
//              //
//   The Game   //
//              //
//////////////////


// Run When You Pick Ring


    // Ring Number
let i=1;

    // Player Score
window.score = 0;

    // Game Speed
let speed = 1000;

    // Round Time (sec)
let timer = 60;

// Add Name & Score To Firebase
async function addToFirebase(score) {
    const docRef = await addDoc(fetchData,
            {
                name: oldName,
                score: score,
            }
        ).then(() => {
            console.log({
                name: oldName,
                score: score,
            })
        }).catch(err => {
            console.log('Error: ', err)
        })
}

function setTimer() {

    // Run Every Second
    setTimeout(() => {
        document.querySelector('.timer').innerText = timer
        document.querySelector('.scores').innerText = window.score

        timer--;

        // Game Will Be Faster & Faster Every Second
        speed = timer * 7

        // Check If Round Finished
        if (timer>0) {
            setTimer()
        } else {
            // Run When Round Finished
            console.log(window.score)
            oldName = localStorage.getItem('username')
            if (oldName && window.score > localStorage.getItem('highscore')) {
                localStorage.setItem('highscore', `${window.score}`)
            }

            if (oldName) {
                addToFirebase(window.score)
            }

            document.querySelector('.high-score').innerText = `High Score: ${localStorage.getItem('highscore')}`;

            // Remove All Rings
            document.querySelectorAll('.goal-circle').forEach((item) => {
                item.remove()
            })

            // Rest Values
            i=1;
            window.score = 0;
            speed = 1000;
            timer = 60;
            document.querySelector('.timer').innerText = timer
            document.querySelector('.scores').innerText = window.score

            // Back To Main Menu
            document.querySelector('main').style.transform = 'translateX(0px)';
        }
    }, 1000);
    
};


// Create Ring Element
function createElements() {

    setTimeout(() => {
        // Add Ring
        document.querySelector('.inner-game-board').insertAdjacentHTML("afterend",
        // Ring As HTML Code
        // Every Ring Has Its Random Position, Speed & Delay
        // There Is 9 Modes Of Ring (See "./css/game.css" File For More Details)
        // In The Following Code {Math.floor(Math.random() * 9 + 1)}
        // That Means Get Random Number In Range (1, 10) => {1,2,3,4,5,6,7,8,9}
        // Note: points='1' Attribute Means This Ring Will Give You (1 Point)
        `
            <i points='1' class='goal${Math.floor(Math.random() * 9 + 1)} goal-circle'
            onmouseover='picked(this, "element${i}")'>
                <audio id='element${i}' className="pick-ring">
                    <source src="./Audio/pick_sound.mp3" type="audio/mpeg">
                </audio>
            </i>
        `
        )
        
        

        // Change Ring Number To +1
        i++;

        // Rings Will Stop Generating After Timer Being Less Than 10s
        if (timer > 10) {
            createElements();
        }
    }, speed);
};

// Start Button Function
function startGame() {
    // In game settings
    document.querySelector('main').style.transform = 'translateX(10000px)';
    setTimer();
    createElements();
}

document.querySelector('#start-btn').addEventListener('click', () => {startGame()})

// Sign In Settings

// Get Username From Cache
let oldName = localStorage.getItem('username')
let oldScore = localStorage.getItem('highscore')

function getUsername() {

    // re-Get Username From Cache
    oldName = localStorage.getItem('username')
    oldScore = localStorage.getItem('highscore')
    
    // Check If New User Here
    if (oldName) {
        document.querySelector('.welcome').innerText = `Welcome - ${localStorage.getItem('username')}`;
        if (oldScore) {
            document.querySelector('.high-score').innerText = `High Score: ${localStorage.getItem('highscore')}`;
        } else {
            document.querySelector('.high-score').innerText = `High Score: ${0}`;
            localStorage.setItem('highscore', `${0}`)
        }
    } else {
        document.querySelector('.welcome').innerText = 'Welcome';
        document.querySelector('.high-score').innerText = `High Score: ${0}`;
        localStorage.setItem('highscore', `${0}`)
    }
}

// Run When Form Submitted
document.querySelector('#signin-form').addEventListener('submit', (ev) => {
    ev.preventDefault();

    // Save Username In Cache
    localStorage.setItem('username', document.querySelector('#username').value)

    // Reset High Score
    document.querySelector('.high-score').innerText = `High Score: ${0}`;
    localStorage.setItem('highscore', `${0}`)

    // Get Username
    getUsername()

    ev.target.reset();
})

// Get Username If Old User
getUsername()



// About Me
document.querySelector('.fa-xmark').addEventListener('click', ()=>{
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.black').style.display = 'none';
    document.querySelector('html').style.overflowY = 'auto';
})
document.querySelector('.black').addEventListener('click', ()=>{
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.black').style.display = 'none';
    document.querySelector('html').style.overflowY = 'auto';
})