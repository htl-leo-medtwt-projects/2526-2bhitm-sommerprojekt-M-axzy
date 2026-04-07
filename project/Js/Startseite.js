let buttonInfo = document.getElementById('Info')
let buttonTutorial = document.getElementById('Tutorial')
let buttonStart = document.getElementById('Play-Button')

buttonInfo.addEventListener('click',() =>{
    window.location.href = '../Html/info.html';
    console.log('Navigiert zu Info');
});

buttonTutorial.addEventListener('click',() =>{
    window.location.href = '../Html/tutorial.html';
    console.log('Navigiert zu Tutorial');
});

buttonStart.addEventListener('click', () =>{
    window.location.href ='../Html/spiel.html';
    console.log('Navigiert zu Spiel')
})
