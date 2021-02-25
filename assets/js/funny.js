let json = `
    [{
    "video": [{
        "url": "https://img.youtube.com/vi/DPRSz0IQics/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=DPRSz0IQics",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/aaDxECyGXxo/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=aaDxECyGXxo",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/tp8tBat-xTM/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=tp8tBat-xTM",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/sgdmaO97Hvc/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=sgdmaO97Hvc",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/o-qX6udlh4Q/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=o-qX6udlh4Q",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/4oatZVrpK4E/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=4oatZVrpK4E",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/FUtfQ1dhhdc/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=FUtfQ1dhhdc",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    }]
}]
`;

let video = JSON.parse(json);   // converte para o formato JSON

function renderVideos() {
    
    document.querySelector('.owl-carousel').innerHTML = ''; //limpa a lista para não repetir quando add nova tarefa
    
    video[0].video.forEach(task => {

        let li = document.createElement('div');
        li.className = "item";

        li.innerHTML = `
            
            <div class="card col-md-6 youtube_card bg-youtube" style="background-image: url(${task.url});">
                <a href="${task.href}" target="_blank" class="hide_card"><img src="${task.src}" alt=""></a>
            </div>

            `;

        document.querySelector('.owl-carousel').append(li);

    });

}

renderVideos();