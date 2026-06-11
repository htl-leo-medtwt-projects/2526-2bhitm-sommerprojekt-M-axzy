const tl = gsap.timeline();

gsap.set("#hintergrund", {
    opacity: 0,
    scale: 1.1
});

tl.to("#hintergrund", {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: "power2.out"
});

tl.from("#Logo", {
    y: -500,
    opacity: 0,
    duration: 1.5,
    ease: "back.out(1.7)"
});

tl.from("#Tutorial", {
    y: 300,
    opacity: 0,
    duration: 1
}, "-=0.7");

tl.from("#Play-Button", {
    y: 300,
    opacity: 0,
    duration: 1
}, "-=0.8");

tl.from("#Info", {
    opacity: 0,
    duration: 2.2,
    ease: "power2.out"
}, "-=1");

let buttonInfo = document.getElementById('Info');
let buttonTutorial = document.getElementById('Tutorial');
let buttonStart = document.getElementById('Play-Button');

buttonInfo.addEventListener('click', () => {
    window.location.href = '../Html/info.html';
    console.log('Navigiert zu Info');
});

buttonTutorial.addEventListener('click', () => {
    window.location.href = '../Html/tutorial.html';
    console.log('Navigiert zu Tutorial');
});

buttonStart.addEventListener('click', () => {
    window.location.href = '../Html/spiel.html';
    console.log('Navigiert zu Spiel');
});