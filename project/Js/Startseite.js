let buttonInfo = document.getElementById('Info')
let buttonTutorial = document.getElementById('Tutorial')

buttonInfo.addEventListener('click',() =>{
    window.location.href = '../Html/info.html';
    console.log('Navigiert zu Info');
});

buttonTutorial.addEventListener('click',() =>{
    window.location.href = '../Html/tutorial.html';
    console.log('Navigiert zu Tutorial');
});
