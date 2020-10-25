$(document).ready(function(){ // só executa o codigo quando a página carregar totalmente

    // scroll para seções -------------------------------------------------------------------------------------------
    let navBtn = $('.nav-item');    //?????

    let newsSection = $('#news-area');
    let gameSection = $('#game-area');
    let discordSection = $('#discord-area');
    let aprenderSection = $('#aprender-area');
    let professorSection = $('#professor-area');
    let twitchSection = $('#twitch-area');

    let scrollTo = '';

    $(navBtn).click(function(){

        let btnId = $(this).attr('id');

        // console.log(btnId);

        if(btnId == 'news-menu'){
            scrollTo = newsSection;
        } else if(btnId == 'game-menu') {
            scrollTo = gameSection;
        } else if(btnId == 'discord-menu') {
            scrollTo = discordSection;
        } else if(btnId == 'aprender-menu') {
            scrollTo = aprenderSection;
        } else if(btnId == 'twitch-menu') {
            scrollTo = twitchSection;
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: $(scrollTo).offset().top - 70    // 70 é o tamanho da barra de navegação
        }, 1500);                                       // 1500 é 1s5 para fazer a animação

    });

    /* -------------------------------------------- */

});

console.log(document.documentElement.scrollTop);

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500) {
    mybutton.style.display = "block";
} else {
    mybutton.style.display = "none";
}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}