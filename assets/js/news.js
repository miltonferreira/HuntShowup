var dataNews = localStorage.getItem('news');
dataNews = JSON.parse(dataNews);    // converte para JSON

function showNews() {

    document.querySelector('title').innerHTML = `${dataNews.titulo}`;

    let li = document.createElement('li');

    li.innerHTML = `
            
            <div class="list-group-item">
                <p class="new-date">${this.convertToDate(dataNews.timestamp)}</p>
                <img src="${dataNews.foto}" alt="">
                <h1>${dataNews.titulo}</h1>
                <p>${dataNews.texto}</p>
                    
            </div>
        `;



    document.querySelector('.todo').append(li);

}

function convertToDate(time){

    data = new Date(time * 1000);   // converte para milliseconds, somente -> new Date() <- pega a data do PC
    date = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    hours = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    return date + " - " + hours;
}

showNews();