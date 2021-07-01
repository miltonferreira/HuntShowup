let json = `
    [{
    "video": [{
        "url": "https://img.youtube.com/vi/1ax9522_BGM/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=1ax9522_BGM",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/vLnd8YZO2jI/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=vLnd8YZO2jI",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/5s7_YQ3nH2A/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=5s7_YQ3nH2A",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/n5nOM-N7Iq0/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=n5nOM-N7Iq0",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/B6P7GyOknJI/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=B6P7GyOknJI",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/b14PxaVFYTI/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=b14PxaVFYTI",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/o5fXU0kScuo/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=o5fXU0kScuo",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/-sgy8Z_Mkrc/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=-sgy8Z_Mkrc",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/V23ZLUeyETQ/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=V23ZLUeyETQ",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/Um5rwAhPoqc/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=Um5rwAhPoqc",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/32dpifIRDA8/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=32dpifIRDA8",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/hzS7e0cbREw/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=hzS7e0cbREw",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/QTkewqA8EVM/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=QTkewqA8EVM",
        "src":"https://trucao.com.br/wp-content/uploads/2018/07/youtube-logo.png"
    },{
        "url": "https://img.youtube.com/vi/CLsRITOTLd4/hqdefault.jpg",
        "href":"https://www.youtube.com/watch?v=CLsRITOTLd4",
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