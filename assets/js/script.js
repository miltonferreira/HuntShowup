
let twitch = [];

let news = [];

let streamers = [];
let resetStreamers = 0; // caso atualiza o "streamers" esse let serve para limpa o array

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
                data.forEach(item => {
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

        console.log(streamers);
        console.log(news);
        
        renderTwitch();         // chama novamente função atualizada com o novo valor
        renderNews();           // chama novamente função atualizada com o novo valor
        renderStreamers();      // chama novamente função atualizada da lista de streamers
        showIconTwitch();       // ao passar o mouse do card do streamer mostra o logo do twitch
        
    });

}

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

    var graphElem = document.querySelectorAll('.wrap a');

    for(let q of graphElem){

        q.addEventListener('mouseover', function (event) {
            q.setAttribute('class', 'show');
        });
        
        q.addEventListener('mouseleave', function (event) {
            q.setAttribute('class', 'hide');
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


        let li = document.createElement('div');
        li.className = "news";

        li.innerHTML = `
                
                    <a href="news/news-${task.id}.html" target="_blank">
                        <picture>
                            <img src="${task.foto}" alt="">
                            <h4 class="news-title">${task.titulo}</h4>
                        </picture>
                            <hr>
                            <h6>${this.convertToDate(task.timestamp)}</h6>
                    </a>
                
            `;


        li.querySelector('a').addEventListener('click', e => {
            dataNews = task;
            localStorage.setItem("news", JSON.stringify(task)); // converte para string
        });

        document.querySelector('.news-container').append(li);

    });

}

function renderStreamers() {
    
    document.querySelector('.wrap').innerHTML = ''; // limpa a lista para não repetir quando add nova tarefa

    // if(streamers.length > 3){
    //     streamers.reverse();
    //     streamers.splice(3);
        
    // }

    streamers.forEach(task => {

        let li = document.createElement('div');
        li.className = "item flex-item-1";

        li.innerHTML = `
                
                    <a href="${task.canal}" target="_blank" class="hide">
                        <img src="${task.foto}" alt="foto">
                        <h4>${task.nome}</h4>
                        <p>
                            ${task.texto}
                        </p>
                    </a>
                
            `;


        // li.querySelector('a').addEventListener('click', e => {
        //     dataNews = task;
        //     localStorage.setItem("news", JSON.stringify(task)); // converte para string
        // });

        document.querySelector('.wrap').append(li);

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
