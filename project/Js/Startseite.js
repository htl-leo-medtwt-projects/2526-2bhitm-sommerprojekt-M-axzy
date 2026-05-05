barba.init({
  transitions: [
    {
      name: "transition",

      leave(data) {
        return new Promise(resolve => {
          data.current.container.style.opacity = 1;

          let opacity = 1;
          const anim = setInterval(() => {
            opacity -= 0.05;
            data.current.container.style.opacity = opacity;

            if (opacity <= 0) {
              clearInterval(anim);
              resolve();
            }
          }, 16);
        });
      },

      enter(data) {
        data.next.container.style.opacity = 0;

        let opacity = 0;
        const anim = setInterval(() => {
          opacity += 0.05;
          data.next.container.style.opacity = opacity;

          if (opacity >= 1) {
            clearInterval(anim);
          }
        }, 16);
      }
    }
  ]
});

document.addEventListener("DOMContentLoaded", () => {
  let buttonInfo = document.getElementById('Info');
  let buttonTutorial = document.getElementById('Tutorial');
  let buttonStart = document.getElementById('Play-Button');

  if(buttonInfo){
    buttonInfo.addEventListener('click', (e) =>{
      e.preventDefault();
      barba.go('../Html/info.html');
    });
  }

  if(buttonTutorial){
    buttonTutorial.addEventListener('click', (e) =>{
      e.preventDefault();
      barba.go('../Html/tutorial.html');
    });
  }

  if(buttonStart){
    buttonStart.addEventListener('click', (e) =>{
      e.preventDefault();
      barba.go('../Html/spiel.html');
    });
  }
});