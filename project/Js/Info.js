let buttonWeiter = document.getElementById('buttonWeiter');

buttonWeiter.style.display = 'none';

setTimeout(() => {
    buttonWeiter.style.display = 'block';
    console.log('Button "Weiter" wird jetzt angezeigt');
}, 10000);

buttonWeiter.addEventListener('click', () => {
    window.location.href = '../Html/index.html'; 
    console.log('Navigiert zurück zur Startseite');
});