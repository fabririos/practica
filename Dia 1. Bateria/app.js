function sonido(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; 
    audio.currentTime = 0; //sobreponer sonidos
    audio.play();
    key.classList.add('play');
    
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('play');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', sonido);
