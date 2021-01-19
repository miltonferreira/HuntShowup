
let twitch = [];

let news = [];

let streamers = [];     // array que recebe os streamers no firebase

let resetStreamers = 0; // caso atualiza o "streamers" esse let serve para limpa o array

let countNews = 0;          // let para pegar a terceira noticia

function connectFirebase() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCRRX9P8hjt-NUbrSXaZxZNgPwXiTXhgkc",
        authDomain: "hunt-showup.firebaseapp.com",
        databaseURL: "https://hunt-showup.firebaseio.com",
        projectId: "hunt-showup",
        storageBucket: "hunt-showup.appspot.com",
        messagingSenderId: "485579818827",
        appId: "1:485579818827:web:c5b99cb45f98d824ca0ace",
        measurementId: "G-GM82QC4B8K"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

// rota para carregar e salvar arquivos
function getFirebaseRef(path){

    return firebase.database().ref(path);
}

// ler o JSON de arquivos no firebase realtime database
function readFiles(){

    this.getFirebaseRef().on('value', snapshot => {

        snapshot.forEach(snapshotItem => {

            let key = snapshotItem.key;         //key é o nome da lista
            let data = snapshotItem.val();

            if(key == "twitch"){
                data.forEach(item => {
                    twitch.push(item);              // add a data no JSON
                });
            }

            if(key == "news"){
                
                Object.values(data).forEach(item => {
                    news.push(item);              // add a data no JSON
                });
                
            }

            if(key == "streamers"){

                if(resetStreamers == 1){
                    streamers = [];
                }

                data.forEach(item => {
                    streamers.push(item);              // add a data no JSON
                });

            }

            // console.log(key, data);
            
            // se o arquivo tem o type mostra o arquivo para o usuario
            // if(data.type){
            //     this.listFilesEl.appendChild(this.getFileView(data, key));
            // }

        })

        resetStreamers = 1;     // indica que o array streamers já tem infos

        // console.log(streamers);
        // console.log(news);
        
        renderTwitch();         // chama novamente função atualizada com o novo valor
        renderNews();           // chama novamente função atualizada com o novo valor
        renderStreamers();      // chama novamente função atualizada da lista de streamers
        showIconTwitch();       // ao passar o mouse do card do streamer mostra o logo do twitch
        
    });

}

// embaralha as posições dos streamers
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

// mostra tela do streamer de hunt
function renderTwitch(){

    document.querySelector('#twitch-embed').innerHTML = ``; // limpa a div para não agrupa com algo que já exista

    streamer = twitch[0].streamer;

    var embed = new Twitch.Embed("twitch-embed", {
        width: 540,
        height: 340,
        channel: twitch[0].streamer,
        layout: "video",
        autoplay: false,
        // only needed if your site is also embedded on embed.example.com and othersite.example.com 
        parent: ["embed.example.com", "othersite.example.com"]
    });

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        var player = embed.getPlayer();
        player.play();
        player.setVolume(0.0);
    });

}

// ao passar o mouse sobre o card do streamer, mostra o logo do twitch para clicar e ir ao canal
function showIconTwitch(){

    // let z = getComputedStyle(document.querySelector('.wrap a'), ':before');

    var graphElem = document.querySelectorAll('.streamer_card a');

    for(let q of graphElem){

        q.addEventListener('mouseover', function (event) {
            q.setAttribute('class', 'show_card');
        });
        
        q.addEventListener('mouseleave', function (event) {
            q.setAttribute('class', 'hide_card');
        });

    }

}

function renderNews() {
    
    document.querySelector('.news-container').innerHTML = ''; //limpa a lista para não repetir quando add nova tarefa

    // console.log(news.length);

    news.reverse();         // inverte as posições do array
    
    if(news.length > 3){    // evita que tenha mais que 3 noticias no feed
        news.splice(3);     // remove o quarto item a diante, limitando a 3 itens no array
    }

    // console.log(news.length);

    news.forEach(task => {

        countNews += 1;

        let li = document.createElement('div');
        li.className = "news";

        if(countNews < 3){
            
            li.innerHTML = `
            
                <div class="example-2 card_ col-md-4 project-box">
                    <div id="id_news_">
                        <a href="${task.id}.html" target="_blank">
                            <div class="wrapper" style="background: url(${task.foto}) center/cover no-repeat;">
                                <div class="header">
                                    <div class="date">
                                    <span class="day">${this.convertToDate(task.timestamp)}</span>
                                    </div>
                                </div>
                                <div class="data">
                                    <div class="content">
                                    <h6 class="title">${task.titulo}</h6>
                                    <p class="text">${task.texto}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                
            `;

        } else {    // hide-news remove do mobile a terceira news
            li.innerHTML = `

                <div class="example-2 card_ col-md-4 project-box hide-news">
                    <div id="id_news_">
                        <a href="${task.id}.html" target="_blank">
                            <div class="wrapper" style="background: url(${task.foto}) center/cover no-repeat;">
                                <div class="header">
                                    <div class="date">
                                    <span class="day">${this.convertToDate(task.timestamp)}</span>
                                    </div>
                                </div>
                                <div class="data">
                                    <div class="content">
                                    <h6 class="title">${task.titulo}</h6>
                                    <p class="text">${task.texto}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        }


        li.querySelector('a').addEventListener('click', e => {
            dataNews = task;
            localStorage.setItem("news", JSON.stringify(task)); // converte para string
        });

        document.querySelector('.news-container').append(li);

    });

}

// carrega os dados para os cards do streamers
function renderStreamers() {
    
    //document.querySelector('.streamers_cards').innerHTML = ''; // limpa a lista para não repetir quando add nova tarefa

    // if(streamers.length > 3){
    //     streamers.reverse();
    //     streamers.splice(3);
        
    // }

    shuffle(streamers); // embaralha as posições dos streamers e retorna para o array

    streamers.forEach(task => {

        let li = document.createElement('div');
        li.className = "card col-md-6 text-white streamers streamer_card";

        li.innerHTML = `
                
                
                    <a href="${task.canal}" target="_blank" class="hide_card">
                        <div class="card-header">${task.nome}</div>
                        <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${task.foto}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <p class="card-text">${task.texto}</p>
                            </div>
                        </div>
                        </div>
                    </a>
                
                
            `;


        // li.querySelector('a').addEventListener('click', e => {
        //     dataNews = task;
        //     localStorage.setItem("news", JSON.stringify(task)); // converte para string
        // });

        document.querySelector('#streamers-area .row').append(li);

    });

}

function convertToDate(time){

    data = new Date(time * 1000);   // converte para milliseconds, somente -> new Date() <- pega a data do PC
    date = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    hours = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    return date + " - " + hours;
}

connectFirebase();  // credenciais para conectar ao firebase
readFiles();


//console.log(getComputedStyle(document.querySelector('.wrap a'), ':before').getPropertyValue('z-index'));
