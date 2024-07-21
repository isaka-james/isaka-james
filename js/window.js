
let originalWidth = window.innerWidth;
let originalHeight = window.innerHeight;
let isFullscreen = false;


document.getElementsByClassName('window')[0].style.display='none';
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('window')[0].style.display='block';
    document.getElementById('loading-overlay').style.display='none';

    const welcomeDialog = document.getElementById('welcomeDialog');
    const closeDialogButton = document.getElementById('closeDialogButton');

    if (getCookie('shown') !== 'true') {
        setTimeout(() => {
            welcomeDialog.style.display = 'block';
        }, 500);
    }

    closeDialogButton.addEventListener('click', function() {
        welcomeDialog.style.display = 'none';
        setCookie('shown', 'true', 365); // Cookie expires in 1 year
    });
});



// handle the default popup at the initial stage
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}


// The Window Actions
document.getElementsByClassName('minimize')[0].addEventListener('click', (event) => {
    event.preventDefault();

    window.location = "/";
});



document.getElementsByClassName('maximize')[0].addEventListener('click', (event) => {
    event.preventDefault();

    if (!isFullscreen) {
        // Maximize the window
        document.documentElement.requestFullscreen();
        isFullscreen = true;
    } else {
        // Restore the original size
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
});

document.getElementsByClassName('close')[0].addEventListener('click', (event) => {
    event.preventDefault();

    history.back();
});