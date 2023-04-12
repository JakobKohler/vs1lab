const hashtag_input = document.getElementById('hashtag');
const sinz = document.getElementById('sinz');
const map = document.getElementById('map_img');
const footer = document.getElementById('footer');

hashtag_input.addEventListener('input', (value) => {
    if(hashtag_input.value.includes('sinz')){
        sinz.style.transform = 'translateY(-100%)';
        footer.style.overflow = 'visible';
    }else if(hashtag_input.value.includes('peng')){
        map.style.setProperty('--peng-transform', 'translateX(-100px) scale(0.25) rotate(-30deg)');
    }else{
        sinz.style.transform = 'translateY(0)';
        map.style.setProperty('--peng-transform', 'translateX(0) scale(0.25) rotate(0)');
    }
});

sinz.addEventListener('transitionend', () => {
    if(!hashtag_input.value.includes('sinz')){
        footer.style.overflow = 'hidden';
    }
});