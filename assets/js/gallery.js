let imagens = document.querySelectorAll('.small_img');  // pega todas as imagens do html
let modal = document.querySelector('.modal');           // classe que mostra a imagem fixada na tela
let modal_img = document.querySelector('#modal_img');   // id onde fica a imagem
let btnClose = document.querySelector('#btn_close');     // botao de fechar modal
let srcVal = "";

for(let i = 0; i < imagens.length; i++) {

    imagens[i].addEventListener('click', function(){

        srcVal = imagens[i].getAttribute('src');    // pega o caminho para acessa a imagem
        modal_img.setAttribute('src', srcVal);      // atribui para o src onde fica a imagem, o novo src
        modal.classList.toggle('modal_active');     // add classe em css para mostrar modal

    });

}

btnClose.addEventListener('click', function(){
    modal.classList.toggle('modal_active');     // 
});

modal_img.addEventListener('click', function(){
    modal.classList.toggle('modal_active');     // 
});