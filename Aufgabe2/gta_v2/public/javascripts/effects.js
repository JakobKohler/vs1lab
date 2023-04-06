const hashtag_input = document.getElementById('hashtag');
const sinz = document.getElementById('sinz');
const footer = document.getElementById('footer');

hashtag_input.addEventListener('input', (value) => {
    if(hashtag_input.value.includes('sinz')){
        sinz.style.transform = 'translateY(-100%)';
        footer.style.overflow = 'visible';
    }else{
        sinz.style.transform = 'translateY(0)';
    }
});

sinz.addEventListener('transitionend', () => {
    if(!hashtag_input.value.includes('sinz')){
        footer.style.overflow = 'hidden';
    }
});