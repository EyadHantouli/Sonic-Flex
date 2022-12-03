
// Why this file separated ?

// Its good point to ask this question since it's not allowed
// to use { Import } in JS file without using { type='module' } in html code
// then when you use { type='module' } you will not be able to call JS functions from HTML code
// something like {onclick='myFunction()'} it will return an error { myFunction is not defind }

// I needed a quick way to solve this problem because of the pressure of university exams at this time
// because of that this file is separate
// also you can see that { score } variable called using { window.score } to make it able to access from this file and { ./main.js } file
// it makes score not scured since you can access on it using { console } but it's just a simple project at all <3.

const picked = (element, eid) => {
    // Pickup Sound
    document.querySelector(`#${eid}`).play();

    // Add Scores
    window.score += parseInt(element.getAttribute('points'));

    // Remove Points From Picked Ring (Fix Repeating Scores From Same Ring)
    element.setAttribute('points', '0')

    // Picked Ring Animation
    element.style.transform = 'scale(2)';
    element.style.opacity = '0%';
    setTimeout(() => {element.remove()}, 500)
}