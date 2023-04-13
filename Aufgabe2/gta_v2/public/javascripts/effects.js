const hashtag_input = document.getElementById('hashtag');
const map = document.getElementById('map_img');
const footer = document.getElementById('footer');

hashtag_input.addEventListener('input', (value) => {
    if(hashtag_input.value.includes('sinz')){
        footer.style.setProperty('--sinz-scout', 'scale(0.3) translateY(-280px)')
    }else if(hashtag_input.value.includes('peng')){
        map.style.setProperty('--peng-transform', 'translateX(-100px) scale(0.25) rotate(-30deg)');
    }else{
        map.style.setProperty('--peng-transform', 'translateX(0) scale(0.25) rotate(0)');
        footer.style.setProperty('--sinz-scout', 'scale(0.3) translateY(0px)')
    }
});