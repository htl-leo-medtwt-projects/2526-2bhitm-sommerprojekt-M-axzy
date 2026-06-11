const tl = gsap.timeline();

gsap.set("#hintergrund", {
    opacity: 0,
    scale: 1.1
});

tl.to("#hintergrund", {
    opacity: 1,
    scale: 1,
    duration: 2.5,
    ease: "power2.out"
});

tl.from("#Tutorial", {
    y: 600,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

tl.from("#Info", {
    y: 600,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
}, "-=0.8");

tl.from("#Logo", {
    y: -600,
    opacity: 0,
    duration: 1.5,
    ease: "back.out(1.7)"
});

tl.from("#Play-Button", {
    y: 800,
    opacity: 0,
    duration: 1.4,
    ease: "power4.out"
}, "-=0.6");

let buttonInfo = document.getElementById('Info');
let buttonTutorial = document.getElementById('Tutorial');
let buttonStart = document.getElementById('Play-Button');

buttonInfo.addEventListener('click', () => {
    window.location.href = '../Html/info.html';
});

buttonTutorial.addEventListener('click', () => {
    window.location.href = '../Html/tutorial.html';
});

buttonStart.addEventListener('click', () => {
    window.location.href = '../Html/spiel.html';
});